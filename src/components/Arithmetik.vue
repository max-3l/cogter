<template>
  <div class="absolute-fit column justify-center items-center">
    <div v-if="currentPhase === 0" class="text-region column justify-center items-center">
      <h1>Rechentest</h1>
      Es folgt ein leichter Rechentest. Sie werden in den folgenden
      Minuten Rechenaufgaben sehen. Füllen Sie das Textfeld aus und
      bestätigen Sie Ihre Eingabe mit der Enter Taste. Das Textfeld ist automatisch
      ausgewählt, Sie brauchen es nicht selbst auswählen.
      <br class="q-mt-md"/>
      Es werden wieder Informationen über Ihre Performance gesammelt und von
      verschiedenen Fachbereichen ausgewertet. Die Ergebnisse werden mit anderen
      Personen ihrer demografischen Gruppe verglichen. Es wird zusätlzlich eine
      echtzeit Evaluation ihrer Leistung angezeigt. Die Leistung wird anhand Ihrer
      Lösungsgeschwindigkeit und der Fehlerrate berechnet. Die Einstufung benötigt 10
      Eingaben.
      <q-btn class="q-mt-md" label="Verstanden" @click="startPhase1" size="lg" />
    </div>
    <div v-if="currentPhase === 2" class="text-region column justify-center items-center">
      <h1>Rechentest</h1>
      Sie hatten nun mit 5 einfachen Rechenaufgaben die Möglichkeit das Aufgabenschema
      kennenzulernen. Es werden nun weitere Aufagben folgen. Bei dieser Stufe handelt es
      sich um einen Test der ihre kognitive Leistung schnell einfache Probleme zu lösen
      misst. Sie haben pro Aufgabe 2 Sekunden Zeit.
      <q-btn class="q-mt-md" label="Verstanden" @click="startPhase2" size="lg" />
    </div>
    <div v-if="currentPhase === 3" class="text-region column justify-center items-center">
      <h1>Rechentest</h1>
      Die nächsten Aufgaben sind nun etwas schwerer als die vorherigen Aufagben. Sie haben
      für jede Aufgabe mehr Zeit als im Test zuvor.
      <q-btn class="q-mt-md" label="Verstanden" @click="startPhase3" size="lg" />
    </div>
    <div v-if="currentPhase === 4" class="text-region column justify-center items-center">
      <h1>Fertig</h1>
      Der Rechentest ist nun abgeschlossen.
      <q-btn class="q-mt-md" label="Weiter" @click="finish" size="lg" />
    </div>
    <div
      class="absolute column justify-evenly items-center fit"
      :class="{ 'bg-red-3': wrong }"
      v-else-if="currentPhase === 1"
    >
      <performance v-if="showPerformance" width="700" :performance="performanceValue" />
      <h3> {{ arithmeticTest }} </h3>
      <q-form @submit="enter">
        <q-input
          class="input"
          ref="input"
          @blur="focus()"
          filled
          selected
          v-model="input"
          required
        />
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { QInput } from 'quasar';
import { defineComponent } from 'vue';
import { currentNanoTimestamp } from 'src/utils/time';

import Performance from './Performance.vue';

interface MathTask {
  task: string,
  solution: string
}

const tasks: MathTask[] = [
  // Übungsrunde (5) (4s)
  { task: '5 * 8', solution: '40' },
  { task: '20 / 4', solution: '5' },
  { task: '1 / 5 * 10', solution: '2' },
  { task: '30 * 4', solution: '120' },
  { task: '7 + 13 + 8 - 7', solution: '21' },

  // Speed challenge (20) (3s)
  { task: '10 * 10', solution: '100' },
  { task: '7 * 3', solution: '21' },
  { task: '10 * 8 * 2', solution: '160' },
  { task: '31 + 3 + 2', solution: '36' },
  { task: '49 / 7', solution: '7' },
  { task: '5 * 1 + 1 + 1', solution: '7' },
  { task: '32 / 8', solution: '4' },
  { task: '3 * 7 / 3', solution: '7' },
  { task: '1 + (3 * 7)', solution: '22' },
  { task: '5 * 9', solution: '45' },
  { task: '(13  / 20) * 20 + 2', solution: '15' },
  { task: '2 / 6 * 3 * 6', solution: '6' },
  { task: '5 * 3 ', solution: '15' },
  { task: '7 + 13 + 8 - 7', solution: '21' },
  { task: '5 * 6 - 9', solution: '21' },
  { task: '21 - 3 * 10', solution: '190' },
  { task: '22  / (3 * 5 - 4)', solution: '2' },
  { task: '5 * 9 * 2', solution: '90' },
  { task: '8 * 8 * 0 * 9 + 8', solution: '8' },
  { task: '(2 + 3) * 0 / 42', solution: '0' },
  { task: '21 + 66 + 44', solution: '121' },
  { task: '420 - 96', solution: '324' },

  // Harder (20) (5s)
  { task: 'cos(π)', solution: '-1' },
  { task: 'sin(π) * cos(π)', solution: '-1' },
  { task: 'sin(π) * cos(π) + cos(0)', solution: '0' },
  { task: '4 + (12 + 3) * 10 ', solution: '154' },
  { task: '(√(49) + 15 * sin(2 π)) * 10 ', solution: '70' },
  { task: '1 * 2 * 3  * 9', solution: '54' },
  { task: '1032 / 8', solution: '129' },
  { task: '1032 - 17 + 1235', solution: '2250' },
  { task: '9998 + 2 / 2', solution: '9999' },
  { task: '7785 * 2', solution: '15570' },
  { task: '2x - 5 + √(100) d/dx', solution: '2' },
  { task: '5x + 3x + (-10 * (-x)) d/dx', solution: '18' },
  { task: '2 * 2 + 3 * 3 + 8 * 8', solution: '77' },
  { task: '(1 / 2 + 2 / 2 + 3 / 2) * 13', solution: '39' },
  { task: '(12 / 7 + 19 / 7) * 7 + 24', solution: '55' },
  { task: '(66 + 6) / 6 * 7', solution: '84' },
  { task: '√(169)', solution: '11' },
  { task: '16 * 17 + 8', solution: '280' },
  { task: '(5 * 25  / 20 * 4) * x (d / dx)', solution: '25' },
  { task: '77 + 88 + 111 ', solution: '375' }
];

