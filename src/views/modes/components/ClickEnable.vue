<template>
  <div class="click-enable" :enabled="enabledVal" @mousedown="setEnabled">
    <slot />
  </div>
</template>

<script>
  export default {
    props: ['on', 'once'],
    emits: ['update:on'],
    methods: {
      setEnabled() {
        if (this.isOnce && this.on) return;
        this.$emit('update:on', !this.on);
      },
    },
    computed: {
      enabledVal() {
        return this.on ? '' : null;
      },
      isOnce() {
        return this.once !== undefined;
      },
    },
  };
</script>

<style></style>
