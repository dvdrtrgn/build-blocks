<template>
  <button class="songnote" @focus="play(note)">
    <span
      class="editable pitch"
      :title="editmsg"
      @click.alt="edit(note, 'pitch')"
      v-html="label"
    ></span>
    <small
      class="editable duration"
      @click.alt="edit(note, 'duration')"
      :title="editmsg"
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
        editmsg: 'Hold alt to edit',
        editing: null,
      };
    },
    methods: {
      play(note) {
        if (!this.editing) {
          this.$emit('play', note);
        }
      },
      edit(note, prop) {
        this.editing = note;

        let val = note[prop];
        let out = prompt('Edit ' + prop, val);

        this.editing = null;

        if (out && val != out) {
          note[prop] = out;
          this.play(note);
        }
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
