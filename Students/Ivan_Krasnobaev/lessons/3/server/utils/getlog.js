//const fh = require("./fileHandler");
const fs = require("fs");

module.exports = async () => {
  const url = "./server/logs/logs.json";
  let prom = new Promise((res, rej) => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (!err) {
        res(!data || data.length === 0 ? [] : JSON.parse(data));
      } else {
        rej('Error reading file:' + url);
      }
    });
  });
  let answer = await prom;
  return answer;
};