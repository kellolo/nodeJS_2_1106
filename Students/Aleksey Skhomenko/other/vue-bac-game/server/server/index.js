const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('./utils/logger');

const port = 8080;
const server = express();
server.use('/', express.static('../build'));
server.use(bodyParser.json());
server.get('/logs', (req, res) => {
  fs.readFile('./server/logs/logs.json', 'utf-8', (err, data) => {
    if (!err) {
      res.send(!data.length ? '[]' : data);
    }
  });
});

server.post('/logs', (req, res) => {
  fs.readFile('./server/logs/logs.json', 'utf-8', (err) => {
    if (!err) {
      logger(req.body).then(() => {
        res.json({ status: 1 });
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server available at: ${'\x1b[33m\x1b[1m'}http://localhost:${port}${'\x1b[0m'}`);
});

module.exports = port;
