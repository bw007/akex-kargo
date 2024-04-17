import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/layouts/UserAuth.vue"),
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