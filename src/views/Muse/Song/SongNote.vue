<template>
  <transition name="fade" appear>
    <button :class="classObj" v-if="note.duration" @focus="play(note)">
      <span
        class="note editable"
        :title="editmsg"
        @mousedown.alt="editNote(note)"
      >
        <span class="pitch" v-html="pitchLabel"></span>
        <i class="interval" v-html="note.interval || 'Rest'"></i>
      </span>
      <small
        class="duration editable"
        @mousedown.alt="editDuration(note)"
        :title="editmsg"
        >{{ note.duration.toFixed(1) }}s</small
      >
    </button>
  </transition>
</template>

<script>
  import Bus from '@/bus';

  export default {
    props: ['note'],
    data() {
      return {
        editmsg: 'Edit [option-click]',
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
        let out = prompt('Edit note', val);
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
    display: inline-block;
    font-size: $root;
    line-height: 0.5;
    padding: $root/2 $root/4;
    white-space: nowrap;

    .duration {
      font-size: 66%;
    }
    .editable {
      background-color: rgba(white, 0.5);
      border-radius: $quart;
      padding: 0 $quart/2;
      cursor: pointer;

      &:hover {
        background-color: rgba(white, 1);
        outline-color: silver;
        outline-offset: -1px;
        outline-style: solid;
        outline-width: 1px;
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
