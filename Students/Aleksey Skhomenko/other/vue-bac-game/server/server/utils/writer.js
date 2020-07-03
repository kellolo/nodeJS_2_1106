const fs = require('fs');

module.exports = (fileUrl, data) => {
  fs.writeFile(fileUrl, JSON.stringify(data, null, ' '), () => null);
};
