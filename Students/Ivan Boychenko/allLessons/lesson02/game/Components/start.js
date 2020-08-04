const readline = require('readline');
const body = require('./body');

module.exports = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Попробуйте угадать число, загаданное компьютером\n', (ansver) => {
        if(ansver.length < 4 || ansver.length > 4){
            console.log('Недопустимая длина');
        } else {
            let arr = [...ansver];
            body(arr);
        }
        rl.close();
    })
}

