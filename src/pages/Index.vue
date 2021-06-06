<template>
  <q-page class="row items-center justify-evenly">
    <q-btn
      v-if="!isAuthenticated"
      label="Login"
      @click="goToLogin"
      size="xl"
    />
    <div v-else class="column items-center justify-center q-gutter-md">
      <h3> Du bist angemeldet 🥳 </h3>
      <q-btn
        label="Starten"
        size="xl"
        @click="goToTest"
      />
      <div @click="logout" class="cursor-pointer">logout</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  methods: {
    goToLogin() {
      const params = { nextRouteName: 'Index' };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      void this.$router.push({ name: 'Login', params });
    },
    goToTest() {
      void this.$router.push({ name: 'Test' });
    },
    logout() {
      this.$store.commit('auth/clearAuth');
    }
  },
  computed: {
    isAuthenticated(): boolean {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return this.$store.getters['auth/isAuthenticated'] as boolean;
    }
  }
});
</script>
