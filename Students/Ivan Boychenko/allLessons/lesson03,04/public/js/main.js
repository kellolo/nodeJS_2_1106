const game = new Vue({
    el: '#game',
    data: {
        user: [],
        bot: [],
        cows: 0,
        bulls: 0,
        tryCount: 10,
        game: '',
        isStart: false,
    },
    methods: {
        botStart() {
            if (this.bot.length != 0) {
                this.bot = [];
            }
            for (let i = 0; i < 4; i++) {
                this.bot.push(Math.floor(Math.random() * 9));
            }
            console.log(this.bot);

            this.isStart = true;
            this.game = '';
            this.tryCount = 10;
            this.cows = 0;
            this.bulls = 0;
        },
        userAnswer() {
            if (this.user.length != 0) {
                this.user = [];
            }
            let inp1 = Number(document.querySelector('#userInp1').value);
            let inp2 = Number(document.querySelector('#userInp2').value);
            let inp3 = Number(document.querySelector('#userInp3').value);
            let inp4 = Number(document.querySelector('#userInp4').value);
            this.user.push(inp1);
            this.user.push(inp2);
            this.user.push(inp3);
            this.user.push(inp4);
            this.cows = 0;
            this.bulls = 0;
        },
        startGame() {
            this.userAnswer();
            for (let i = 0; i < this.bot.length; i++) {
                if (this.user[i] == this.bot[i]) {
                    this.bulls++;
                }
                let y = this.bot.filter(el => {
                    if (el == this.user[i]) {
                        this.cows++;
                    }
                });
            }
            if (this.bulls < 4) {
                this.tryCount--;
            }
            if (this.tryCount == 0) {
                this.game = 'lose'
                this.isStart = false
            }
            if (this.bulls == 4) {
                this.game = 'win'
                this.isStart = false
            }

            if (this.game == 'lose' || this.game == 'win') {
                let mass = []
                for (let i = 1; i < 5; i++) {
                    mass.push(document.querySelector(`#userInp${i}`).value)
                }
                console.log(mass)
                fetch('/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: mass, cows: this.cows, bulls: this.bulls, status: this.game })
                })
            }
        }
    }
});