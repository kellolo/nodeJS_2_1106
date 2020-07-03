module.exports  = (user, pc, units) => {

    let winner

     if((user == 1 && pc == 2)||(user == 2 && pc == 3)||(user == 3 && pc == 1)) {
         winner = 'Ты';
     } else if (user == pc) {
         winner = 'Ничья';
     } else {
         winner = 'Бот';
     }

     return {
         text:`${winner} wins! \n User: ${units[user]} \n PC: ${units[pc]}`,
        check:{
            user: units[user], 
            pc: units[pc], 
            winner
        }
            }

}