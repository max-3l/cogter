<template>
  <!-- eslint-disable max-len -->
  <div class="absolute-fit column justify-center items-center">
    <div
      v-if="currentPhase === 0"
      class="text-region column justify-center items-center"
    >
      <h3> Gedächtniss Training </h3>
      <div>
        Es folgt ein Gedächtniss Test. Sie werden eine Abfolge von Zahlen sehen.
        Ihre Aufgabe is es die Leertaste ⎵ zu drücken, sobald aufeinanderfolgende Zahlen
        gleich sind.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 3"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, sobald aufeinanderfolgende Zahlen gleich sind..
      </div>
      <q-btn class="q-mt-md" label="Fortfahren" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 4"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Die folgende Aufgabe wird nun etwas schwieriger. Ihre Aufgabe ist es die
        Leertaste ⎵ zu drücken, sobald es mit einem Abstand von <strong>zwei</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
        <br class="q-mt-md">
        Beispiel:
        <br>
        Bei 11002233 gibt es keine Übereinstimmung.
        <br>
        Bei 10<strong>10</strong>234<strong>3</strong> müssen Sie bei den fettgeschrieben
        Zahlen die Leertaste ⎵ drücken.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 5"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, sobald es mit einem Abstand von <strong>zwei</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 6"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Die folgende Aufgabe wird nun etwas schwieriger. Ihre Aufgabe ist es die
        Leertaste ⎵ zu drücken, sobald es mit einem Abstand von <strong>drei</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
        <br class="q-mt-md">
        Beispiel:
        <br>
        Bei 11002233 gibt es keine Übereinstimmung.
        <br>
        Bei 1010<strong>0</strong>234<strong>2</strong> müssen Sie bei den fettgeschrieben
        Zahlen die Leertaste ⎵ drücken.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 7"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, sobald es mit einem Abstand von <strong>drei</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 8"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Die folgende Aufgabe wird nun etwas schwieriger. Ihre Aufgabe ist es die
        Leertaste ⎵ zu drücken, sobald es mit einem Abstand von <strong>vier</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 9"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, sobald es mit einem Abstand von <strong>vier</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 10"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Die folgende Aufgabe wird nun etwas schwieriger. <br>
        Ihre Aufgabe ist es die Leertaste ⎵ zu drücken, sobald es mit einem Abstand von <strong>fünf</strong>
        Zahlen eine Übereinstimmung in der Zahlenfolge gibt.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 11"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, sobald es mit einem Abstand von <strong>fünf</strong> Zahlen eine
        Übereinstimmung in der Zahlenfolge gibt.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 12"
      class="text-region column justify-center items-center"
    >
      <h3> Multitasking </h3>
      <div>
        Im folgenden Test werden nun zusätzlich zu der Zahl Töne abgespielt. <br>
        Betätigen Sie die Leertaste ⎵, wenn zwei aufeinanderfolgende Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn zwei aufeinanderfolgende Töne übereinstimmen.
        <br class="q-mt-md">
        Bitte überprüfen Sie mit dem untenstehenden Knopf, ob Ihr Audioausgabegerät ordnungsgemäß
        angeschlossen ist. Sie sollten einen Ton hören, sobald der Knopf betätigt wurde.
      </div>
      <q-btn class="q-mt-md" label="Ton spielen" @click="playTestTone" size="lg" />
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 13"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, wenn aufeinanderfolgende Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn aufeinanderfolgende Töne übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 14"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Es werden wieder Zahlen und Töne abgespielt. <br>
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>zwei</strong> Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>zwei</strong> Tönen übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 15"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>zwei</strong> Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>zwei</strong> Tönen übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 16"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Es werden wieder Zahlen und Töne abgespielt. <br>
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>drei</strong> Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>drei</strong> Tönen übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 17"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>drei</strong> Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>drei</strong> Tönen übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 18"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Es werden wieder Zahlen und Töne abgespielt. <br>
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>vier</strong> Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>vier</strong> Tönen übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 19"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt. <br>
        etätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>vier</strong> Zahlen übereinstimmen. <br>
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>vier</strong> Tönen übereinstimmen. <br>
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 20"
      class="text-region column justify-center items-center"
    >
      <h3> Steigerung </h3>
      <div>
        Es werden wieder Zahlen und Töne abgespielt.
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>fünf</strong> Zahlen übereinstimmen.
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>fünf</strong> Tönen übereinstimmen.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 21"
      class="text-region column justify-center items-center"
    >
      <h3> Wiederholung </h3>
      <div>
        Die Aufgabe wird wiederholt.
        Betätigen Sie die Leertaste ⎵, wenn Zahlen mit einem Abstand von <strong>fünf</strong> Zahlen übereinstimmen.
        Betätigen Sie die Eingabetaste ↵, wenn Töne mit einem Abstand von <strong>fünf</strong> Tönen übereinstimmen.
      </div>
      <q-btn class="q-mt-md" label="Verstanden" @click="nextPhase" size="lg" />
    </div>
    <div
      v-else-if="currentPhase === 22"
      class="text-region column justify-center items-center"
    >
      <h3> Abgeschlossen </h3>
      <div>
        Der Test ist nun abgeschlossen.
      </div>
      <q-btn class="q-mt-md" label="Weiter" @click="finish" size="lg" />
    </div>
    <div class="absolute column justify-evenly items-center fit"
      :class="{ 'bg-red-3': wrong, 'bg-green-3': correct }"
      v-else-if="currentPhase === 1"
    >
      <h3 v-if="showTimer !== null" class="nback-text">
        {{ currentNumber }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { currentNanoTimestamp } from 'src/utils/time';
import * as Tone from 'tone';

// eslint-disable-next-line no-shadow, no-unused-vars
enum NbackTests {
// eslint-disable-next-line no-shadow, no-unused-vars
  NBACK = 'nback',
// eslint-disable-next-line no-shadow, no-unused-vars
  DUAL_NBACK = 'dualNback'
}

interface NbackResult {
  correct: boolean;
  timer: number;
  showTimer: number;
  answerTimeMS: number;
  timestamp: number;
  answered: boolean;
  n: number;
  numbers: number[];
  sounds: number[];
  answer: string;
  testKind: NbackTests;
  textMatches: boolean;
  soundMatches: boolean;
}

const keyAnswerMapping = {
  ' ': 'TextMatch',
  Enter: 'SoundMatch'
};

export default defineComponent({
  name: 'Nback',
  data() {
    return {
      currentPhase: 0,
      currentNumber: 0,
      currentSound: 0,
      trials: [] as NbackResult[],
      currentTimer: null as null | number,
      showTimer: null as null | number,
      // eslint-disable-next-line global-require
      audio: new Audio(require('assets/beep.mp3')),
      wrong: false,
      timerStarted: -1,
      duration: 2000,
      showDuration: 250,
      n: 1,
      numbers: [] as number[],
      sounds: [] as number[],
      currentTest: NbackTests.NBACK,
      correct: false
    };
  },
  methods: {
    nextPhase() {
      switch (this.currentPhase) {
        case 0:
          this.audio.onplay = () => { this.wrong = true; };
          this.audio.onended = () => { this.wrong = false; };
          window.addEventListener('keydown', (e) => {
            this.keyPressed(e.key);
          });
          this.currentPhase = 1;
          this.startNback(1);
          break;
        case 3:
          this.currentPhase = 1;
          this.startNback(1);
          break;
        case 4:
          this.currentPhase = 1;
          this.startNback(2);
          break;
        case 5:
          this.currentPhase = 1;
          this.startNback(2);
          break;
        case 6:
          this.currentPhase = 1;
          this.startNback(3);
          break;
        case 7:
          this.currentPhase = 1;
          this.startNback(3);
          break;
        case 8:
          this.currentPhase = 1;
          this.startNback(4);
          break;
        case 9:
          this.currentPhase = 1;
          this.startNback(4);
          break;
        case 10:
          this.currentPhase = 1;
          this.startNback(5);
          break;
        case 11:
          this.currentPhase = 1;
          this.startNback(5);
          break;
        case 12:
          this.currentPhase = 1;
          this.startDualNback(1);
          break;
        case 13:
          this.currentPhase = 1;
          this.startDualNback(1);
          break;
        case 14:
          this.currentPhase = 1;
          this.startDualNback(2);
          break;
        case 15:
          this.currentPhase = 1;
          this.startDualNback(2);
          break;
        case 16:
          this.currentPhase = 1;
          this.startDualNback(3);
          break;
        case 17:
          this.currentPhase = 1;
          this.startDualNback(3);
          break;
        case 18:
          this.currentPhase = 1;
          this.startDualNback(4);
          break;
        case 19:
          this.currentPhase = 1;
          this.startDualNback(4);
          break;
        case 20:
          this.currentPhase = 1;
          this.startDualNback(5);
          break;
        case 21:
          this.currentPhase = 1;
          this.startDualNback(5);
          break;
        default:
          break;
      }
    },
    wrongAnimation() {
      if (this.currentTest === NbackTests.DUAL_NBACK) {
        this.wrong = true;
        window.setTimeout(() => { this.wrong = false; }, 200);
      } else {
        void this.audio.play();
      }
    },
    correctAnimation() {
      this.correct = true;
      window.setTimeout(() => { this.correct = false; }, 200);
    },
    keyPressed(keyCode: string) {
      if (this.currentTimer != null) {
        if ((this.currentTest === NbackTests.NBACK && keyCode === ' ')
          || (this.currentTest === NbackTests.DUAL_NBACK && ['Enter', ' '].includes(keyCode))) {
          window.clearTimeout(this.currentTimer);
          this.currentTimer = null;
          const timerEnded = Date.now();
          if (this.currentTest === NbackTests.NBACK && keyCode === ' ') {
            if (this.textNbackMatches) {
              this.addTrialResult(
                true,
                timerEnded - this.timerStarted,
                true, keyAnswerMapping[keyCode]
              );
              this.correctAnimation();
            } else {
              this.addTrialResult(
                false,
                timerEnded - this.timerStarted,
                true, keyAnswerMapping[keyCode]
              );
              this.wrongAnimation();
            }
          }
          if (this.currentTest === NbackTests.DUAL_NBACK && ['Enter', ' '].includes(keyCode)) {
            if ((this.textNbackMatches && keyCode === ' ') || (this.soundNbackMatches && keyCode === 'Enter')) {
              this.addTrialResult(
                true,
                timerEnded - this.timerStarted,
                true,
                keyAnswerMapping[keyCode]
              );
              this.correctAnimation();
            } else {
              this.addTrialResult(
                false,
                timerEnded - this.timerStarted,
                true,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                keyAnswerMapping[keyCode]
              );
              this.wrongAnimation();
            }
          }
          window.setTimeout(
            () => this.checkResults(),
            Math.max(this.duration - (timerEnded - this.timerStarted), 500)
          );
        }
      }
    },
    timerFinished() {
      this.currentTimer = null;
      if (this.currentTest === NbackTests.NBACK) {
        if (this.textNbackMatches) {
          this.wrongAnimation();
          this.addTrialResult(false, -1, false, 'different');
        } else {
          this.addTrialResult(true, -1, false, 'different');
        }
      }
      if (this.currentTest === NbackTests.DUAL_NBACK) {
        if (this.textNbackMatches || this.soundNbackMatches) {
          this.wrongAnimation();
          this.addTrialResult(false, -1, false, 'different');
        } else {
          this.addTrialResult(true, -1, false, 'different');
        }
      }
      this.checkResults();
    },
    addTrialResult(correct: boolean, answerTimeMS: number, answered: boolean, answer: string) {
      this.trials.push({
        correct,
        answerTimeMS,
        answered,
        answer,
        timer: this.duration,
        showTimer: this.showDuration,
        timestamp: currentNanoTimestamp(),
        n: this.n,
        numbers: [...this.numbers],
        sounds: [...this.numbers],
        testKind: this.currentTest,
        textMatches: this.textNbackMatches,
        soundMatches: this.soundNbackMatches
      });
    },
    checkResults() {
      if (this.trials.length > 0 && this.trials.length % 25 === 0) {
        this.currentPhase = 3 + Math.floor(this.trials.length / 25) - 1;
        console.log(`Next phase ${this.currentPhase}`);
        return;
      }
      if (this.currentTest === NbackTests.NBACK) this.nextNback();
      if (this.currentTest === NbackTests.DUAL_NBACK) this.nextDualNback();
    },
    startNback(n: number) {
      console.log(n);
      this.n = n;
      this.numbers = [];
      this.sounds = [];
      this.currentTest = NbackTests.NBACK;
      setTimeout(() => this.nextNback(), 2000);
    },
    startDualNback(n: number) {
      console.log(n);
      this.n = n;
      this.numbers = [];
      this.sounds = [];
      this.currentTest = NbackTests.DUAL_NBACK;
      setTimeout(() => this.nextDualNback(), 2000);
    },
    nextNback() {
      this.currentNumber = Math.floor(Math.random() * 10);
      this.numbers.push(this.currentNumber);
      this.timerStarted = Date.now();
      this.currentTimer = window.setTimeout(() => { this.timerFinished(); }, this.duration);
      this.showTimer = window.setTimeout(() => { this.showTimer = null; }, this.showDuration);
    },
    nextDualNback() {
      this.currentNumber = Math.floor(Math.random() * 10);
      this.numbers.push(this.currentNumber);
      this.currentSound = Math.floor(Math.random() * 7);
      this.sounds.push(this.currentSound);
      this.playCurrentSound();
      this.timerStarted = Date.now();
      this.currentTimer = window.setTimeout(() => { this.timerFinished(); }, this.duration);
      this.showTimer = window.setTimeout(() => { this.showTimer = null; }, this.showDuration);
    },
    playCurrentSound() {
      const synth = new Tone.Synth().toDestination();
      let note = '';
      switch (this.currentSound) {
        case 0:
          note = 'A4';
          break;
        case 1:
          note = 'E4';
          break;
        case 2:
          note = 'D4';
          break;
        case 3:
          note = 'G4';
          break;
        case 4:
          note = 'C4';
          break;
        case 5:
          note = 'F4';
          break;
        case 6:
          note = 'B4';
          break;
        default:
          note = 'A4';
          break;
      }
      synth.triggerAttackRelease(note, this.showDuration / 1000);
    },
    playTestTone() {
      new Tone.Synth().toDestination().triggerAttackRelease('C5', 0.5);
    },
    finish() {
      this.$store.commit('results/addResult', { name: 'NBack', results: [...this.trials] });
      this.$emit('done');
    }
  },
  computed: {
    textNbackMatches(): boolean {
      return this.numbers.length >= this.n
      && this.numbers[this.numbers.length - 1] === this.numbers[this.numbers.length - 1 - this.n];
    },
    soundNbackMatches(): boolean {
      return this.sounds.length >= this.n
      && this.sounds[this.sounds.length - 1] === this.sounds[this.sounds.length - 1 - this.n];
    }
  },
  beforeUnmount() {
    if (this.currentTimer != null) window.clearTimeout(this.currentTimer);
    if (this.showTimer != null) window.clearTimeout(this.showTimer);
  }
});
</script>

<style lang="scss" scoped>
.nback-text {
  font-size: 200px;
  font-weight: 800;
}
</style>
