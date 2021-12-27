<template>
  <section class="board-app">
    <side-bar></side-bar>
    <router-view />
  </section>
</template>

<script>
  import sideBar from '../cmps/side-bar.vue'
export default {
  created() {
    this.$store.dispatch({ type: "getBoardsList" });
  },
  components: {
    sideBar
  },
};
</script>

<style>
</style>