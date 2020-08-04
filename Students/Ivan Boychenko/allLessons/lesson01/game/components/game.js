const readline = require('readline');
const ansi = require('ansi');

const variants = ['камень', 'ножницы', 'бумага']; // Массив для определения выбора бота и игрока
let cursor = ansi(process.stdout);

function start(){ // запуск игры
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('0 - Камень, 1 - Ножницы, 2 - Бумага\n', (ansver) => {
        if (ansver > 2){
            console.log('Недопустимый символ');
            start();
        } else {
            game(ansver);

            rl.close();
        }
    });
}

function game(ansver){ // Тело игры
    let userAnsver = ansver;
    let botAnsver = bot();

    cursor.brightBlue().write(`Вы: ${variants[userAnsver]}\nБот: ${variants[botAnsver]}\n`).reset();
    
    if(userAnsver == botAnsver){
        cursor.yellow().write('Ничья\n').reset();
    } 
    else if(userAnsver == 0 && botAnsver == 1 || userAnsver == 1 && botAnsver == 2 || userAnsver == 2 && botAnsver == 0){
        cursor.green().write('Вы победили!\n').reset();
    } 
    else {
        cursor.red().write('Вы проиграли\n').reset();
    }
    cursor.brightMagenta().write('-- Игра окончена --\n').reset();
}

function bot(){ // Рандомное число бота
   return Math.floor(Math.random()*3);
}

start();
