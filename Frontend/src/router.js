import Vue from "vue"
import Router from "vue-router"
import Home from "./Books.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/Book/New",
      name: "NewBook",
      component: () => import("./NewBook.vue")
    },
    {
      path: "/Book/:ID",
      name: "Book",
      component: () => import("./Book.vue")
    },
    {
      path: "/Book/Edit/:ID",
      name: "EditBook",
      component: () => import("./EditBook.vue")
    },
    {
      path: "/Auth",
      name: "Auth",
      component: () => import("./Authentication.vue"),
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/User",
      name: "User",
      component: () => import("./User.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
})
