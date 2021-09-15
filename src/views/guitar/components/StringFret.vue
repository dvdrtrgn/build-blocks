<template>
  <div class="fret" @click="showTab">
    <span class="num"> {{ idx ? idx : '|' }}</span>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import Notes from '../libs/Notes.js';

  const MAX = 24;
  const ZOOM = 1.8;

  function calcPad(obj) {
    const idx = obj.idx;
    const pad = ((MAX - idx) * ZOOM) / 10;

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
      showTab() {
        console.log(this.detab);
      },
    },
    mounted: function() {
      calcPad(this);
    },
    computed: {
      detab() {
        let note = `${this.str}+${this.idx}`;
        return Notes.detab(note);
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
