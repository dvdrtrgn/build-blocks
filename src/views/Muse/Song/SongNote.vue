<template>
  <button
    v-if="note.duration"
    class="songnote"
    :class="{ rest: note.isRest }"
    @focus="play(note)"
  >
    <span
      class="pitch editable"
      :title="editmsg"
      @click.alt="editPitch(note)"
      v-html="label"
    ></span>
    <small
      class="duration editable"
      @click.alt="editDuration(note)"
      :title="editmsg"
      >{{ note.duration.toFixed(1) }}s</small
    >
  </button>
</template>

<script>
  import Bus from '@/bus';

  export default {
    props: ['note'],
    data() {
      return {
        editmsg: 'Hold alt to edit',
      };
    },
    methods: {
      play(note) {
        Bus.$emit('playNote', note);
      },
      editDuration(note) {
        let val = note.duration;
        let out = prompt('Edit duration', val);

        if (out && val != out) note.duration = out;
      },
      editPitch(note) {
        let val = note.label;
        let out = prompt('Edit pitch', val);

        if (out && val != out) note.name = out;
      },
    },
    computed: {
      label() {
        let text = this.note.label;
        let html = text.replace('#', '<sup>♯</sup>');

        return html.replace(/(\d)/, '<sub>$1</sub>');
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.4rem;

  #Song .songnote {
    $quart: $root/4;

    display: inline-block;
    font-size: $root;
    line-height: 0.5;
    padding: $root/2;
    white-space: nowrap;

    .duration {
      font-size: 66%;
    }
    .editable {
      background-color: white;
      border-radius: $quart;
      padding: 0 $quart/2;
      cursor: pointer;

      &:hover {
        outline-color: silver;
        outline-offset: -1px;
        outline-style: solid;
        outline-width: 1px;
      }
    }
    &.rest {
      background-color: silver;
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
