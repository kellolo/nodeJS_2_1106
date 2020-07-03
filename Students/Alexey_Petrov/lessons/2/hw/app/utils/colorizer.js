const ansi = require('ansi')
const cursor = ansi(process.stdout)

module.exports = (text, type) => {
    if( type = 'alert'){
        cursor.black().bg.green().write(text).write('\n').reset()
    } else if( type = 'error'){
        cursor.black().bg.red().write(text).write('\n').reset()
    }
}