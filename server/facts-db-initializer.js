const facts = require('./chuck-facts.json');

function createFactsCollection(db, callback) {
    db.createCollection('facts', (err) => {
        if (err) {
            return callback(err);
        }

        db.collection('facts').createIndex(
            { text: 1 },
            { unique: true },
            (err) => {
                if (err) {
                    return callback(err);
                }

                db.collection('facts').createIndex(
                    { _random: 1 },
                    { unique: false },
                    callback
                );
            }
        );
    });
}

function createFactsMinuteCollection(db, callback) {
    db.createCollection('facts_minute', (err) => {
        if (err) {
            return callback(err);
        }

        db.collection('facts_minute').createIndex(
            { createdAt: 1 },
            { expireAfterSeconds: 60 },
            callback
        )
    });
}

function resetFactsData(db, callback) {
    const factsCollection = db.collection('facts');

    db.collection('value').insert({ _id: 'value', value: '15' });

    factsCollection.deleteMany({}, (err) => {
        if (err) {
            return callback(err);
        }

        db.collection('facts_minute').deleteMany({}, (err) => {
            if (err) {
                return callback(err);
            }

            const initialFacts = facts.quotes.map(q => ({
                text: q,
                votes: 0,
                _random: Math.random() * 100000
            }));

            db.collection('facts').insertMany(
                initialFacts,
                { ordered: false },
                (err) => setTimeout(() => callback(err), 2000)
            );
        });
    });
}

module.exports = {
    initDatabaseStructure: (db, callback) => {
        createFactsCollection(db, (err) => {
            if (err) {
                console.log('Error:', err);
            }

            createFactsMinuteCollection(db, (err) => {
                if (err) {
                    console.log('Error', err);
                }

                callback();
            });
        });
    },
    resetData: (db, callback) => {
        resetFactsData(db, (err) => {
            if (err) {
                return callback(err);
            }

            callback();
        });
    }
};