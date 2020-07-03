const answers = document.getElementById('answers');
const enter = document.getElementById('enter');
const withdraw = document.getElementById('withdraw');
const input = document.getElementById('inp');
const repeat = document.getElementById('repeat');
const showLogs = document.getElementById('showLogs');
const logs = document.getElementById('logs');
let attempts = 10;
let number = getNumber();

showHide([repeat, logs]);

console.log(number);

enter.addEventListener('click', function () {
    let p = document.createElement("p");

    p.innerText = checkInput(input.value) ? checkAnswer(input.value, number) : "Некорректный ввод";

    if (!checkInput(input.value)) p.innerText = "Некорректный ввод";
    else if (checkAnswer(input.value, number) !== true) {
        attempts--;
        if (!attempts) {
            p.innerText = "Не правильно! Попыток больше не осталось.\nЗагаданное число " + number.toString().replace(/\,/g, '');
            showHide([input, enter, withdraw, repeat]);
            log({ num: number, att: 10, win: false });
        } else p.innerText = checkAnswer(input.value, number) + "\nОсталось " + attempts + " попыток";
    } else {
        attempts--;
        p.innerText = "Правильно! Загаданное число " + input.value;
        showHide([input, enter, withdraw, repeat]);
        log({ num: number, att: 10 - attempts, win: true });
    }
    answers.appendChild(p);
    answers.scroll(0, 9999);
    input.value = "";
});

withdraw.addEventListener('click', function () {
    let p = document.createElement("p");

    p.innerText = "Вы сдались. Правильный ответ " + number.toString().replace(/\,/g,'');
    answers.appendChild(p);
    answers.scroll(0, 9999);
    showHide([input, enter, withdraw, repeat]);
    log({ num: number, att: 10 - attempts, win: false });
});

repeat.addEventListener('click', function () {
    answers.innerText = '';
    showHide([input, enter, withdraw, repeat]);
    number = getNumber();
    attempts = 10;
    console.log(number);
});

showLogs.addEventListener('click', () => {
    showHide([logs]);
    if (showLogs.dataset.show === "1") {
        showLogs.dataset.show = 0;
        showLogs.innerText = "Показать логи";
        logs.innerText = "";
    } else {
        showLogs.dataset.show = 1;
        showLogs.innerText = "Скрыть логи";
        getLogs().then((data) => {
            data.forEach(el => {
                let p = document.createElement("p");
                p.innerText = "Дата: " + el.end;
                p.innerText += "\nЗагаданное число: " + el.number;
                p.innerText += "\nРезультат: " + el.result;
                logs.appendChild(p);
            });
        });
    }
});