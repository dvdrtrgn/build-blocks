<template>
  <button class="songnote" @focus="play(note)">
    <span class="icon">♩</span>

    <span
      class="editable pitch"
      @click="edit(note, 'pitch')"
      v-html="label"
    ></span>

    <small class="editable duration" @click="edit(note, 'duration')"
      >{{ note.duration.toFixed(1).replace('0.', '.') }}s</small
    >
  </button>
</template>

<script>
  import makeSynth from '@/libs/make-synth.js';

  export default {
    props: ['note'],
    data() {
      return {
        synth: makeSynth(),
      };
    },
    methods: {
      play(note) {
        this.$emit('play', note);
      },
      edit(note, prop) {
        let val = note[prop];
        let out = prompt('Edit ' + prop, val);
        if (out && val != out) note[prop] = out;
      },
    },
    computed: {
      label() {
        let html = this.note.pitch.toString().replace('#', '<sup>♯</sup>');

        return html;
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.4rem;

  #Song .songnote {
    $quart: $root / 4;

    display: inline-block;
    font-size: $root;
    line-height: 1;
    padding: $quart;
    white-space: nowrap;

    .icon {
      margin: -$quart;
    }
    .duration {
      font-size: 66%;
    }
    .editable {
      cursor: pointer;
      margin: 0 $quart / 2;

      &:hover {
        outline-color: red;
        outline-offset: 1px;
        outline-style: solid;
        outline-width: 1px;
      }
    }
    sup {
      font-size: 66%;
      vertical-align: top;
    }
  }
</style>
