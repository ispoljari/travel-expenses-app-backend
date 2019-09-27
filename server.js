const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logging of the HTTP layer
app.use(morgan('combined'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public/build')));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  if(req.method === 'OPTIONS') {
    return res.send(204);
  }

  next();
});

// API request handling

app.get('/api/getPdf', (req, res) => {
  const dummyList = ["line1", "line2", "line3"];
  res.json(dummyList);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/build/index.html'));
})

const PORT = process.env.PORT || 8080;
let server;

function runServer(port) {
  server = app.listen(port, () => {
    console.info(`The server started listening at ${PORT}`);
  });
};

function stopServer() {
  server.close(err => {
   if (err) {
     console.info(`An error occured while shutting down the server.`);
   }

   console.info('The server has shut down.');
  })
};

if (require.main === module) {
  runServer(PORT);
};

module.exports = { app, runServer, stopServer };