const express = require('express');
const log = require('./utils/logger');
const get = require('./utils/getlog');

const server = express();
server.use(express.json());

server.use('/', express.static('./public'));

server.post('/', (req, res) => {
  if (req.body.logs ? true : false) {
    let answer = async () => {
      let ans = await get();
      res.json(ans);
    };
    
    answer();
  } else {
    log(req.body.num, req.body.att, req.body.win);
    res.json({ answer: true });
  }
});

server.listen(8080, () => {
  console.log('server at 8080');
});