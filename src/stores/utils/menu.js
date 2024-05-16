export const menu = [
  {
    path: '',
    name: 'home',
    title: 'Bosh sahifa',
    icon: 'pie-chart',
    meta: {
      title: 'Statistika',
      secure: true
    },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: 'workers',
    name: 'workers',
    title: 'Xodimlar',
    icon: 'Service',
    meta: {
      title: 'Ishchi xodimlar',
      secure: true
    },
    component: () => import('@/views/WorkersView.vue')
  },
  {
    path: 'orders',
    name: 'orders',
    title: 'Buyurtmalar',
    icon: 'Goods',
    meta: {
      title: 'Buyurtmalar ro`yxati',
      secure: true
    }
    // component: () => import("@/views/SettingView.vue")
  },
  {
    path: 'transactions',
    name: 'transactions',
    title: 'Tranzaksiyalar',
    icon: 'Money',
    meta: {
      title: 'Tranzaksiyalar ro`yxati',
      secure: true
    }
    // component: () => import("@/views/SettingView.vue")
  },
  {
    path: 'setting',
    name: 'setting',
    title: 'Sozlamalar',
    icon: 'Setting',
    meta: {
      title: 'Tizim sozlamalari',
      secure: true
    },
    component: () => import("@/views/SettingView.vue"),
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
