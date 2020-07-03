<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
    >
      <v-list>
        <v-list-item>
          История:
        </v-list-item>
        <v-list-item v-if="!games.length">
          Нет ни одной игры для отображения.
        </v-list-item>
        <v-list-group
          v-for="game of games"
          :key="game.id"
          :value="game.id == games.length"
          prepend-icon="mdi-gamepad"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                Игра {{ game.id }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-if="!game.turns.length">
            <v-list-item-content>
              Не сделано ни одного хода.
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="data of game.turns"
            :key="data.turn"
          >
            <v-list-item-content class="py-2">
              <v-list-item-title>
              <b> Ход {{ data.turn }} </b> - {{ data.date }}
              </v-list-item-title>
              Попытка: {{ data.text }}, Б: {{ data.bulls || 0 }}, К: {{ data.cows || 0 }}
              {{ data.win ? '\nПОБЕДА!' : '' }} {{ data.lose ? '\nПОРАЖЕНИЕ...' : '' }}
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
    >
      <v-toolbar>
        <v-spacer />
            <v-toolbar-title>
              <v-spacer />
              <v-icon left>mdi-gamepad-variant-outline</v-icon> Игра Быки и Коровы
            </v-toolbar-title>

          <v-spacer />
      </v-toolbar>
        <v-btn fixed right icon @click.stop="drawer = !drawer">
          <v-icon center>mdi-history</v-icon>
        </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          v-if="games.length && games[games.length - 1].turns.length && isPlaying"
          class="result text-center"
        >
            <v-spacer />
            <v-col cols="12" md="2" sm="2" class="py-0">
              <v-icon left>mdi-strategy</v-icon>
              <p>Ходов осталось:
                {{ 10 - games[games.length - 1].turns.length }}
              </p>
            </v-col>
            <v-col cols="12" md="2" sm="2" class="py-0">
              <v-icon left>mdi-eye-outline</v-icon>
              <p>Введено:
                {{ games[games.length - 1].turns[games[games.length - 1].turns.length-1].text }}
              </p>
            </v-col>
            <v-col cols="12" md="1" sm="1" class="py-0">
              <v-icon left>mdi-check-all</v-icon>
              <p>Быки:
                {{ games[games.length - 1].turns[games[games.length - 1].turns.length-1].bulls }}
              </p>
            </v-col>
            <v-col cols="12" md="1" sm="1" class="py-0">
              <v-icon left>mdi-cow</v-icon>
              <p>Коровы:
                {{ games[games.length - 1].turns[games[games.length - 1].turns.length-1].cows }}
              </p>
            </v-col>
            <v-spacer />
        </v-row>
        <v-row v-else-if="win || lose" class="result text-center" height="120px">
          <v-col cols="12" md="12">
            <h1>{{ win ? 'Победа!' : 'Поражение...' }}</h1>
          </v-col>
        </v-row>
        <v-row v-else-if="isPlaying" class="result text-center">
          <v-col cols="12" md="12">
            <p>Началась новая игра.</p>
            <p>Компьютер загадал число.</p>
          </v-col>
        </v-row>

        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" md="6" class="text-center mx-4">
            <game-rules />
          </v-col>
          <v-col v-if="!isPlaying" cols="12" md="6" class="text-center mx-4">
            <game-stats />
          </v-col>
          <v-col v-if="!isPlaying" cols="12" md="6" class="text-center mx-4">
            <v-btn large dark @click.stop="play">
              <v-icon left>mdi-nintendo-game-boy</v-icon> Начать игру
            </v-btn>
          </v-col>
        </v-row>

        <form v-if="isPlaying" @submit.prevent="submit" class="my-form">
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="12" md="5" sm="6" class="text-center">
              <v-text-field
                v-model.trim="inputValue"
                class="game-input"
                ref="input"
                height="50px"
                hint="Угадайте 4-значное число"
                persistent-hint
                :rules="[rules.counter, rules.unique]"
                label="Ваша попытка:"
                color="green darken-2"
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="6" md="2" class="text-center">
              <v-btn large class="green"
                :dark="submitable"
                :disabled="!submitable"
                @click.stop="submit"
              >
                <v-icon left>mdi-keyboard-return</v-icon> Проверить
              </v-btn>
            </v-col>
          </v-row>
        </form>
        <v-row v-if="isPlaying"
          align="center"
          justify="center"
        >
          <v-col cols="6" md="2" class="text-center mx-5">
            <v-btn large dark @click.stop="play">
              <v-icon left>mdi-reload</v-icon> Начать заново
            </v-btn>
          </v-col>
          <v-col cols="6" md="2" class="text-center mx-5">
            <v-btn large dark @click.stop="surrend">
              <v-icon left>mdi-anchor</v-icon> Сдаться
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer
      app
      dark
    >
      <v-spacer />
      <span class="white--text">Алексей Схоменко &copy; 2020</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import gameRules from './components/gameRules.vue';
import gameStats from './components/gameStats.vue';

const dayjs = require('dayjs');

export default {
  name: 'App',
  components: {
    'game-rules': gameRules,
    'game-stats': gameStats,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    isPlaying: false,
    games: [], // array of games objects
    inputValue: '',
    formHasErrors: false,
    secret: '',
    win: false,
    lose: false,
    selectedHistory: undefined,
    rules: {
      unique: (value) => {
        for (let i = 0; i < value.length - 1; i += 1) {
          if (value.indexOf(value[i], i + 1) >= 0) {
            return 'Введите число без повторов!';
          }
        }
        return true;
      },
      counter: (value) => value.length === 4 || 'Введите 4-значное число.',
    },
  }),
  computed: {
    submitable() {
      return (this.rules.unique(this.inputValue) + this.rules.counter(this.inputValue) === 2);
    },
  },
  methods: {
    play() {
      if (this.isPlaying) { this.surrend(); }
      if (!this.games.length) this.drawer = true;
      this.isPlaying = true;
      this.win = false;
      this.lose = false;
      this.secret = this.generator();
      this.games.push({ id: this.games.length + 1, turns: [], localStartDate: dayjs().format('DD.MM.YY HH:mm:ss') });
    },
    surrend() {
      if (this.isPlaying) {
        this.lose = true;
        this.isPlaying = false;
        this.games[this.games.length - 1].turns.push({
          turn: this.games[this.games.length - 1].turns.length + 1,
          text: 'СДАЛСЯ',
          lose: true,
          date: dayjs().format('DD.MM.YY HH:mm:ss'),
        });
        this.push_game_log();
      }
    },
    submit() {
      ((input) => {
        setTimeout(() => {
          input.focus();
        }, 600);
      })(this.$refs.input);

      let res;
      let win;
      let lose;
      const game = this.games[this.games.length - 1];
      const turn = game.turns.length + 1;
      if (this.submitable) {
        res = this.check_result();
        win = !!res.win;
        lose = (!win && turn >= 10);

        game.turns.push({
          turn,
          text: this.inputValue,
          ...res,
          lose,
          date: dayjs().format('DD.MM.YY HH:mm:ss'),
        });

        if (this.games[this.games.length - 1].turns.length >= 10) {
          this.games[this.games.length - 1].win = false;
          this.lose = true;
          this.isPlaying = false;
          this.push_game_log();
        }
        this.inputValue = '';

        if (win) {
          this.push_game_log();
          this.win = true;
          this.isPlaying = false;
        }
      }
    },
    generator() {
      const base = [...'0123456789'];
      let res = '';
      let n;

      while (res.length < 4) {
        n = Math.floor(Math.random() * 10);
        res += base.splice(n, 1);
      }
      return res;
    },
    check_result() {
      let bulls = 0;
      let cows = 0;
      for (let i = 0; i < this.secret.length; i += 1) {
        if (this.inputValue[i] === this.secret[i]) {
          bulls += 1;
        } else if (this.secret.indexOf(this.inputValue[i]) >= 0) {
          cows += 1;
        }
      }
      console.log('input', this.inputValue, 'secret', this.secret);
      console.log('bulls', bulls, 'cows', cows);
      return (bulls === this.secret.length) ? { win: 1, bulls } : { bulls, cows };
    },
    push_game_log() {
      const game = {
        secret: this.secret,
        ...this.games[this.games.length - 1],
        localEndDate: dayjs().format('DD.MM.YY HH:mm:ss'),
      };
      delete game.id;
      return fetch('http://localhost:8080/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
      }).then((d) => d.json());
    },

  },
};
</script>

<style>
.v-application .primary--text div {
    color: green !important;
    caret-color: green !important;
}
.my-form {
  width: 100%;
  max-height: fit-content;
}
.result {
  min-height: 104px;
  max-height: fit-content;
}
.game-input input {
    font-size: 2em;
    text-align: center;
};
.game-input label {
  font-size: "50px";
  line-height: "100px";
}
</style>
