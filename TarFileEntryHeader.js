function TarFileEntryHeader(
	fileName,
	fileMode,
	userIDOfOwner,
	userIDOfGroup,
	fileSizeInBytes,
	timeModifiedInUnixFormat,
	checksum,
	typeFlag,
	nameOfLinkedFile,
	uStarIndicator,
	uStarVersion,
	userNameOfOwner,
	groupNameOfOwner,
	deviceNumberMajor,
	deviceNumberMinor,
	filenamePrefix
) {
	this.fileName = fileName;
	this.fileMode = fileMode;
	this.userIDOfOwner = userIDOfOwner;
	this.userIDOfGroup = userIDOfGroup;
	this.fileSizeInBytes = fileSizeInBytes;
	this.timeModifiedInUnixFormat = timeModifiedInUnixFormat;
	this.checksum = checksum;
	this.typeFlag = typeFlag;
	this.nameOfLinkedFile = nameOfLinkedFile;
	this.uStarIndicator = uStarIndicator;
	this.uStarVersion = uStarVersion;
	this.userNameOfOwner = userNameOfOwner;
	this.groupNameOfOwner = groupNameOfOwner;
	this.deviceNumberMajor = deviceNumberMajor;
	this.deviceNumberMinor = deviceNumberMinor;
	this.filenamePrefix = filenamePrefix;
}

{
	TarFileEntryHeader.SizeInBytes = 500;

	TarFileEntryHeader.fromBytes = function(bytes) {
		var reader = new ByteStream(bytes);

		var fileName = reader.readString(100).trim();
		var fileMode = reader.readString(8);
		var userIDOfOwner = reader.readString(8);
		var userIDOfGroup = reader.readString(8);
		var fileSizeInBytesAsStringOctal = reader.readString(12);
		var timeModifiedInUnixFormat = reader.readBytes(12);
		var checksumAsStringOctal = reader.readString(8);
		var typeFlagValue = reader.readString(1);
		var nameOfLinkedFile = reader.readString(100);
		var uStarIndicator = reader.readString(6);
		var uStarVersion = reader.readString(2);
		var userNameOfOwner = reader.readString(32);
		var groupNameOfOwner = reader.readString(32);
		var deviceNumberMajor = reader.readString(8);
		var deviceNumberMinor = reader.readString(8);
		var filenamePrefix = reader.readString(155);
		var reserved = reader.readBytes(12);

		var fileSizeInBytes = parseInt(
			fileSizeInBytesAsStringOctal.trim(), 8
		);

		var checksum = parseInt(
			checksumAsStringOctal, 8
		);

		var typeFlags = TarFileTypeFlag.Instances._All;
		var typeFlagID = "_" + typeFlagValue;
		var typeFlag = typeFlags[typeFlagID];

		var returnValue = new TarFileEntryHeader(
			fileName,
			fileMode,
			userIDOfOwner,
			userIDOfGroup,
			fileSizeInBytes,
			timeModifiedInUnixFormat,
			checksum,
			typeFlag,
			nameOfLinkedFile,
			uStarIndicator,
			uStarVersion,
			userNameOfOwner,
			groupNameOfOwner,
			deviceNumberMajor,
			deviceNumberMinor,
			filenamePrefix
		);

		return returnValue;
	}
}