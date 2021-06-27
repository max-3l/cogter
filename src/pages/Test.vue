<template>
  <q-page class="row items-center justify-evenly fit">
    <video v-if="videoEnabled" ref="video" class="fixed-bottom-left q-m-md z-top" muted />
    <ask-video v-if="stages[currentStage].name === 'ENABLE_VIDEO'" @done="accessCamera" />
    <q-inner-loading v-else-if="stages[currentStage].name === 'LOADING'" />
    <user-information
      v-else-if="stages[currentStage].name === 'USER_INFORMATION'"
      @done="nextStage"
      :props="stages[currentStage].props"
    />
    <stroop
      v-else-if="stages[currentStage].name === 'STROOP'"
      @done="nextStage"
      :props="stages[currentStage].props"
    />
    <arithmetik
      v-else-if="stages[currentStage].name === 'ARITHMETIC'"
      @done="nextStage"
      :props="stages[currentStage].props"
    />
    <done
      v-else-if="stages[currentStage].name === 'DONE'"
      @done="quit"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserInformation from 'src/components/UserInformation.vue';
import Done from 'src/components/Done.vue';
import Stroop from 'src/components/Stroop.vue';
import Arithmetik from 'src/components/Arithmetik.vue';
import AskVideo from 'src/components/AskVideo.vue';

interface Stage {
  name: string;
  props: Record<string, unknown>;
  timeout: number;
}

const stages: Stage[] = [
  {
    name: 'LOADING',
    props: {},
    timeout: 100
  },
  {
    name: 'ENABLE_VIDEO',
    props: {},
    timeout: 0
  },
  {
    name: 'USER_INFORMATION',
    props: {},
    timeout: 0
  },
  {
    name: 'STROOP',
    props: {},
    timeout: 0
  },
  {
    name: 'ARITHMETIC',
    props: {},
    timeout: 0
  }
];

export default defineComponent({
  name: 'Test',
  components: {
    Done, UserInformation, Stroop, AskVideo, Arithmetik
  },
  data() {
    return {
      currentStage: -1,
      stages,
      videoEnabled: false
    };
  },
  methods: {
    nextStage() {
      if (this.currentStage + 1 === this.stages.length) {
        return;
      }
      this.currentStage += 1;
      if (this.stages[this.currentStage].timeout !== 0) {
        setTimeout(() => this.nextStage(), this.stages[this.currentStage].timeout);
      }
    },
    quit() {
      void this.$router.push({ name: 'Index' });
    },
    accessCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        void navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
          this.videoEnabled = true;
          void this.$nextTick(() => {
            const video = this.$refs.video as HTMLVideoElement;
            video.srcObject = stream;
            void video.play();
          });
        });
      }
      this.nextStage();
    }
  },
  beforeMount() {
    this.stages.push({ name: 'DONE', timeout: 0, props: {} });
    this.nextStage();
  }
});
</script>

<style lang="scss" scoped>
video {
  width: 15vw
}
</style>
