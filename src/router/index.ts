import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import BookDetails from '../components/BookDetails.vue'
import Random from '@/views/Random.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/random',
    name: 'Random',
    component: Random
  },
  {
    path: '/details/:bookId',
    name: 'Details',
    component: BookDetails,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
