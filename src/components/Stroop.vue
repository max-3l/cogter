<template>
  <div class="absolute-fit column justify-center items-center">
    <div
      v-if="show === 'INTRODUCTION'"
      class="absolute-fit column justify-center items-center anleitung">
      <h2>Anleitung</h2>
      <p>
        Bitte lesen Sie sich die folgende Anleitung genau durch.
        <br><br>
        Es folgt nun ein Test der Ihre kognitiver Leistungsfähigkeit misst.<br>
        In den nächsten Minuten werden Ihnen jeweils Farbwort (ROT, GRÜN, BLAU, oder GELB)
        angezeigt. Die angezeigten Wörter sind auch in einer der eben genannten Farben
        eingefärbt. Jedoch sind die Farben zufällig, sodass das geschriebene Wort nicht
        immer mit der Farbe des Wortes übereinstimmt. Ihre Aufgabe ist es möglichst schnell
        die Farbe des Wortes (nicht den Text) zu erkennen. Drücken sie die Pfeiltaste nach oben,
        wenn das Wort <span class="text-red">ROT</span> ist, die Pfeiltaste nach unten,
        wenn das Wort <span class="text-blue">BLAU</span> ist, die Pfeiltaste nach links,
        wenn das Wort <span class="text-yellow">GELB</span> ist, und die Pfeiltaste nach rechts,
        wenn das Wort <span class="text-green">GRÜN</span> ist. Sie haben pro Wort 3 Sekunden Zeit.
      </p>
      <arrow-keys
        width="300px"
        class="q-mb-sm"
        :upColor="getPaletteColor(keyBindings.ArrowUp)"
        :downColor="getPaletteColor(keyBindings.ArrowDown)"
        :rightColor="getPaletteColor(keyBindings.ArrowRight)"
        :leftColor="getPaletteColor(keyBindings.ArrowLeft)"
      />
      <p>
        Das Programm zeichnet ihre Reaktionsgeschwindigkeit und Treffergenauigkeit
        auf. Diese wird automatisch ausgewertet und nachträglich von Experten
        im Bereich der Analyse kognitiver Tests analysiert. Die Ergebnisse werden mit anderen
        Personen aus Ihrer Altersgruppe verglichen.
      </p>
      <q-btn label="Verstanden" @click="startStroop" size="lg" />
    </div>
    <div
      v-if="show === 'INFORMATION_2'"
      class="absolute-fit column justify-center items-center anleitung">
      <h2>Steigerung</h2>
      <p>
        Sie konnten sich nun anhand von 30 Wörtern einen Überlblick verschaffen wie
        dieser Test funktioniert.
        <br><br>
        Der automatische Timer wird nun auf 1,5 Sekunden reduziert.
      </p>
      <q-btn label="Verstanden" @click="startStroop2" size="lg" />
    </div>
    <div
      v-if="show === 'INFORMATION_3'"
      class="absolute-fit column justify-center items-center anleitung">
      <h2>Analyse</h2>
      <p>
        Ihre durchschnittliche Reaktionszeit bei richtigen Antworten
        beträgt {{ meanDurationCorrect.toFixed(2) }} Millisekunden.
        <br><br>
        66.4% der Personen in Ihrer Altersgruppe haben eine schnellere
        Reaktionszeit als Sie. Der automatische Timer wird nun auf die
        durchschnittliche Reaktionszeit der Personen Ihrer Altersgruppe
        angepasst.
      </p>
      <q-btn label="Verstanden" @click="startStroop3" size="lg" />
    </div>
    <div
      :class="{ 'bg-red-3': wrong }"
      class="absolute row justify-evenly items-center fit"
      v-else-if="show === 'STROOP'"
    >
      <span class="stroop-text" :class="`text-${currentStroop.color}`">
        {{ currentStroop.text }}
      </span>
      <arrow-keys
        width="500px"
        class="fixed-bottom-right q-m-md"
        :upColor="getPaletteColor(keyBindings.ArrowUp)"
        :downColor="getPaletteColor(keyBindings.ArrowDown)"
        :rightColor="getPaletteColor(keyBindings.ArrowRight)"
        :leftColor="getPaletteColor(keyBindings.ArrowLeft)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { currentNanoTimestamp } from 'src/utils/time';
import { average } from 'src/utils/math';
import { colors } from 'quasar';
import ArrowKeys from './ArrowKeys.vue';

const { getPaletteColor } = colors;

interface StroopText {
  text: string;
  color: string;
}

interface StroopResult {
  correct: boolean;
  timer: number;
  clickTimeMS: number;
  timestamp: number;
  clicked: boolean;
  text: string;
  color: string;
}

