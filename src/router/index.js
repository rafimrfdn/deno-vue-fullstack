import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeopleList from '../components/PeopleList.vue'
import PersonDetail from '../components/PersonDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
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
