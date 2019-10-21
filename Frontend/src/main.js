import Vue from "vue"
import App from "./App.vue"
import router from "./router"

import "@/assets/css/tailwind.css"

import { createProvider } from "./vue-apollo"

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("JWT_TOKEN")) {
      next({
        path: "/Auth"
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem("JWT_TOKEN")) {
      next({
        path: "/User"
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app")
