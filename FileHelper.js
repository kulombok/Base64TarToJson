function FileHelper() {
	// static class
}

{
	FileHelper.loadFileAsBytes = function(fileToLoad, callback) {
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var fileLoadedAsBinaryString =
				fileLoadedEvent.target.result;
			var fileLoadedAsBytes =
				ByteHelper.stringUTF8ToBytes(fileLoadedAsBinaryString);
			callback(fileToLoad.name, fileLoadedAsBytes);
		}

		fileReader.readAsBinaryString(fileToLoad);
	}
}