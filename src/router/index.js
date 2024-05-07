import { authStore } from "@/stores/auth/auth";
import { menu } from "@/stores/utils/menu";
import { createRouter, createWebHistory } from "vue-router";
import cookies from "vue-cookies";

const routes = [
  {
    path: "/",
    name: "main-layout",
    component: () => import("@/layouts/MainLayout.vue"),
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
        component: () => import("@/views/auth/UserLogin.vue")
      },
      // {
      //   path: "/auth/signup",
      //   name: "signup",
      //   component: () => import("@/views/auth/UserReg.vue")
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.name == "workers" && cookies.get("user").role !== "@super_admin") {
    cookies.remove("token");
    cookies.remove("user");
    router.push({ name: "signin" })
  }
  if (!to.meta.secure) {
    next()
  } else {
    const auth_store = authStore()
    auth_store.checkUser()
    next()
  }
})

export default router