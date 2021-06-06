<template>
  <div class="column items-center padding text-region">
    <h3>Zugriff auf Video und Audio</h3>
    <p>
      Bitte erlauben Sie den Zugriff auf die Kamera und
      Ihr Mikrofon. Die Video- und Audiostreams werden nur
      in Deutschland verarbeitet und gespeichert. Sie sind
      nur von Experten einsehbar um Sie auf Ihren psychologischen
      Zustand zu analyiseren.
    </p>
    <q-btn label="Ich verstehe" @click="$emit('done')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AskVideo'
});
</script>
