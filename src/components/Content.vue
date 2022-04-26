<template>
  <v-container>
    <v-row>
      <v-text-field :prepend-icon="icon.magnify" label="Find" dark v-model="search"></v-text-field>
      <v-spacer></v-spacer>
      <v-select label="Filters" :items="filters.items" v-model="filter" :prepend-icon="icon.filter" dark></v-select>
    </v-row>
    <v-row justify="center" v-if="size >= 50">
      <v-btn color="white" icon tile v-on:click="page--" :disabled="page === 1">
        <v-icon>{{icon.left}}</v-icon>
      </v-btn>
      <v-btn icon tile color="white" v-on:click="page = index" v-for="index in Math.ceil(size / 50)" :key="index">
        {{index}}
      </v-btn>
      <v-btn icon color="white" tile v-on:click="page++" :disabled="page === Math.ceil(size / 50)">
        <v-icon>{{icon.right}}</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-col class="pa-4" v-for="(element, index) in chosen(this.$store.getters.getSelected)" :key="index" cols="8" sm="6" md="4" lg="3" xl="2">
        <v-card v-on:click="doIt(element);" min-width="220" max-width="300" color="rgba(0, 0, 0, 0.87)" height="225">
          <v-card-title>
            <v-spacer></v-spacer>
            <h4 class="item_name">{{element.name}}</h4>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-spacer></v-spacer>
              <v-col>
                <v-img :src="element.image" max-height="200" max-width="200"></v-img>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-16" justify="center" v-if="size >= 50">
      <v-btn color="white" icon tile v-on:click="page--" :disabled="page === 1">
        <v-icon>{{icon.left}}</v-icon>
      </v-btn>
      <v-btn icon tile color="white" v-on:click="page = index" v-for="index in Math.ceil(size / 50)" :key="index">
        {{index}}
      </v-btn>
      <v-btn icon color="white" tile v-on:click="page++" :disabled="page === Math.ceil(size / 50)">
        <v-icon>{{icon.right}}</v-icon>
      </v-btn>
    </v-row>
    <v-dialog height="auto" width="auto" v-if="clicked !== null" v-on:click:outside="close" v-model="$store.getters.getOpened">
      <opened-item :item="clicked" ></opened-item>
    </v-dialog>
  </v-container>
</template>

<script>
import {mdiMagnify, mdiFilter, mdiChevronLeft, mdiChevronRight} from '@mdi/js'
import OpenedItem from "@/components/openedItem";

export default {
  name: "Content",
  components: {OpenedItem},
  data() {
    return {
      clicked: null,
      Math: Math,
      search: "",
      size: 0,
      page: 1,
      icon: {
        magnify: mdiMagnify,
        filter: mdiFilter,
        left: mdiChevronLeft,
        right: mdiChevronRight
      },
      filter: "all",
      filters: {
        name: "filter",
        items: ["all"]
      },
    }
  },
  methods: {
    chosen(selected) {
      let items = [];
      let filterType = "";

      if (selected === 'bosses') {items = this.$store.getters.getBoss; filterType = false}
      else if (selected === 'armors') {items = this.$store.getters.getArmors; filterType = "category"}
      else if (selected === 'mobs') {items = this.$store.getters.getMobs; filterType = false}
      else if (selected === 'sorceries') {items = this.$store.getters.getSorceries; filterType = false}
      else if (selected === 'talismans') {items = this.$store.getters.getTalismans; filterType = 'effect'}
      else if (selected === 'npcs') {items = this.$store.getters.getNPCs; filterType = false}
      else if (selected === 'weapons') {items = this.$store.getters.getWeapons; filterType = 'category'}
      else if (selected === 'items') {items = this.$store.getters.getItems; filterType = "type"}
      else if (selected === 'ashes') {items = this.$store.getters.getAshesWar; filterType = "affinity"}
      else if (selected === 'spirits') {items = this.$store.getters.getSpirits; filterType = "type"}
      else if (selected === 'shields') {items = this.$store.getters.getShields; filterType = "category"}
      else if (selected === 'incantations') {items = this.$store.getters.getIncantations; filterType = "type"}
      else {items = this.$store.getters.getOthers; filterType = false}

      if (this.filters.name !== selected) {
        this.resetFilters()
        if (filterType === 'category') this.filters.items.push(...new Set(items.map(item => item.category)))
        else if (filterType === 'type') this.filters.items.push(...new Set(items.map(item => item.type)))
        else if (filterType === 'affinity') this.filters.items.push(...new Set(items.map(item => item.affinity)))
        else if (filterType === 'effect') {
          let effectsCleared = [];
          items.forEach(item => effectsCleared.push(...item.effect.replace(',', '').replace(' in ', ' ').replace(' on ', ' ').replace(' or ', ' ').replace(' but ', ' ').replace(' is ', ' ').replace(' a ', ' ').replace(' at ', ' ').replace(' of ', ' ').replace('.', '').toLowerCase().split(" ")))
          effectsCleared = effectsCleared.map(effect => ({name: effect, count: effectsCleared.filter(e => e.includes(effect)).length}))
          effectsCleared.sort((a, b) => b.count - a.count)
          this.filters.items.push(...new Set(effectsCleared.map(item => item.name)))
        }
        this.filters.name = selected
      }

      if (this.filter !== 'all' && filterType === 'category') items = items.filter(item => item.category === this.filter)
      else if (this.filter !== 'all' && filterType === 'type') items = items.filter(item => item.type === this.filter)
      else if (this.filter !== 'all' && filterType === 'affinity') items = items.filter(item => item.affinity === this.filter)
      else if (this.filter !== 'all' && filterType === 'effect') items = items.filter(item => item.effect.toLowerCase().includes(this.filter))

      let finalResult = items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
      this.size = finalResult.length
      return finalResult.slice((this.page - 1) * 50, this.page * 50)
    },
    doIt(element) {
      console.log(element)
      this.clicked = element
      this.$store.dispatch('setOpened', true)
    },
    close() {
      this.clicked = null;
      this.$store.dispatch('setOpened', false)
    },
    resetFilters() {
      this.filter = 'all'
      this.filters.items = ['all']
    }
  },
  mounted() {
    if (this.$store.getters.getSelected === '') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.item_name {
  font-size: 0.9em;
  font-weight: bold;
  color: white;
  text-align: center;
}
</style>