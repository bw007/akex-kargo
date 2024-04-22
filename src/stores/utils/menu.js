export const menu = [
  {
    path: '',
    name: 'home',
    icon: 'pie-chart',
    meta: {
      title: 'Bosh sahifa',
      secure: false
    },
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: 'workers',
    name: 'workers',
    icon: 'Setting',
    meta: {
      title: 'Hodimlar',
      secure: false
    },
    // component: () => import("@/views/SettingView.vue")
  },
  {
    path: 'orders',
    name: 'orders',
    title: 'Buyurtmalar',
    icon: 'Setting',
    meta: {
      title: 'Buyurtmalar',
      secure: false
    },
    // component: () => import("@/views/SettingView.vue")
  },
  {
    path: 'setting',
    name: 'setting',
    title: 'Sozlamalar',
    icon: 'Setting',
    meta: {
      title: "Sozlamalar",
      secure: false
    },
    // component: () => import("@/views/SettingView.vue")
  }
]