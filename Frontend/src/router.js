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
    }
  ]
})
