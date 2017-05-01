module.exports = (config) => (req, res, next) => {
    const factsCollection = config.db.collection('facts');

    const newFact = {
        text: req.body.text,
        votes: 0,
        createdAt: new Date()
    };

    factsCollection.insert(newFact, (err, fact) => {
        if (err) {
            if (err.code === 11000) {
                return next({ status: 400, message: 'Duplicate key error' });
            }

            return next(err);
        }

        res.status(201).end();
    });
}
