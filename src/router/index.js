import { authStore } from "@/stores/auth/auth";
import { menu } from "@/stores/utils/menu";
import { createRouter, createWebHistory } from "vue-router";
import cookies from "vue-cookies";
import { userStore } from "@/stores/data/user";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const routes = [
  {
    path: "/",
    name: "main-layout",
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [
      ...menu,
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
  const user_store = userStore()
  const { user } = storeToRefs(user_store)
  
  watch(user, (newValue) => {
    if (to.name == "workers" && newValue.role !== "@super_admin") {
      cookies.remove("token");
      cookies.remove("user-id");
      router.push({ name: "signin" })
    }
  })
  
  if (!to.meta.secure) {
    next()
  } else {
    const auth_store = authStore()
    auth_store.checkUser()
    next()
  }

})

export default router