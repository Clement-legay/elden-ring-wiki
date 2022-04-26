<template>
  <div>
    <div id="header" class="py-8 px-12">
      <div class="header_logo">
        <router-link to="/">
          <v-img width="200" height="50" src="../assets/images/textLogo.png"></v-img>
        </router-link>
      </div>
      <div class="header_nav">
        <ul v-if="$vuetify.breakpoint.mdAndUp">
          <v-menu content-class="test" left top absolute origin="right" :close-on-content-click="false" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon color="white">{{icon.magnify}}</v-icon>
              </v-btn>
            </template>
            <v-text-field dark  v-model="search" v-on:keyup.enter="searchIt(search)" label="Search"></v-text-field>
          </v-menu>
          <li v-for="(item, index) in navigation" :key="index" v-on:click="select(item.prop)">{{item.name}}</li>
          <v-menu transition="slide-y-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <li v-bind="attrs" v-on="on">Others</li>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title v-on:click="select(item.prop)">{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </ul>
        <ul v-else>
          <v-menu :close-on-content-click="false" left origin="right" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on:click="opened = true" v-show="!opened" v-bind="attrs" v-on="on" icon>
                <v-icon color="white">{{icon.magnify}}</v-icon>
              </v-btn>
            </template>
            <v-text-field dark :prepend-icon="icon.magnify" v-model="search" v-on:keyup.enter="searchIt(search)" label="Search"></v-text-field>
          </v-menu>
          <v-menu :close-on-content-click="false" transition="slide-y-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon color="white">{{icon.more}}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in navigation.concat(items)" :key="i">
                <v-list-item-title v-on:click="select(item.prop)">{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </ul>
      </div>
    </div>
    <div id="background"></div>
  </div>
</template>

<script>
import { mdiChevronDown, mdiMagnify } from '@mdi/js';

export default {
  name: "background",
  data () {
    return {
      icon: {more: mdiChevronDown, magnify: mdiMagnify},
      opened: false,
      search: '',
      items: [
        {
          name: 'NPCs',
          prop: 'npcs',
        },
        {
          name: 'Mobs',
          prop: 'mobs',
        },
        {
          name: 'Weapons',
          prop: 'weapons',
        },
        {
          name: 'Spirits',
          prop: 'spirits',
        },
        {
          name: 'Ashes of War',
          prop: 'ashes',
        },
        {
          name: 'Shields',
          prop: 'shields',
        },
        {
          name: 'Incantations',
          prop: 'incantations',
        },
      ],
      navigation: [
        {
          name: "Sorceries",
          prop: "sorceries"
        },
        {
          name: "Talismans",
          prop: "talismans"
        },
        {
          name: "Armors",
          prop: "armors"
        },
        {
          name: "Bosses",
          prop: "bosses"
        },
        {
          name: "Items",
          prop: "items"
        },
      ]
    }
  },
  methods: {
    select(item) {
      console.log(item);
      this.$store.dispatch('setSelected', item);
      if (this.$router.currentRoute.fullPath !== '/content') {
        this.$router.push('/content');
      }
    },
    searchIt(search) {
      this.$store.dispatch('setOthers', search);
      this.$store.dispatch('setSelected', 'others');
      if (this.$router.currentRoute.fullPath !== '/content') {
        this.$router.push('/content');
      }
    }
  }
}
</script>

<style scoped>
#background {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/images/background.jpg");
  background-position: center;
  background-color: black;
}
.test {
  top: -3px !important;
  box-shadow: none !important;
}

#header {
  width: 100%;
  height: 50px;
  left: 0;
  top: 0;
  background-color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
}
.header_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #1a1a1a;
}
.header_nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #1a1a1a;
}
.header_nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #1a1a1a;
}

.header_nav ul li {

  text-decoration: none;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  list-style: none;
  margin: 0 10px;
}
</style>