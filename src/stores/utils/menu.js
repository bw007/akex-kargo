import { storeToRefs } from 'pinia';
import { authStore } from '../auth/auth';
import { watch } from 'vue';

export const menu = [
  {
    path: '',
    name: 'home',
    title: 'Bosh sahifa',
    icon: 'pie-chart',
    meta: {
      title: 'Statistika',
      secure: true,
      view: true
    },
    component: () => import('@/views/page/HomeView.vue')
  },
  {
    path: 'workers',
    name: 'workers',
    title: 'Xodimlar',
    icon: 'Service',
    meta: {
      title: 'Ishchi xodimlar',
      secure: true,
      view: true
    },
    component: () => import('@/views/page/WorkersView.vue'),
    beforeEnter: () => {
      const auth_store = authStore();
      const { user } = storeToRefs(auth_store)
      watch(user, () => {
        auth_store.checkUser("full")
      })
    }
  },
  {
    path: 'orders',
    name: 'orders',
    title: 'Buyurtmalar',
    icon: 'Goods',
    meta: {
      title: 'Buyurtmalar',
      secure: true,
      view: true
    },
    component: () => import("@/views/page/OrdersView.vue")
  },
  {
    path: 'payments',
    name: 'payments',
    title: "Moliya",
    icon: 'Money',
    meta: {
      title: "Moliyaviy operatsiyalar",
      secure: true,
      view: true
    },
    component: () => import("@/views/page/PaymentsView.vue")
  },
  {
    path: 'settings',
    name: 'settings',
    title: 'Sozlamalar',
    icon: 'Setting',
    meta: {
      title: 'Sozlamalar',
      secure: true,
      view: true
    },
    component: () => import("@/views/page/SettingsView.vue"),
    // children: [
    //   {
    //     path: 'setting/profile/:id',
    //     name: 'profileSetting',
    //     meta: {
    //       title: 'Profil',
    //       secure: true
    //     },
    //     component: () => import('@/views/SettingView.vue'),
    //   },
    // ]
  }
]
