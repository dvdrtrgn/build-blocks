<template>
  <main>
    <div class="tidy player" @mousedown.once="enablemode" :class="{ enabled }">
      <h1>Try the modes</h1>
      <SongPicker v-model:modelSong="selectedSong" />
      <ModePicker v-model:modelMode="selectedMode" />
      <SynthPicker v-model:modelSynth="selectedSynth" />
      <SongPlayer :mode="selectedMode" :song="selectedSong" />
    </div>
    <label>
      <input v-model="showModeInfo" type="checkbox" />
      Mode info
    </label>
    <div v-show="showModeInfo">
      <ModePlayer :mode="selectedMode" />
    </div>
  </main>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import Store from './store.js';

  import SynthPicker from './components/SynthPicker.vue';
  import SongPicker from './components/SongPicker.vue';
  import SongPlayer from './components/SongPlayer.vue';
  import ModePicker from './components/ModePicker.vue';
  import ModePlayer from './components/ModePlayer.vue';
  // console.clear();
  import Toner from './components/libs/tone_wrap.js';

  const state = reactive(
    Store.init({
      showModeInfo: false,
      selectedMode: 'ionian',
      selectedSong: 'mary',
      selectedSynth: 'am',
    }),
  );

  const app = {
    components: {
      SynthPicker,
      SongPicker,
      SongPlayer,
      ModePicker,
      ModePlayer,
    },
    data() {
      return {
        enabled: false,
        ...toRefs(state),
      };
    },
    methods: {
      enablemode() {
        Toner.enable();
        this.enabled = true;
      },
      save() {
        Toner.stop();
        Store.save();
      },
    },
    created() {
      console.log('Store', Store);
    },
    watch: {
      selectedMode: 'save',
      selectedSong: 'save',
      selectedSynth: 'save',
    },
  };

  export default app;
</script>

<style lang="scss">
  #Modes main {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding-left: 3rem;
    padding-right: 3rem;
    text-align: left;

    .player:not(.enabled) * {
      opacity: 0.5;
    }
  }

</style>
