<template>
  <button @click="play">Play {{ song }}</button>
  <button v-if="playing" @click="stop">Silence</button>
  <p>
    Intervals to play: <br />
    <small>{{ ivals.join(', ') }}</small>
  </p>
  <p>
    Notes for song: <br />
    <!-- <small>{{ names.join(' ') }}</small> -->
    <small v-html="tags"></small>
  </p>
</template>

<script>
  import SongsModel from './libs/songs-model.js';
  import Toner from './libs/tone_wrap.js';

  export default {
    props: ['song', 'mode'],
    data() {
      return {
        playing: false,
      };
    },
    methods: {
      play() {
        this.playing = true;
        Toner.playSequence(this.names);
      },
      stop() {
        this.playing = false;
        Toner.stop();
      },
    },
    computed: {
      ivals() {
        return SongsModel.getIvalsFor(this.song);
      },
      notes() {
        return SongsModel.getNotesFor(this.song, this.mode);
      },
      tags() {
        console.log('this.notes', this.notes);
        return this.notes.map((e) => e.html).join(' ');
      },
      names() {
        return this.notes.map((e) => e.name);
      },
    },
    created() {},
  };
</script>

<style lang="scss">
  .notation {
    sub {
      font-weight: 100;
    }
    sup {
      font-weight: 300;
      margin-right: -0.3em;
    }
  }
</style>
