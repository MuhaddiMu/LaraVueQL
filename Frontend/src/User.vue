<template>
  <div class="text-center">
    <b>Logged In Success :)</b><br />
    <b><a href="#" @click.prevent="LogOut">Click Here to Log Out</a></b
    ><br />
    <hr />
    <div v-if="Me">
      <h2>About Me:</h2>
      <h3>ID: {{ Me.id }}</h3>
      <h3>Name: {{ Me.name }}</h3>
      <h3>Email: {{ Me.email }}</h3>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import { onLogout } from "./vue-apollo.js"

export default {
  data() {
    return {
      Me: null
    }
  },
  apollo: {
    Me: gql`
      {
        Me {
          id
          name
          email
        }
      }
    `
  },
  methods: {
    LogOut() {
      onLogout(this.$apollo.provider.defaultClient)
      this.$router.push("/")
    }
  }
}
</script>

<style scoped></style>
