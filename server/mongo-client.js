const MongoClient = require('mongodb').MongoClient;

var mongodb = null;

function connect(config, callback) {
    if (mongodb) {
        disconnect();
    }

    const appDb = config.db;
    const authentication = (server) => server.username ?
        `${encodeURIComponent(server.username)}:${encodeURIComponent(server.password)}@` :
        '';

    const mongoHosts = config.servers
        .map(server => `${authentication(server)}${server.host}:${server.port}`)
        .join(',');
    const mongoConnectionStrings = `mongodb://${mongoHosts}/${appDb}`;

    MongoClient.connect(mongoConnectionStrings, (err, db) => {
        if (err) {
            return callback(err);
        }

        mongodb = db;
        callback(null, mongodb);
    });
}

function disconnect() {
    if (mongodb) {
        mongodb.close();
        mongodb = null;
    }
}

module.exports = {
    connect: connect,
    disconnect: disconnect
};
