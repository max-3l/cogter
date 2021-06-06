<template>
  <q-page class="row items-center justify-evenly">
    <q-inner-loading v-if="stages[currentStage].name === 'LOADING'" />
    <user-information
      v-else-if="stages[currentStage].name === 'USER_INFORMATION'"
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
    name: 'USER_INFORMATION',
    props: {},
    timeout: 0
  }
];

export default defineComponent({
  name: 'Test',
  components: { Done, UserInformation },
  data() {
    return {
      currentStage: -1,
      stages
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
    }
  },
  beforeMount() {
    this.stages.push({ name: 'DONE', timeout: 0, props: {} });
    this.nextStage();
  }
});
</script>
