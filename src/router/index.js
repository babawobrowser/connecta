// Composables
import { createRouter, createWebHistory } from 'vue-router';
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import Policy from '@/components/Policy.vue'
import DownloadPage from '@/components/audio/DownloadPage.vue'
import Login from '@/components/admins/Login.vue'
import SingleCate from '@/components/audio/categories/SingleCate.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: About,
       title: 'About',
      },
      {
        path: '/file/:id',
        name: 'download',
        component: DownloadPage,
      },
      {
        path: '/contact',
        name: 'contact',
        component: Contact,
      },
      {
        path: '/policy',
        name: 'policy',
        component: Policy,
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Login,
      },
      {
        path: '/category/:id',
        name: 'singlecate',
        component: SingleCate
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Darulfaida'
})

export default router
