import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Auth from '../views/Auth.vue'
import Registration from '../views/Registration.vue'
import Account from '../views/UserAccount.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
