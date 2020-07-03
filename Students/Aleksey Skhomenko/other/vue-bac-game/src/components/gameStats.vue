<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          large
          dark
          v-bind="attrs"
          :loading="loading"
          @click="show"
        >
          <v-icon left>mdi-script-text-outline</v-icon> Статистика игр
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          primary-title
        >
          Статистика игр
        </v-card-title>
        <v-divider />
        <v-card-text>
          <ol class="pt-5 text--primary stats">
            <p v-if="!games.length">Вы не сыграли ещё ни одной игры.</p>
            <li v-for="game of games" :key="game.id" class="my-3">
              По{{ game.win ? 'беда' : 'ражение' }},
              Загадано: {{ game.secret }},
              Дата: {{ game.localStartDate }}.
              <v-btn
                small
                width="140"
                @click="game.show = !game.show"
                class="turns-btn"
              >
                {{ !game.show ? 'Показать' : 'Скрыть' }} ходы
              </v-btn>
              <ol v-if="game.show">
                <li v-for="turn of game.turns" :key="turn.id">
                  <span v-if="turn.text === 'СДАЛСЯ'">Игрок сдался</span>
                  <span v-else>Введено: {{ turn.text }}</span>
                  <span v-if="turn.bulls">, Быков: {{ turn.bulls }}</span>
                  <span v-if="turn.cows">, Коров: {{ turn.cows }}</span>.
                </li>
              </ol>
            </li>
          </ol>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            dark
            width="200"
            @click="dialog = false"
          >
            ОК
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: [],
      dialog: false,
      loading: false,
    };
  },
  methods: {
    show() {
      this.loading = true;
      fetch('http://localhost:8080/logs')
        .then((d) => d.json())
        .then((logs) => {
          this.games = [...logs];
          this.games.forEach((game) => {
            this.$set(game, 'show', false);
          });
          this.dialog = true;
          this.loading = false;
        })
        .catch((err) => { console.log(err); });
    },
  },
};
</script>

<style scoped>
.stats {
  max-height: 450px;
  overflow-y: auto;
}
.turns-btn {
  float: right;
  bottom: 5px;
}
</style>
