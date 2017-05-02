const redis = require('redis');

var client = null;

function connect(config, callback) {
    if (client) {
        disconnect();
    }

    client = redis.createClient(config);
    client.on('error', (err) => {
        callback(err);
    });

    client.on('connect', () => {
        callback(null, client);
    });
}

function disconnect() {
    if (client) {
        client.quit();
        client = null;
    }
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    getClient: () => client
};
