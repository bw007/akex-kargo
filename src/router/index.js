import { menu } from "@/stores/utils/menu";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home-layout",
    title: "Bosh sahifa",
    component: () => import("@/layouts/HomeLayout.vue"),
    children: [
      ...menu
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
        component: () => import("@/views/auth/UserLogin.vue")
      },
      {
        path: "/auth/signup",
        name: "signup",
        component: () => import("@/views/auth/UserReg.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router