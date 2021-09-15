<template>
  <main>
    <div class="neck">
      <String
        @stringPress="lastNote"
        v-for="(note, i) in allStrings"
        :strName="note"
        :strNum="i + 1"
        :key="note"
      ></String>
    </div>
    <pre>{{ stringsPlaying }}</pre>
  </main>
</template>

<script>
  import String from './components/String.vue';

  export default {
    components: { String },
    data: () => {
      return {
        stringsPlaying: {},
        allStrings: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'].reverse(),
      };
    },
    methods: {
      lastNote(arg) {
        this.stringsPlaying[arg.string] = arg.note;
      },
    },
  };
</script>

<style lang="scss">
  #Guitar main {
    .neck {
      border: 2px solid gray;
    }
  }
</style>
