import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import Home from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import PeopleList from '../components/PeopleList.vue'
import PersonDetail from '../components/PersonDetail.vue'

//const router = createRouter({
//  history: createWebHistory(import.meta.env.BASE_URL),
//  routes: [

//// Detect if running on the server (Deno or SSR)
const isServer = typeof window === 'undefined';

const router = createRouter({
  history: isServer ? createMemoryHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue'),
      component: About,
    },
    {
      path: '/people',
      name: 'people',
      component: PeopleList,
    },
    {
      path: '/person/:id',
      name: 'person',
      component: PersonDetail,
    },
  ],
})

export default router
