const EXPIRE_TIME_SECS = 60;
const EXPIRE_TIME_MILS = EXPIRE_TIME_SECS * 1000;
const NUMBER_OF_FACTS = 3;

module.exports = (config) => (req, res, next) => {
    const useRedis = !('noredis' in req.query);

    getFactsFromRedis(config.redis, useRedis, (err, facts) => {
        if (err) {
            return getFactsFromMongo(config.db, (err, facts) => {
                if (err) {
                    return next(err);
                }

                const notExpired = (date) => new Date() - date < EXPIRE_TIME_MILS;
                if (facts.length > 0 && notExpired(facts[0].createdAt)) {
                    return sendFacts(res, facts, 'MongoDb');
                }

                // generate new random facts
                generateRandomFacts(config.db, [], (err, randomFacts) => {
                    if (err) {
                        return next(err);
                    }

                    const timestamp = new Date();
                    const factsMinute = randomFacts
                        .slice(0, NUMBER_OF_FACTS)
                        .map(f => ({
                            _id: f._id,
                            text: f.text,
                            votes: f.votes,
                            createdAt: timestamp
                        }));

                    sendFacts(res, factsMinute, 'MongoDb');

                    // store random facts in mongodb
                    updateMongoFactsMinute(config.db, factsMinute, () => { });

                    // store random facts in redis
                    useRedis && updateRedisFactsMinute(config.redis, factsMinute, () => { });
                });
            });
        }

        sendFacts(res, facts, 'Redis');
    });
}

function sendFacts(res, facts, source) {
    console.log(`Got facts from ${source}`);

    // return only NUMBER_OF_FACTS
    res.send({ source: source, data: facts.slice(0, NUMBER_OF_FACTS) });
}

function getFactsFromRedis(redis, useRedis, callback) {
    if (!useRedis) {
        return callback(new Error('Not using redis'));
    }

    redis.hgetall('facts_minute', (err, facts) => {
        if (err || !facts) {
            return callback(new Error('Facts not available on redis'));
        }

        callback(null, deserializeRedisFacts(facts));
    });
}

function getFactsFromMongo(db, callback) {
    const factsMinuteCollection = db.collection('facts_minute');

    factsMinuteCollection.find().sort({ createdAt: -1 }).limit(NUMBER_OF_FACTS).toArray((err, facts) => {
        if (err) {
            return callback(err);
        }

        return callback(null, facts);
    });
}

function generateRandomFacts(db, currentFacts, callback) {
    const factsCollection = db.collection('facts');

    console.log('GENERATING NEW FACTS...');
    getRandomFacts(factsCollection, (err, facts) => {
        if (err) {
            return callback(err);
        }

        currentFacts = currentFacts.concat(facts);

        if (currentFacts.length < NUMBER_OF_FACTS) {
            return generateRandomFacts(db, currentFacts, callback);
        }

        callback(null, currentFacts);
    });
}

function getRandomFacts(factsCollection, callback) {
    const randomValue = Math.random() * 100000;
    factsCollection.find({ _random: { $gte: randomValue } }).limit(NUMBER_OF_FACTS).toArray((err, facts) => {
        if (err) {
            return callback(err);
        }

        callback(null, facts);
    });
}

function updateMongoFactsMinute(db, facts, callback) {
    const factsMinuteCollection = db.collection('facts_minute');

    factsMinuteCollection.insertMany(facts, (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, facts);
    });
}

function updateRedisFactsMinute(redis, facts, callback) {
    const flatFacts = serializeRedisFacts(facts);

    redis.batch()
        .hmset(['facts_minute'].concat(flatFacts))
        .expire('facts_minute', EXPIRE_TIME_SECS)
        .exec((err, result) => {
            if (err) {
                return callback(err);
            }

            callback(null, facts);
        });
}

function serializeRedisFacts(facts) {
    return facts
        .map(fact => {
            return [
                `${fact._id}._id`, fact._id.toString(),
                `${fact._id}.text`, fact.text,
                `${fact._id}.votes`, fact.votes,
                `${fact._id}.createdAt`, fact.createdAt.toISOString()
            ];
        })
        .reduce((values, flatFact) => {
            return values.concat(flatFact);
        }, []);
}

function deserializeRedisFacts(value) {
    const factsHash = Object.keys(value)
        .reduce((facts, key) => {
            const tokens = key.split('.');
            const id = tokens[0];
            const field = tokens[1];

            facts[id] = facts[id] || {};
            if (field === 'votes') {
                facts[id][field] = Number(value[key]);
            } else if (field === 'createdAt') {
                facts[id][field] = value[key];
            } else {
                facts[id][field] = value[key];
            }

            return facts;
        }, {})

        return Object.keys(factsHash)
            .map(key => factsHash[key]);
}
