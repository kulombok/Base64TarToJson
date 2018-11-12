function TarFile(fileName, entries) {
	this.fileName = fileName;
	this.entries = entries;
}

{
	// constants

	TarFile.ChunkSize = 512;

	// static methods

	TarFile.fromBytes = function(fileName, bytes) {
		var reader = new ByteStream(bytes);

		var entries = [];

		var chunkSize = TarFile.ChunkSize;

		var numberOfConsecutiveZeroChunks = 0;

		while (reader.hasMoreBytes() == true) {
			var chunkAsBytes = reader.readBytes(chunkSize);

			var areAllBytesInChunkZeroes = true;

			for (var b = 0; b < chunkAsBytes.length; b++) {
				if (chunkAsBytes[b] != 0) {
					areAllBytesInChunkZeroes = false;
					break;
				}
			}

			if (areAllBytesInChunkZeroes == true) {
				numberOfConsecutiveZeroChunks++;

				if (numberOfConsecutiveZeroChunks == 2) {
					break;
				}
			} else {
				numberOfConsecutiveZeroChunks = 0;

				var entry = TarFileEntry.fromBytes(chunkAsBytes, reader);

				entries.push(entry);
			}
		}

		var returnValue = new TarFile(
			fileName,
			entries
		);

		return returnValue;
	}

	TarFile.new = function(fileName) {
		return new TarFile(
			fileName, [] // entries
		);
	}
}