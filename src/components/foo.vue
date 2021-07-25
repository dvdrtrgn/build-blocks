<template>
  <div id="content">
    <button @click="start">start</button>
    <button @click="stop">stop</button>
    <input
      type="range"
      @change="input"
      label="tempo"
      units="bpm"
      min="60"
      max="240"
      value="150"
    />
    <article @click="trigger">
      <span v-for="i in 16" :key="i">
        {{ i }}
        <button v-for="j in 4" :key="i + '-' + j">{{ j }}</button>
      </span>
    </article>
  </div>
</template>

<script>
  import * as Tone from 'tone';

  const keys = new Tone.Players({
    urls: {
      0: 'A1.mp3',
      1: 'Cs2.mp3',
      2: 'E2.mp3',
      3: 'Fs2.mp3',
    },
    fadeOut: '64n',
    baseUrl: 'https://tonejs.github.io/audio/casio/',
  }).toDestination();

  export default {
    methods: {
      stop: () => Tone.Transport.stop(),
      start: () => Tone.Transport.start(),
      input: e => {
        Tone.Transport.bpm.value = parseFloat(e.target.value);
      },
      trigger: ({ detail }) => {
        keys.player(detail.row).start(detail.time, 0, '16t');
      },
    },
  };
</script>

<style>
  article {
    display: flex;
  }
</style>
