<template>
  <div class="column items-center padding">
    <q-form class="column q-gutter-md" @submit="submit">
      <h4> Bitte vervollständige die folgenden Informationen über Dich. </h4>
      <q-input v-model="name" outlined type="text" label="Name" required />
      <q-input v-model="age" outlined type="number" label="Alter" required />
      <q-toggle
        v-model="smoking"
        outlined
        label="Ich habe in der letzten Woche geraucht."
      />
      <q-toggle
        v-model="drinking"
        outlined
        label="Ich trinke Alkohol und habe in den letzten 48h Alkohol konsumiert."
      />
      <q-btn type="submit" label="Ich bestätige die Korrektheit meiner Angaben." />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserInformation',
  data() {
    return {
      age: 50,
      name: '',
      smoking: false,
      drinking: false
    };
  },
  methods: {
    submit(e: Event) {
      e.preventDefault();
      this.$q.dialog({
        title: 'Überprüfung',
        message: 'Ich habe die eingegeben Daten überprüft und bestige hiermit die Korrektheit.',
        ok: 'Ja',
        cancel: 'Zurück'
      }).onOk(() => {
        this.$store.commit('results/addResult', {
          time: window.performance.now(),
          name: this.name,
          age: this.age,
          smoking: this.smoking,
          drinking: this.drinking
        });
        this.$emit('done');
      });
    }
  },
  beforeUnmount() {
    this.age = NaN;
    this.name = '';
    this.smoking = false;
    this.drinking = false;
  }
});
</script>
