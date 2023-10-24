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
       title: 'Darulfaida'
      },
      {
        path: '/about',
        name: 'about',
        component: About,
       title: 'About',
       meta: {
        title: 'Darulfaida - About'
      }
      },
      {
        path: '/file/:id',
        name: 'download',
        component: DownloadPage,
        meta: {
          title: ''
        }
      },
      {
        path: '/contact',
        name: 'contact',
        component: Contact,
        meta: {
          title: 'Darulfaida - Contact'
        }
      },
      {
        path: '/policy',
        name: 'policy',
        component: Policy,
        meta: {
          title: 'Darulfaida - Policy'
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Login,
        meta: {
          title: 'Darulfaida - Dashboard'
        },
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
