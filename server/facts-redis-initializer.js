function resetFactsData(redis, callback) {
    redis.del('facts_minute', (err, result) => {
        callback(err, result);
    });

    redis.set('value', 10);
}

module.exports = {
    resetData: (redis, callback) => {
        resetFactsData(redis, (err) => {
            if (err) {
                return callback(err);
            }

            callback();
        });
    }
};