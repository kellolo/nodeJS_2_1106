// Бот для генерации случайных чисел от 1 до 9 в кол-ве 4-х

module.exports = function bot(){
    let botArray = [];
    for(let i=0;i<4;i++){
        botArray.push(Math.floor(Math.random()*9));
    }   
    return botArray;
}
