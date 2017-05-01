const ObjectID = require('mongodb').ObjectID;

module.exports = (config) => (req, res, next) => {
    const factsMinuteCollection = config.db.collection('facts_minute');
    const factsCollection = config.db.collection('facts');

    const id = new ObjectID(req.params.id);
    factsMinuteCollection.update({ _id: id }, { $inc: { votes: 1 } }, (err, result) => {
        if (err) {
            return next(err);
        }

        factsCollection.update({ _id: id }, { $inc: { votes: 1 } }, (err, result) => {
            if (err) {
                return next(err);
            }

            res.status(201).end();
        });
    });
}
