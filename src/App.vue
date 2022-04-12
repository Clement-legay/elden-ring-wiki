<template>
  <v-app>
    <v-parallax src="./assets/images/background.jpg">
      <Header></Header>
      <router-view></router-view>
    </v-parallax>
  </v-app>
</template>

<script>

import Header from "@/components/HeaderBackground";

export default {
  name: 'App',
  components: {
    Header
  },
};
</script>

<style>
</style>
