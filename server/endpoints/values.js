module.exports = (config) => (req, res, next) => {
    const useRedis = !('noredis' in req.query);

    if (useRedis) {
        config.redis.get('value', (err, value) => {
            if (err || !value) {
                return next(err || new Error('Value not available on redis'));
            }

            res.send({ value: value });
        });
    } else {
        config.db.collection('value').findOne({ _id: 'value' }, (err, value) => {
            if (err || !value) {
                return next(err || new Error('Value not available on mongo'));
            }

            res.send({ value: value.value });
        });
    }
};
