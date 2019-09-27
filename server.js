const express = require('express');
const morgan = require('morgan');

const app = express();

// Setup logging of the HTTP layer
app.use(morgan('combined'));

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

let server;

function runServer(port=PORT) {
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

const PORT = 8080;

if (require.main === module) {
  runServer(PORT);
};

module.exports = { app, runServer, stopServer };