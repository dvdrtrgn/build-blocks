<template>
  <button class="songnote" @focus="play(note)">
    <span
      class="editable pitch"
      :title="editmsg"
      @click.alt="editPitch(note)"
      v-html="label"
    ></span>
    <small
      class="editable duration"
      @click.alt="editDuration(note)"
      :title="editmsg"
      >{{ note.duration.toFixed(2).replace('0.', '.') }}s</small
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
        editmsg: 'Hold alt to edit',
      };
    },
    methods: {
      play(note) {
        this.$emit('play', note);
      },
      editDuration(note) {
        let val = note.aprox;
        let out = prompt('Edit duration', val);

        if (out && val != out) note.duration = out;
      },
      editPitch(note) {
        let val = note.pitch;
        let out = prompt('Edit pitch', val);

        if (out && val != out) note.pitch = out;
      },
    },
    computed: {
      label() {
        let text = this.note.pitch.toString();
        let html = text.replace('#', '<sup>♯</sup>');

        html = html.replace(/(\d)/, '<sub>$1</sub>');

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
    line-height: 0.5;
    padding: $root / 2;
    padding-left: 0;
    white-space: nowrap;

    &:before {
      content: '♩';
      position: relative;
    }

    .duration {
      font-size: 66%;
    }
    .editable {
      background-color: white;
      border-radius: 20%;
      padding: 0 $quart / 2;
      cursor: pointer;

      &:hover {
        outline-color: silver;
        outline-offset: -1px;
        outline-style: solid;
        outline-width: 1px;
      }
    }
    sub {
      font-size: 66%;
      vertical-align: bottom;
    }
    sup {
      font-size: 66%;
      vertical-align: top;
    }
  }
</style>
