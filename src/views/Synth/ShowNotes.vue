<template>
  <div>
    <button @click="dump">dump</button>
    <button @click="clear">clear</button>
    <button @click="save('s1')">save</button>
    <button @click="load('s1')">load</button>
    <hr />
    <div tabindex="0">
      <ShowNote
        @play="play"
        tabindex="0"
        v-for="note in notes"
        :key="note.vitals()"
        :note="note"
        @focus="play(note)"
      />
    </div>
  </div>
</template>

<script>
  import Store from '@/store';
  import ShowNote from './ShowNote';

  import makeSynth from './make-synth.js';
  import makeNote from './make-note.js';
  import focusNext from './focus-next.js';

  export default {
    props: ['notes'],
    components: {
      ShowNote,
    },
    data() {
      return {
        synth: makeSynth(),
        songs: Store.getters.getSongs,
      };
    },
    methods: {
      play(arg) {
        this.synth.play(arg, focusNext());
      },
      clear() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      load(name) {
        let song = JSON.parse(this.songs[name]);
        this.clear();

        song.forEach(e => {
          let note = makeNote(...e.split(' '));
          this.notes.push(note);
        });
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
    background-color: pink;
  }
</style>
