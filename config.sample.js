var config = {}

config.connection={};
config.connection.endpoint = "https://<SOMETHING>.documents.azure.com:443/";
config.connection.authKey = "<SOMETHING'S KEY>";
config.databaseId = "<docdb database name>";
config.collectionId = "<docdb collection name>";

module.exports = config;