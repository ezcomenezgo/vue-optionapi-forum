<template>
  <TheNavbar />
  <router-view />
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
export default {
  name: "App",
  components: {
    TheNavbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
