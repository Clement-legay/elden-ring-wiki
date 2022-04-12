<template>
  <div id="header">
    <div class="header_logo">
      <v-img width="200" height="50" src="../assets/images/textLogo.png"></v-img>
    </div>
    <div class="header_nav">
      <ul>
        <li v-for="(item, index) in navigation" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "background",
  data () {
    return {
      navigation: [
        "Sorts",
        "Talismans",
        "Armures",
        "Loots",
        "Mobs",
        "Boss",
        "Quêtes"
      ]
    }
  }
}
</script>

<style scoped>
  #header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
</style>