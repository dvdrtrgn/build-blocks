<template>
  <div tabindex="0">
    <button @click="dump">dump</button>
    <button @click="clear">clear</button>
    <button @click="save('s1')">save 1</button>
    <button @click="load('s1')">load 1</button>
    <hr />
    <ShowNote
      tabindex="0"
      v-for="note in notes"
      :key="note.start"
      :note="note"
      @focus="play(note)"
    />
  </div>
</template>

<script>
  import Store from '@/store';
  import synth from './synth.js';
  import ShowNote from './ShowNote';

  export default {
    props: ['notes'],
    components: {
      ShowNote,
    },
    data() {
      return {
        synth: synth.make(),
        songs: Store.getters.getSongs,
      };
    },
    methods: {
      clear() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      load(name) {
        let song = this.songs[name];
        song = JSON.parse(song);
        console.log(999, song);
      },
      save(name) {
        Store.commit('saveSong', {
          name: name,
          json: this.json,
        });
      },
      dump() {
        console.log(this.json);
      },
    },
    computed: {
      json() {
        let dump = this.notes.map(e => e.vitals());

        return JSON.stringify(dump);
      },
    },
  };
</script>

<style lang="scss" scoped>
  div {
    columns: 1;
  }
</style>
