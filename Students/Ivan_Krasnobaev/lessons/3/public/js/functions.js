/* генеранция 4х значного числа */

function generate() {
  return Math.floor(Math.random() * Math.floor(10));
}

function getNumber() {
  let number = Array();

  for (let i = 0; i < 4; i++) {
    let num = generate();
    while (number.indexOf(num) !== -1) {
        num = generate();
    }
    number.push(num);
  }

  return number;
}

/* проверка ввода */

function checkInput (string) {
  const input = Array.from(string);
  if (input.length != 4) return false;
  else {
    let c = 0;
    input.forEach(el => {
      if (el * 1 == el) c++;
    })
    return c == 4 ? true : false;
  }
}

/* проверка ответа */

function checkAnswer (q, n) {
  const ans = Array.from(q);
  let bulls = cows = 0;

  ans.forEach((el, i) => {
    if (n.indexOf( parseInt(el) ) !== -1) {
      n.indexOf( parseInt(el) ) == i ? bulls++ : cows++;
    }
  });

  if (bulls == 4) {
    return true;
  } else {
    return q + ' Коров = ' + cows + ' Быков = ' + bulls;
  }
}

/* скрыть/показать элемент */

function showHide(arr) {
  arr.forEach(el => {
    el.hidden = el.hidden ? false : true;
  });
}

/* отправка логов */

function log(obj) {
  fetch('/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(data => console.log(data));
}

/* запрос логов */

async function getLogs() {
  const resp = await fetch('/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({logs:true})
  });
  return await resp.json();
}