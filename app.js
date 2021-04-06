const App = {
  data() {
    return {
      cards: [
        {
          name: 'React',
          img: 'img/react.svg',
          isFlipped: false
        },
        {
          name: 'Angular',
          img: 'img/angular.svg',
          isFlipped: false
        },
        {
          name: 'Ember',
          img: 'img/ember.svg',
          isFlipped: false
        },
        {
          name: 'Vue',
          img: 'img/vue.svg',
          isFlipped: false
        },
        {
          name: 'Backbone',
          img: 'img/backbone.svg',
          isFlipped: false
        },
        {
          name: 'Aurelia',
          img: 'img/aurelia.svg',
          isFlipped: false
        },
      ],
      backFace: "img/js-badge.svg",
      memoryCards: [],
      flippedCards: [],
      finish: false,
      start: false,
      turns: 0,
      totalTime: {
        minutes: 0,
        seconds: 0,
      },
    }
  },

  created: function () {
    this.memoryCards = (
      JSON.parse(JSON.stringify(this.cards))
        .concat(JSON.parse(JSON.stringify(this.cards))))
        .sort(() => Math.random() - 0.5);
  },

  methods: {
    flipCard(card) {
      if (card.isMatched || card.isFlipped || this.flippedCards.length === 2)
        return;
      if (!this.start) {
        this._startGame();
      }
      card.isFlipped = true;
      if (this.flippedCards.length < 2)
        this.flippedCards.push(card);
      if (this.flippedCards.length === 2)
        this._match(card);
    },

    _startGame() {
      this._tick();
      this.interval = setInterval(this._tick, 1000);
      this.start = true;
    },

    _tick() {
      if (this.totalTime.seconds !== 59) {
        this.totalTime.seconds++;
        return
      }
      this.totalTime.minutes++;
      this.totalTime.seconds = 0;
    },

    reset() {
      clearInterval(this.interval);
      setTimeout(() => {
        this.memoryCards = [];
        this.memoryCards = (
          JSON.parse(JSON.stringify(this.cards))
            .concat(JSON.parse(JSON.stringify(this.cards))))
            .sort(() => Math.random() - 0.5);
        this.totalTime.minutes = 0;
        this.totalTime.seconds = 0;
        this.start = false;
        this.finish = false;
        this.turns = 0;
        this.flippedCards = [];
      }, 600);
    },

    _match(card) {
      this.turns++;
      if (this.flippedCards[0].name === this.flippedCards[1].name) {
        setTimeout(() => {
          this.flippedCards.forEach(card => card.isMatched = true);
          this.flippedCards = [];
          if (this.memoryCards.every(card => card.isMatched === true)) {
            clearInterval(this.interval);
            this.finish = true;
          }
        }, 400);
      }
      else {
        setTimeout(() => {
          this.flippedCards.forEach((card) => { card.isFlipped = false });
          this.flippedCards = [];
        }, 800);
      }
    },
  },

  computed: {
    sec() {
      if (this.totalTime.seconds < 10) {
        return '0' + this.totalTime.seconds;
      }
      return this.totalTime.seconds;
    },

    min() {
      if (this.totalTime.minutes < 10) {
        return '0' + this.totalTime.minutes;
      }
      return this.totalTime.minutes;
    },
  },
}

Vue.createApp(App).mount('#app')