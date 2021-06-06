<template>
  <q-page class="row items-center justify-evenly">
    <q-btn label="Start now" @click="$router.push({ name: 'Login' })" size="xl" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex'
});
</script>
