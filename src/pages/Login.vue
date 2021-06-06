<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <h3> Please log in using you sensor-hub account. </h3>
      <q-form @submit="login" class="q-gutter-md">
        <q-input outlined label="E-Mail" v-model="email" required />
        <q-input outlined label="Passoword" type="password" v-model="password" required />
        <q-btn label="Login" type="submit" class="justify-self-right" />
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { AxiosError } from 'axios';
import { defineComponent } from 'vue';

interface LoginResponse {
  token: string,
  refreshToken: {
    refreshToken: string,
    issuedAt: string,
    client: string,
    userId: number
  }
}

export default defineComponent({
  name: 'Login',
  props: {
    nextRouteName: {
      type: String,
      required: false,
      default: 'Index'
    }
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login(e: Event) {
      e.preventDefault();
      this.$q.loading.show();
      try {
        const response = await this.$api.post<LoginResponse>('/login', {
          email: this.email,
          password: this.password,
          client: 'cogter'
        });
        if (response.status === 200) {
          const { token, refreshToken } = response.data;
          this.$store.commit('auth/clearAuth');
          this.$store.commit('auth/setToken', token);
          this.$store.commit('auth/setRefreshToken', refreshToken);
          void this.$router.push({ name: this.nextRouteName });
        }
      } catch (err) {
        if ((err as AxiosError).response?.status === 404) {
          this.$q.notify({
            type: 'negative',
            message: 'Falsche E-Mail oder falsches Passwort.',
            timeout: 1500
          });
        } else throw err;
      } finally {
        this.$q.loading.hide();
      }
    }
  }
});
</script>
