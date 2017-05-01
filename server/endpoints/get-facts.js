module.exports = (config) => (req, res, next) => {
    const factsMinuteCollection = config.db.collection('facts_minute');
    const factsCollection = config.db.collection('facts');

    factsMinuteCollection.find({}).limit(3).toArray((err, facts) => {
        if (err) {
            return next(err);
        }

        if (facts.length > 0) {
            return res.send(facts);
        }

        // generate new random facts
        generateRandomFacts(factsCollection, factsMinuteCollection, [], (err, facts) => {
            if (err) {
                return next(err);
            }

            res.send(facts);
        });
    });
}

function generateRandomFacts(factsCollection, factsMinuteCollection, currentFacts, callback) {
    console.log('GENERATING NEW FACTS...');
    getRandomFacts(factsCollection, (err, facts) => {
        if (err) {
            return callback(err);
        }

        currentFacts = currentFacts.concat(facts);

        if (currentFacts.length < 3) {
            return generateRandomFacts(factsCollection, factsMinuteCollection, currentFacts, callback);
        }

        currentFacts = currentFacts.slice(0, 2);
        const timestamp = new Date();
        const factsMinute = currentFacts.map(f => ({
            _id: f._id,
            text: f.text,
            votes: f.votes,
            createdAt: timestamp
        }));

        factsMinuteCollection.insertMany(factsMinute, (err, result) => {
            if (err) {
                return next(err);
            }

            callback(null, factsMinute);
        });
    });
}

function getRandomFacts(factsCollection, callback) {
    const randomValue = Math.random() * 100000;
    factsCollection.find({ _random: { $gte: randomValue } }).limit(3).toArray((err, facts) => {
        if (err) {
            return callback(err);
        }

        callback(null, facts);
    });
}
