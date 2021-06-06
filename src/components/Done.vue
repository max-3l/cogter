<template>
  <div class="column items-center padding">
    <h4>Vielen Dank für Ihre Teilnahme! Sie können das Programm nun beenden.</h4>
    <div class="row justify-evenly">
      <q-btn size="lg" label="Zurück zum Anfang" @click="$emit('done')" />
      <q-btn size="lg" label="Ergebnisse herunterladen" @click="downloadResults" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import download from 'downloadjs';

export default defineComponent({
  name: 'Done',
  async mounted() {
    this.$q.loading.show();
    try {
      const results = { results: this.$store.state.results.results };
      const testResults = {
        testResult: JSON.stringify(results),
        timestamp: window.performance.now()
      };
      await this.$api.post('/testresults', testResults, { headers: { Authorization: `Bearer ${this.$store.state.auth.token ?? ''}` } });
      this.$q.loading.hide();
    } catch {
      this.$q.loading.hide();
      this.$q.dialog({ title: 'Wichtig', message: 'Beim Hochladen der Testergebnisse ist ein Fehler aufgetreten. Bitte speichern Sie die Testergebnisse ab und senden diese dem Leiter der Studie per E-Mail. Vielen Dank.' })
        .onDismiss(() => this.downloadResults());
    }
  },
  methods: {
    downloadResults() {
      const results = { results: this.$store.state.results.results };
      download(JSON.stringify(results), 'ergbnisse.json', 'application/json');
    }
  }
});
</script>
