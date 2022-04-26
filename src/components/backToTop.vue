<template>
  <v-fade-transition>
    <v-btn v-scroll="onScroll" v-show="fab" small fab fixed bottom right color="white" @click="toTop">
      <v-icon color="black">{{chevronUp}}</v-icon>
    </v-btn>
  </v-fade-transition>
</template>

<script>
import { mdiChevronUp } from '@mdi/js'

export default {
  name: "backToTop",
  data() {
    return {
      fab: false,
      chevronUp: mdiChevronUp
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style scoped>

</style>