const inputRadio = require('./components/inputRadio')
const checker = require('./components/checker')
const colorText = require('./utils/colorizer')
const logger = require('./utils/logger')

let units = {
    '1': 'Rock',
    '2': 'Scissors',
    '3': 'Paper'
};

let game = () => {
    let user, pc
    inputRadio()
    .then(d => { user = d })
        .then(() => {
            pc = Math.floor(Math.random() * 3) + 1;
        })
        .then(() => {
           let { text, check } =  checker(user, pc, units);
           colorText(text, 'alert');
           logger(check);
        })
}
game();