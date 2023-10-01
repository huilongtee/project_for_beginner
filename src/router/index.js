import Vue from 'vue'
import VueRouter, { RouterLink } from 'vue-router'
import Manager from '../views/Manager.vue'
import Element from '../views/manager/Element.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Auth from '../views/manager/Auth.vue'
import Home from '../views/manager/Home.vue'
import User from '../views/manager/User.vue'
import Person from '../views/manager/Person.vue'
import Password from '../views/manager/Password.vue'
import News from '../views/manager/News.vue'
import PageNotFound from '../views/404.vue'


//to prevent the error of clicking the menu rapidly
// and to prevent the error of click redundant path/same location
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manager',
    component: Manager,
    redirect: '/home',  //as a default home page
    children: [
      { path: '403', name: 'Auth', component: Auth, meta: { name: 'Auth' } },
      { path: 'home', name: 'Home', component: Home, meta: { name: 'Home' } },
      { path: 'user', name: 'User', component: User, meta: { name: 'User' } },
      { path: 'element', name: 'Element', component: Element, meta: { name: 'Element' } },
      { path: 'person', name: 'Person', component: Person, meta: { name: 'Person' } },
      { path: 'password', name: 'Password', component: Password, meta: { name: 'Password' } },
      { path: 'news', name: 'News', component: News, meta: { name: 'News' } },

    ],
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: { name: 'Login' }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: { name: 'Register' }
  },

  //* means unable to catch the path, then run the final one
  {
    path: '*',
    name: '404',
    component: PageNotFound,
    meta: { name: '404' }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//router guard
//for validation of which user type able access which path
router.beforeEach((to, from, next) => {
  console.log(to, from, next);

  //to: router message that arrived
  //from: router message that initial
  //next: variable for helping us to redirect to next page

  let adminPaths = ['/user']
  let user = JSON.parse(localStorage.getItem('honey-user') || '{}')

console.log(to)

  if (user.role !== 'admin' && adminPaths.includes(to.path)) {  //if current login user is not admin, but the url path is the path that only authorized person who can access, then redirect current user to the path that doesn't needed for authorization/ can be access by everyone
    next('/403')

  } else {
    next()
  }
})

export default router
