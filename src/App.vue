<template>
  <v-app>
      <Header></Header>
    <back-to-top></back-to-top>
      <router-view class="mt-15"></router-view>
  </v-app>
</template>

<script>
import Header from "@/components/HeaderBackground";
import BackToTop from "@/components/backToTop";

export default {
  name: 'App',
  components: {
    BackToTop,
    Header
  },
  mounted() {
    this.$store.dispatch('setEverybody');
  }
};
</script>

<style>
@font-face {
  font-family: "Anek-Tamil";
  src: url("./assets/font/Anek/AnekTamil-VariableFont_wdth,wght.ttf");
}

* {
  font-family: "Anek-Tamil", sans-serif;
  user-select: none;
}
</style>