const colorTexts: StroopText[] = [
  { text: 'ROT', color: 'red' },
  { text: 'GRÜN', color: 'green' },
  { text: 'BLAU', color: 'blue' },
  { text: 'GELB', color: 'yellow' }
];

const keyBindings: Record<string, string> = {
  ArrowUp: 'red',
  ArrowRight: 'green',
  ArrowDown: 'blue',
  ArrowLeft: 'yellow'
};

export default defineComponent({
  components: { ArrowKeys },
  name: 'Stroop',
  props: {
    defaultDuration: {
      type: Number,
      default: 3
    },
    baseline: {
      type: Number,
      default: 30
    },
    stage1: {
      type: Number,
      default: 200
    },
    stage2: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      started: false,
      trials: [] as StroopResult[],
      currentStroop: { text: 'Bereit halten', color: 'Black' },
      currentTimer: null as null | number,
      duration: this.defaultDuration,
      // eslint-disable-next-line global-require
      audio: new Audio(require('assets/beep.mp3')),
      wrong: false,
      timerStarted: -1,
      keyBindings,
      show: 'INTRODUCTION'
    };
  },
  methods: {
    getPaletteColor,
    getRandomStroop(): StroopText {
      return {
        text: colorTexts[this.getRandom(colorTexts.length)].text,
        color: colorTexts[this.getRandom(colorTexts.length)].color
      };
    },
    getRandom(numSamples: number): number {
      return Math.floor(Math.random() * (numSamples));
    },
    stroop() {
      this.timerStarted = Date.now();
      this.currentTimer = window.setTimeout(() => this.timerFinished(), this.duration * 1000);
      this.currentStroop = this.getRandomStroop();
    },
    wrongAnimation() {
      void this.audio.play();
    },
    timerFinished() {
      this.currentTimer = null;
      this.wrongAnimation();
      this.addTrialResult(false, -1, false);
      this.checkResults();
    },
    checkResults() {
      if (this.trials.length === this.baseline) {
        this.show = 'INFORMATION_2';
        return;
      }
      if (this.trials.length === this.stage1) {
        this.show = 'INFORMATION_3';
        return;
      }
      if (this.trials.length === this.stage2) {
        this.finish();
        return;
      }
      this.stroop();
    },
    addTrialResult(correct: boolean, clickTimeMS: number, clicked: boolean) {
      this.trials.push({
        correct,
        clickTimeMS,
        clicked,
        color: this.currentStroop.color,
        text: this.currentStroop.text,
        timer: this.duration,
        timestamp: currentNanoTimestamp()
      });
    },
    finish() {
      this.$store.commit('results/addResult', { name: 'Stroop Test', results: [...this.trials] });
      this.$emit('done');
    },
    keyPressed(keyCode: string) {
      if (this.show === 'STROOP') {
        if (this.currentTimer != null) {
          if (keyCode in keyBindings) {
            window.clearTimeout(this.currentTimer);
            const timerEnded = Date.now();
            this.currentTimer = null;
            if (keyBindings[keyCode] === this.currentStroop.color) {
              this.addTrialResult(true, timerEnded - this.timerStarted, true);
            } else {
              this.addTrialResult(true, timerEnded - this.timerStarted, true);
              this.wrongAnimation();
            }
            this.checkResults();
          }
        }
      }
    },
    startStroop() {
      this.show = 'STROOP';
      this.audio.onplay = () => { this.wrong = true; };
      this.audio.onended = () => { this.wrong = false; };
      window.addEventListener('keydown', (e) => {
        this.keyPressed(e.key);
      });
      setTimeout(() => this.stroop(), this.duration * 1000);
    },
    startStroop2() {
      this.currentStroop = { text: 'Bereit halten', color: 'Black' };
      this.show = 'STROOP';
      this.duration = 1.5;
      setTimeout(() => this.stroop(), this.duration * 1000);
    },
    startStroop3() {
      this.currentStroop = { text: 'Bereit halten', color: 'Black' };
      this.show = 'STROOP';
      this.duration = this.meanDuration15Correct / 1000;
      setTimeout(() => this.stroop(), this.duration * 1000);
    }
  },
  computed: {
    meanDuration15Correct(): number {
      const times = this.trials
        .map((element) => (element.correct ? element.clickTimeMS : Infinity));
      const correct = times.filter((el) => el !== Infinity).sort().slice(20, 50);
      return average(correct);
    },
    meanDurationCorrect(): number {
      const times = this.trials
        .map((element) => (element.correct ? element.clickTimeMS : Infinity));
      const correct = times.filter((el) => el !== Infinity);
      return average(correct);
    }
  }
});
</script>

<style lang="scss">
.stroop-text {
  font-size: 200px;
  font-weight: 800;
}
.anleitung {
  max-width: 60vw;
  font-size: 25px;
}
</style>
