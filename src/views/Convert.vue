<template>
  <div>
    <form action="" @submit.prevent="onSubmit">
      <input type="text" v-model="arg" />
      <p>REPRESENT NOTE</p>
    </form>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import makeNote from '@/guitar/makeNote.js';

  export default {
    data() {
      return {
        arg: '69',
      };
    },
    methods: {
      onSubmit() {
        console.log(makeNote(this.arg));
      },
    },
  };
</script>

<style lang="scss" scoped></style>
