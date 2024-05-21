import { authStore } from "@/stores/auth/auth";
import { menu } from "@/stores/utils/menu";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main-layout",
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [
      ...menu,
      {
        path: 'workers/profile/:id',
        name: 'workersProfile',
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
        path: '/:pathMatch(.*)*',
        name: 'error',
        meta: {
          title: 'Sahifa topilmadi',
          secure: false
        },
        component: () => import("@/views/ErrorView.vue")
      }
    ]
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/auth/signin",
        name: "signin",
        meta: {
          secure: false
        },
        component: () => import("@/views/auth/LoginView.vue")
      },
      {
        path: "/auth/guide",
        name: "guide",
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