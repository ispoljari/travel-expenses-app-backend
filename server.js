const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logging of the HTTP layer
app.use(morgan('combined'));

// Serve static files
app.use(express.static(path.join(__dirname, '/client/build')));

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

// Body parsing
app.use(express.json());

// API request handling

app.get('/api/getPdf', (req, res) => {
  const dummyList = ["line1", "line2", "line3"];
  res.json(dummyList);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
})

const PORT = process.env.PORT || 8080;
let server;

function runServer(port=PORT) {
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.info(`The server started listening at ${PORT}`);
        resolve();
    })
      .on('error', err => {
        console.info(`An error occured while trying to connect to the server.`);
        reject();
    });
  });
};

function stopServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        console.info(`An error occured while shutting down the server.`);
        reject();
      }
    
      console.info('The server has shut down.');
      resolve();
    });
  });
};

if (require.main === module) {
  runServer();
};

module.exports = { app, runServer, stopServer };