const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

app.get('/api/facts', function (req, res) {
    const facts = [
      {
        id: '1',
        text: 'When Chuck Norris was born he drove his mom home from the hospital.',
        votes: 123,
        onClick: () => { console.log('click'); }
      },
      {
        id: '2',
        text: 'There once was a street called Chuck Norris, but the name was changed for public safety because nobody crosses Chuck Norris and lives.',
        votes: 123,
        onClick: () => { console.log('click'); }
      },
      {
        id: '3',
        text: 'When Chuck Norris was in middle school, his English teacher assigned an essay: "What is courage?" He received an A+ for turning in a blank page with only his name at the top.',
        votes: 123,
        onClick: () => {}
      }
    ];

    res.send(facts);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
