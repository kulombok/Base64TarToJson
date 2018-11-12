function TarFileEntry(header, dataAsBytes) {
	this.header = header;
	this.dataAsBytes = dataAsBytes;
}

{
	// methods

	// static methods

	TarFileEntry.fromBytes = function(chunkAsBytes, reader) {
		var chunkSize = TarFile.ChunkSize;

		var header = TarFileEntryHeader.fromBytes(
			chunkAsBytes
		);

		var sizeOfDataEntryInBytesUnpadded = header.fileSizeInBytes;

		var numberOfChunksOccupiedByDataEntry = Math.ceil(
			sizeOfDataEntryInBytesUnpadded / chunkSize
		)

		var sizeOfDataEntryInBytesPadded =
			numberOfChunksOccupiedByDataEntry *
			chunkSize;

		var dataAsBytes = reader.readBytes(
			sizeOfDataEntryInBytesPadded
		).slice(
			0, sizeOfDataEntryInBytesUnpadded
		);

		var entry = new TarFileEntry(header, dataAsBytes);

		return entry;
	}
}