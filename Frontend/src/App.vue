<template>
  <div id="app" class="font-sans antialias text-black">
    <div id="nav" class="bg-purple-700">
      <div class="ml-5 mr-4 container flex items-center justify-between py-6">
        <div>
          <a href="/"><img width="" src="./assets/logo.svg"/></a>
        </div>

        <div>
          <router-link class="text-white hover:grey" to="/">Home</router-link>
          <router-link class="text-white hover:grey pl-6" to="/Book/"
            >About</router-link
          >
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style src="./assets/css/tailwind.css">
* {
  font-family: "Roboto";
}
</style>
