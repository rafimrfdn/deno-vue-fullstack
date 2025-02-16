import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import PeopleList from '../components/PeopleList.vue';
import PersonDetail from '../components/PersonDetail.vue';

//// Detect if running on the server (Deno or SSR)
const isServer = typeof window === 'undefined';

const router = createRouter({
  history: isServer ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    //{ path: '/people', component: People },
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
  ]
});

export default router;
