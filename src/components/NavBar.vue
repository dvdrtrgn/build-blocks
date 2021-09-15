<template>
  <nav id="Nav">
    <ul>
      <li v-for="(parent, i) in routes" :key="i">
        <router-link :to="parent.path">{{ parent.name }}</router-link>

        <ul v-if="parent.children">
          <li v-for="(child, i) in parent.children" :key="i">
            <router-link :to="`${parent.path}/${child.path}`">{{
              child.name
            }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    computed: {
      routes() {
        return this.$router.options.routes;
      },
    },
  });
</script>

<style lang="scss">
  #Nav {
    a {
      color: silver;
      font-weight: bold;

      &.router-link-active {
        text-decoration: underline;
      }
      &.router-link-exact-active {
        color: white;
        text-shadow: 0 0 2px black;
      }
    }

    ul {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      list-style: none;
      padding: 0 2rem;

      :hover > a {
        color: lime;
      }

      li {
        border-right: 2px solid silver;
        display: inline;
        padding: 0 0.5em;
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
</style>
