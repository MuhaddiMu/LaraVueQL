<template>
  <div class="flex justify-center content-center flex-wrap bg-gray-200 ">
    <div class="w-60 p-2">
      <div class="text-gray-700 content-center text-center bg-gray-400 p-2">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div class="mb-04">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="Login"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import { onLogin } from "./vue-apollo"
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },

  methods: {
    Login() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($data: LoginInput!) {
              login(input: $data) {
                access_token
              }
            }
          `,
          // Parameters
          variables: {
            data: {
              username: this.username,
              password: this.password
            }
          }
        })
        .then(data => {
          // Result
          console.log(data)
          onLogin(
            this.$apollo.provider.defaultClient,
            data.data.login.access_token
          )
          this.$router.push("/User")
        })
        .catch(error => {
          // Error
          console.error(error)
          // We restore the initial user input
        })
    }
  }
}
</script>

<style scoped></style>
