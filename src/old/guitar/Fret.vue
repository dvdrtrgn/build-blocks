<template lang="pug">
  .fret(
    @click='showTab'
  )
    span.num {{idx ? idx : '|'}}
</template>

<script>
  /* eslint-disable no-console */
  import Notes from './Notes.js';

  const MAX = 24;
  const ZOOM = 1.8;

  function showTab() {
    var note = `${this.str}+${this.idx}`;
    console.log(Notes.detab(note));
  }

  function calcPad(obj) {
    var idx = obj.idx;
    var pad = ((MAX - idx) * ZOOM) / 10;

    if (idx > MAX) throw `${MAX} fret limit!`;
    else obj.$el.style.width = pad + ZOOM + '%';
  }

  export default {
    name: 'Fret',
    props: {
      idx: Number,
      str: String,
    },
    data: () => {
      return {
        note: {},
      };
    },
    methods: {
      showTab,
    },
    mounted: function() {
      calcPad(this);
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  .fret {
    border-left: 1px solid gray;
    color: black;
    cursor: pointer;
    display: inline-block;
    line-height: 2;
    padding: 1px;
    text-align: center;
    text-indent: -105%;

    &:hover {
      border-left: 1px solid red;
      color: red;
    }
    .num {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 100%;
      font-size: 0.8em;
      padding: 0px 11%;
      text-shadow: 1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white,
        -1px -1px 0px white;
    }
  }
</style>
