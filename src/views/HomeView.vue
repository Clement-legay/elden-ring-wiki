<template>
  <v-container>
    <v-row justify="center" class="mt-8">
      <v-col lg="8">
        <v-card class="pa-3" color="rgba(0, 0, 0, 0.87)">
          <v-card-title>
            <h3 class="title_home text-center">Welcome Tarnished, you've landed on the greatest Elden Ring's Wiki !</h3>
          </v-card-title>
          <v-card-text>
            <p class="text_home mt-5">
              You can find all the information you need about the Elden Ring here. Just type the name of the thing you want to know more about, down below.
            </p>
            <v-text-field label="search" dark :prepend-icon="icon.magnify" v-model="search" v-on:keyup.enter="searchIt(search)"></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mdiMagnify} from "@mdi/js";

export default {
  name: 'Home',
  data() {
    return {
      icon: {
        magnify: mdiMagnify
      },
      search: ''
    }
  },
  methods: {
    searchIt(search) {
      this.$store.dispatch('setOthers', search);
      this.$store.dispatch('setSelected', 'others');
      this.$router.push('/content');

    }
  }
}
</script>

<style scoped>
.title_home {
  font-size: 2.5rem;
  font-weight: normal;
  color: white;
}
.text_home {
  font-size: 1.5rem;
  font-weight: lighter;
  color: white;
}
</style>
