function ByteStream(bytes) {
	this.bytes = bytes;

	this.byteIndexCurrent = 0;
}

{
	// constants

	ByteStream.BitsPerByte = 8;
	ByteStream.BitsPerByteTimesTwo = ByteStream.BitsPerByte * 2;
	ByteStream.BitsPerByteTimesThree = ByteStream.BitsPerByte * 3;

	// instance methods

	ByteStream.prototype.hasMoreBytes = function() {
		return (this.byteIndexCurrent < this.bytes.length);
	}

	ByteStream.prototype.readBytes = function(numberOfBytesToRead) {
		var returnValue = [];

		for (var b = 0; b < numberOfBytesToRead; b++) {
			returnValue[b] = this.readByte();
		}

		return returnValue;
	}

	ByteStream.prototype.readByte = function() {
		var returnValue = this.bytes[this.byteIndexCurrent];

		this.byteIndexCurrent++;

		return returnValue;
	}

	ByteStream.prototype.readString = function(lengthOfString) {
		var returnValue = "";

		for (var i = 0; i < lengthOfString; i++) {
			var byte = this.readByte();

			if (byte != 0) {
				var byteAsChar = String.fromCharCode(byte);
				returnValue += byteAsChar;
			}
		}

		return returnValue;
	}
}