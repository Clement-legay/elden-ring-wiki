import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from "@/views/HomeView";
import content from "@/components/Content";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/content',
    name: 'content',
    props: true,
    component: content
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
