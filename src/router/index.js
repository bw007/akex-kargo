import { authStore } from "@/stores/auth/auth";
import { menu } from "@/stores/utils/menu";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [
      ...menu,
      {
        path: 'workers/profile/:id',
        name: 'WorkersProfile',
        meta: {
          title: "Xodim ma'lumotlari",
          secure: true
        },
        component: () => import('@/components/workers/WorkerData.vue'),
        beforeEnter: () => {
          const auth_store = authStore();
          const { user } = storeToRefs(auth_store)
          watch(user, () => {
            auth_store.checkUser("full")
          })
        }
      },
      {
        path: 'orders/:id',
        name: 'OrdersItem',
        meta: {
          title: "Mahsulot haqida",
          secure: true
        },
        component: () => import('@/components/orders/OrderData.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        meta: {
          title: 'Sahifa topilmadi',
          secure: false
        },
        component: () => import("@/views/error/ErrorView.vue")
      }
    ]
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/auth/signin",
        name: "SignIn",
        meta: {
          secure: false
        },
        component: () => import("@/views/auth/LoginView.vue")
      },
      {
        path: "/auth/guide",
        name: "Guide",
        component: () => import("@/views/auth/GuideView.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.secure) {
    next()
  } else {
    const auth_store = authStore()
    auth_store.checkUser()
    next()
  }
})

export default router