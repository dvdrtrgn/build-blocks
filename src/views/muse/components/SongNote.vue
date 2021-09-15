<template>
  <!-- <transition name="fade" appear> -->
  <button
    :class="classObj"
    v-if="note.duration"
    @focus="play(note)"
    :title="editmsg"
  >
    <span
      v-show="note.label != 'R'"
      class="pitch editable"
      @mousedown.alt="editNote(note)"
    >
      <span class="pitch" v-html="pitchLabel"></span>
      <i class="interval" v-html="note.interval || 'Rest'"></i>
    </span>
    <small class="duration editable" @mousedown.alt="editDuration(note)"
      >{{ note.duration.toFixed(1) }}s</small
    >
  </button>
  <!-- </transition> -->
</template>

<script>
  import Bus from '../libs/bus';

  export default {
    props: ['note'],
    data() {
      return {
        editmsg: 'To Edit values\n<option-click>',
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
      editNote(note) {
        let val = note.label;
        let out = prompt('Edit pitch', val);
        if (out && val != out) note.name = out;
      },
    },
    computed: {
      pitchLabel() {
        let text = this.note.label;
        let html = text.replace('#', '<sup>♯</sup>');
        return html.replace(/(\d)/, '<sub>$1</sub>');
      },
      classObj() {
        return {
          songnote: true,
          rest: this.note.isRest,
        };
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.4rem;
  .cuelist {
    &.pitch .interval {
      display: none;
    }
    &.interval .pitch {
      display: none;
    }
  }
  #Song .songnote {
    $quart: $root/4;

    border-radius: $quart;
    cursor: pointer;
    display: inline-block;
    font-size: $root;
    white-space: nowrap;

    .duration {
      font-size: 66%;
    }
    .editable {
      background-color: rgba(white, 0.5);
      border-radius: $quart;
      display: inline-block;
      padding: 0 $quart/2;
      transition: transform 1s;

      &:hover {
        background-color: rgba(silver, 0.5);
        transform: scale(1.2);
      }
    }
    &.rest {
      background-color: white;
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
