const filehantler = require('./fileHandler')
const moment = require('moment')

module.exports = (data) =>{
    let {user, pc, winner} = data;
    let file = './app/logs/log.txt'

    let logItem = `
    \n
    *** ROUND ***
    User: ${user}; \n
    Pc: ${pc}; \n
    Winner: ${winner}; \n
    time: ${moment().format('MMM DD YYYY, hh:mm:ss')}; \n
      *** END ***
    `
    filehantler(file, logItem);
}