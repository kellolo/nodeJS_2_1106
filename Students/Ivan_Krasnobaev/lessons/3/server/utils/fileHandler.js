const fs = require("fs");

module.exports = {
  rewrite(url, res) {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (!err) {
        let logs = !data || data.length === 0 ? [] : JSON.parse(data);
        logs.push(res);

        fs.writeFile(url, JSON.stringify(logs, null, ' '), (err) =>
          !err ? console.log("log updated") : console.log("Error")
        );
      }
    });
  },
  // read(url) {
  //   fs.readFile(url, 'utf-8', (err, data) => {
  //     if (!err) {
  //       return !data || data.length === 0 ? [] : JSON.parse(data);
  //     }
  //   })
  // }
};