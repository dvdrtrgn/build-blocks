<template>
  <div class="fret" :class="{ active }" @click="showTab">
    <span class="num"> {{ fretNum ? fretNum : '|' }}</span>
  </div>
</template>

<script>
  import Notes from '../libs/Notes.js';

  const MAX = 24; // name ambiguous
  const ZOOM = 1.8;

  function calcPadding(idx, ele) {
    const pad = ((MAX - idx) * ZOOM) / 10;

    if (idx > MAX) {
      throw `${MAX} fret limit!`;
    } else {
      ele.style.width = pad + ZOOM + '%';
    }
  }

  export default {
    props: {
      active: Boolean,
      fretNum: Number,
      strName: String,
    },
    data: () => {
      return {};
    },
    methods: {
      showTab() {
        this.$emit('fretted', this.detab);
        console.log(this.detab);
      },
    },
    mounted: function() {
      calcPadding(this.fretNum, this.$el);
    },
    computed: {
      code() {
        return `${this.strName}+${this.fretNum}`;
      },
      detab() {
        return Notes.detab(this.code);
      },
    },
  };
</script>

<style lang="scss">
  .fret {
    border-left: 3px solid gray;
    color: black;
    cursor: pointer;
    display: inline-block;
    line-height: 2;
    padding: 1px;
    text-align: center;
    text-indent: -111%;

    &:hover {
      border-color: white;
      color: darkred;
    }

    &.active .num {
      border: 1px solid red;
    }
    .num {
      background-color: rgba(255, 255, 255, 0.5);
      border: 1px solid gray;
      border-radius: 100%;
      font-size: 0.7em;
      padding: 0px 15%;
      text-shadow: 1px 1px 1px white, -1px 1px 1px white, 1px -1px 1px white;
    }
  }
</style>
