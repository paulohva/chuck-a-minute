const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongodb = require('./mongo-client');
const redisClient = require('./redis-client');
const dbInitializer = require('./facts-db-initializer');
const redisInitializer = require('./facts-redis-initializer');

function connectToDatabase(callback) {
  mongodb.connect(config.get('mongodb'), (err, db) => {
    if (err) {
      return console.log('Error connecting to mongodb...', err);
    }

    callback(db);
  });
}

function connectToRedis(callback) {
  redisClient.connect(config.get('redis'), (err, redis) => {
    if (err) {
      return console.log('Error connecting to redis...', err);
    }

    callback(redis);
  });
}

function startHttpServer(db, redis, callback) {
  const app = express();
  const PORT = process.env.PORT || config.get('api.port') || 5000;

  // setup request logger
  app.use(morgan('combined'));

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // setup body parser for json payloads
  app.use(bodyParser.json());

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.get('/api/facts', require('./endpoints/get-facts')({ db: db, redis: redis }));
  app.post('/api/facts', require('./endpoints/add-fact')({ db: db, redis: redis }));
  app.post('/api/facts/vote/:id', require('./endpoints/vote-fact')({ db: db, redis: redis }));

  // endpoint to reset all mongodb data
  app.get('/api/reset', (req, res, next) => {
    dbInitializer.resetData(mongodb.getDb(), (mongoErr) => {
      redisInitializer.resetData(redisClient.getClient(), (redisErr) => {
        if (mongoErr || redisErr) {
          return next(mongoErr || redisErr);
        }

        res.status(200).json({ status: 200, description: 'OK' });
      });

    });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
          message: err.message,
          error: err
      });

      console.log('Error:', err);
    });

  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
          message: err.message,
          error: {}
      });
  });

  const server = app.listen(PORT, () => {
    console.log(`Listening on http://0.0.0.0:${PORT}`);
    callback();
  });
}

connectToDatabase((db) =>
  dbInitializer.initDatabaseStructure(db, () =>
    connectToRedis((redis) =>
      startHttpServer(db, redis, () =>
        console.log('App Server ready')
      )
    )
  )
);
