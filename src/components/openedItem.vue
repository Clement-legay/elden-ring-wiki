<template>
  <v-card :width="$vuetify.breakpoint.xsOnly ? '90vw' : '50vw'" color="rgba(0, 0, 0, 0.96)">
    <v-card-title>
      <v-spacer></v-spacer>
      <h4 class="title_item">{{item.name}}</h4>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="6">
          <v-img :src="item.image"></v-img>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" v-if="armorIcon !== null">
        <v-spacer></v-spacer>
        <v-img class="mr-3" max-width="30" max-height="30" :src="armorIcon"></v-img>
        <span class="category_item">{{item.category}}</span>
        <v-spacer></v-spacer>
        <v-icon color="white" class="mr-3 pb-1">{{icons.weight}}</v-icon>
        <span class="weight_item">{{item.weight}}</span>
        <v-spacer></v-spacer>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <p class="desc_item">
            {{item.description}}
            <span v-if="item.description !== undefined && item.description !== null && item.effect !== undefined && item.effect !== null">
            <br/>
            <br/>
            </span>
          <span v-if="item.effect !== undefined && item.effect !== null">
            {{item.effect}}
          </span>
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiWeight } from '@mdi/js'

export default {
  name: "openedItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      armorIcon: null,
      icons: {
        weight: mdiWeight
      }
    }
  },
  methods: {

  },
  mounted() {
    if (this.item.category) this.armorIcon = require('../assets/images/' + this.item.category.split(' ')[0].toLowerCase() + '.png')
  }
}
</script>

<style scoped>
.title_item {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}
.weight_item {
  font-size: 1.2rem;
  font-weight: lighter;
  color: white;
}
.category_item {
  font-size: 1.2rem;
  font-weight: lighter;
  color: white;
}
.desc_item {
  font-size: 1.2rem;
  font-weight: lighter;
  color: white;
  text-align: justify;
  padding: 10px;
  border: 1px solid darkgoldenrod;
}
</style>