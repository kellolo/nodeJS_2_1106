const bot = require('./bot');
const an = require('./another');
let botQuestion = bot();
console.log(botQuestion);

let cows = 0;
let bulls = 0;

module.exports = (userAnvsver) => {
    for(let i=0;i<botQuestion.length;i++){
        if(userAnvsver[i] == botQuestion[i]){
            bulls++;
        }
        let res = botQuestion.filter(test=> {
            if(test == userAnvsver[i]){
                cows++;
                return
            }
        });
    }
    console.log(`Коров - ${cows}`);
    console.log(`Быков - ${bulls}`);
}