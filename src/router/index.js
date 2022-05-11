import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from "@/views/HomeView";
import content from "@/components/Content";
import Armor from "@/views/Armor";
import talismans from "@/views/Talismans";
import asheswar from "@/views/asheswar";
import Bosses from "@/views/Bosses";
import Items from "@/views/Items";
import incantations from "@/views/Incantations";
import mobs from "@/views/Mobs";
import locations from "@/views/Locations";
import weapons from "@/views/Weapons";
import shields from "@/views/Shields";
import npcs from "@/views/npcs";
import sorceries from "@/views/Sorceries";
import spirits from "@/views/Spirits";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView,
  },
  {
    path: '/content',
    name: 'content',
    props: true,
    component: content
  },
  {
    path: '/armors/:itemName',
    name: 'armors',
    props: true,
    component: Armor,
  },
  {
    path: '/ashes/:itemName',
    name: 'asheswar',
    props: true,
    component: asheswar,
  },
  {
    path: '/talismans/:itemName',
    name: 'talismans',
    props: true,
    component: talismans,
  },
  {
    path: '/bosses/:itemName',
    name: 'bosses',
    props: true,
    component: Bosses,
  },
  {
    path: '/incantations/:itemName',
    name: 'incantations',
    props: true,
    component: incantations,
  },
  {
    path: '/items/:itemName',
    name: 'items',
    props: true,
    component: Items,
  },
  {
    path: '/locations/:itemName',
    name: 'locations',
    props: true,
    component: locations,
  },
  {
    path: '/mobs/:itemName',
    name: 'mobs',
    props: true,
    component: mobs,
  },
  {
    path: '/npcs/:itemName',
    name: 'npcs',
    props: true,
    component: npcs,
  },
  {
    path: '/shields/:itemName',
    name: 'shields',
    props: true,
    component: shields,
  },
  {
    path: '/weapons/:itemName',
    name: 'weapons',
    props: true,
    component: weapons,
  },
  {
    path: '/sorceries/:itemName',
    name: 'sorceries',
    props: true,
    component: sorceries,
  },
  {
    path: '/spirits/:itemName',
    name: 'spirits',
    props: true,
    component: spirits,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
