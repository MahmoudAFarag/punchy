new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
    actions: [],
  },
  methods: {
    startGame() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.actions = [];
    },

    //MAKE A RANDOM DAMAGE ATTACK
    attack() {
      let damage = this.calculateDamage(10, 3);
      this.monsterHealth -= damage;
      this.actions.unshift(`Player Hits Monster for ${damage}`);
      if (this.checkWin()) {
        return;
      }

      this.monsterDamage();
    },

    //MAKE A SPECIAL ATTACK
    specialAttack() {
      let damage = this.calculateDamage(20, 10);
      this.monsterHealth -= damage;
      this.actions.unshift(`Player Hits Monster for ${damage}`);
      if (this.checkWin()) {
        return;
      }

      this.monsterDamage();
    },
    //HEAL PLAYER
    heal() {
      this.actions.unshift("Player healed by 10");
      if (this.playerHealth <= 90) {
        return (this.playerHealth += 10);
      }
      this.playerHealth = 100;

      this.monsterDamage();
    },
    giveUp() {
      this.startGame();
    },

    //CONSTANT MONSTER DAMAGE
    monsterDamage() {
      let damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;
      this.actions.unshift(`Monster Hits Player for ${damage}`);
      this.checkWin();
    },

    //CALCULATE THE ATTACK DAMAGE
    calculateDamage(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    // CHECK WHO WON
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("Player Won, Start a new game?")) {
          return this.startGame();
        }
        this.isGameRunning = false;
        return true;
      }
      if (this.playerHealth <= 0) {
        if (confirm("Monster Won, Start a new game?")) {
          return this.startGame();
        }
        this.isGameRunning = false;
        return true;
      }
      return false;
    },
  },
});
