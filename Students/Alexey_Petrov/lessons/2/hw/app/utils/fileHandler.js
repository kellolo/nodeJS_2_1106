const fs = require('fs')
const ansi = require('./colorizer')

module.exports = (file, data) =>{
           fs.appendFile(file, data, { encoding: 'utf8' }, (err) => {!err ? ansi('Log update', 'alert') : ansi('!Err', 'error')});

    }