interface ArithmeticResult {
  correct: boolean;
  timer: number;
  answerTimeMS: number;
  timestamp: number;
  answered: boolean;
  task: string;
  answer: string;
  solution: string;
}

export default defineComponent({
  components: { Performance },
  name: 'Arithmetik',
  props: {
    baseline: {
      type: Number,
      default: 5
    },
    stage1: {
      type: Number,
      default: 25
    },
    stage2: {
      type: Number,
      default: 45
    }
  },
  data() {
    return {
      currentPhase: 0,
      arithmeticTest: 'Bereit halten',
      trials: [] as ArithmeticResult[],
      input: '',
      currentTimer: null as null | number,
      // eslint-disable-next-line global-require
      audio: new Audio(require('assets/beep.mp3')),
      wrong: false,
      timerStarted: -1,
      performanceValue: 0,
      showPerformance: false,
      duration: 3000
    };
  },
  methods: {
    startPhase1() {
      this.audio.onplay = () => { this.wrong = true; };
      this.audio.onended = () => { this.wrong = false; };
      this.duration = 4000;
      this.arithmeticTest = 'Bereit halten';
      this.currentPhase = 1;
      void this.$nextTick(() => this.focus());
      setTimeout(() => this.nextTask(), 2000);
    },
    startPhase2() {
      this.duration = 3000;
      this.arithmeticTest = 'Bereit halten';
      this.currentPhase = 1;
      void this.$nextTick(() => this.focus());
      setTimeout(() => this.nextTask(), 2000);
    },
    startPhase3() {
      this.duration = 5000;
      this.arithmeticTest = 'Bereit halten';
      this.currentPhase = 1;
      void this.$nextTick(() => this.focus());
      setTimeout(() => this.nextTask(), 2000);
    },
    enter(e: Event) {
      e.preventDefault();
      const userInput = this.input;
      if (this.currentTimer != null) {
        window.clearTimeout(this.currentTimer);
        const timerEnded = Date.now();
        this.currentTimer = null;
        if (userInput.trim() === this.currentTask.solution.trim()) {
          this.addTrialResult(true, timerEnded - this.timerStarted, true, userInput.trim());
        } else {
          this.addTrialResult(false, timerEnded - this.timerStarted, true, userInput.trim());
          this.wrongAnimation();
        }
        this.checkResults();
      }
    },
    wrongAnimation() {
      void this.audio.play();
    },
    timerFinished() {
      this.currentTimer = null;
      this.wrongAnimation();
      this.addTrialResult(false, -1, false, this.input);
      this.checkResults();
    },
    addTrialResult(correct: boolean, answerTimeMS: number, answered: boolean, answer: string) {
      this.trials.push({
        correct,
        answerTimeMS,
        answered,
        answer,
        task: this.currentTask.task,
        timer: this.duration,
        timestamp: currentNanoTimestamp(),
        solution: this.currentTask.solution
      });
      this.moveSlider(correct, answerTimeMS, this.duration);
    },
    checkResults() {
      this.input = '';
      if (this.trials.length === this.baseline) {
        this.currentPhase = 2;
        return;
      }
      if (this.trials.length === this.stage1) {
        this.currentPhase = 3;
        return;
      }
      if (this.trials.length === this.stage2) {
        this.currentPhase = 4;
        return;
      }
      if (this.trials.length === 10) {
        this.showPerformance = true;
      }
      this.nextTask();
    },
    nextTask() {
      this.arithmeticTest = this.currentTask.task;
      this.timerStarted = Date.now();
      this.currentTimer = window.setTimeout(() => this.timerFinished(), this.duration);
    },
    inputCorrect(): boolean {
      return this.input.trim() === tasks[this.trials.length].solution.trim();
    },
    focus() {
      if (this.currentPhase === 0) return;
      (this.$refs.input as QInput).focus();
    },
    moveSlider(correct: boolean, timeNeeded: number, timeGiven: number) {
      if (!this.showPerformance) return;
      if (correct && timeNeeded <= 0.8 * timeGiven) {
        this.performanceValue = Math.min(100, this.performanceValue + 2.5);
      } else {
        this.performanceValue = Math.max(-100, this.performanceValue - 2.5);
      }
    },
    finish() {
      this.$store.commit('results/addResult', { name: 'Arithmetic Test', results: [...this.trials] });
      this.$emit('done');
    }
  },
  computed: {
    currentTask(): MathTask {
      if (this.trials.length === tasks.length) {
        return {
          task: 'Abgeschlossen', solution: 'Abgeschlossen'
        };
      }
      return tasks[this.trials.length];
    }
  },
  beforeUnmount() {
    if (this.currentTimer != null) {
      window.clearInterval(this.currentTimer);
    }
  }
});
</script>

<style lang="scss" scoped>
.input {
  width: 700px;
}
</style>
