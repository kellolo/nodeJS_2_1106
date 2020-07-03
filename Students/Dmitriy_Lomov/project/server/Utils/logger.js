const fs = require('fs');
const writer = require('./writer');
const fileUrl = './server/db/logger.json';
const moment = require('moment');

module.exports = (action, itemName) => {
    fs.readFile(fileUrl, 'utf-8', (err, data) => {
        if (!err) {
            const log = JSON.stringify({
                time: moment().format('DD MM YYYY, h:mm:ss'),
                product: itemName,
                action
            }, null, ' ');

            const logs = JSON.parse(data);
            logs.push(log);

            writer(fileUrl, logs);
        }
    })
}