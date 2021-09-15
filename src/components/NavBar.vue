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
    padding: 1rem;

    a {
      color: #2c3e50;

      &.router-link-active {
        font-weight: bold;
      }
      &.router-link-exact-active {
        color: #42b983;
      }
    }

    ul {
      background-color: white;
      list-style: none;
      margin: 0;
      padding: 0;
      position: relative;

      :hover > a {
        color: #911c1c;
      }

      li {
        border-right: 2px solid #eee;
        display: inline;
        padding: 0 0.5em;
        &:last-child {
          border-right: 0;
        }

        // NESTED
        @mixin fadein($z: inherit) {
          opacity: 1;
          pointer-events: all;
          z-index: $z;
        }
        a.router-link-active + ul {
          @include fadein;
        }
        &:hover > ul {
          @include fadein(1);
        }
        ul {
          opacity: 0;
          pointer-events: none;
          position: absolute;
          transition: opacity 1s, z-index 3s;
          width: 100%;
          &:hover {
            @include fadein(2);
          }
        }
      }
    }
  }
</style>
