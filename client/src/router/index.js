import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // beforeEnter: (to, from, next) => {
    //   store.dispatch('fetchQuestions')
    //   next()
    // }
  },
  {
    path: '/signin',
    name: 'signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/FormSignin')
  },
  {
    path: '/join',
    name: 'join',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/FormJoin')
  },
  {
    path: '/ask',
    name: 'ask',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/FormWYSIWYG')
  },
  {
    path: '/questions/:id',
    name: 'question-item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/QuestionItem'),
    // beforeEnter: (to, from, next) => {
    //   store.dispatch('fetchAQuestion', this.$route.params.id)
    //   next()
    // }
  },
  {
    path: '/questions/:id/update',
    name: 'question-update',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/FormWYSIWYGUpdateQ'),
    // beforeEnter: (to, from, next) => {
    //   store.dispatch('fetchAQuestion', this.$route.params.id)
    //   next()
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
