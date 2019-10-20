<template>
  <div class="mr-10 ml-10">
    <ApolloQuery
      :query="require('./GraphQL/Queries/Book.gql')"
      :variables="{ Parameter: $route.params.ID }"
    >
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <!-- Some content -->
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="data" class="flex mt-15 flex-col lg:flex-row">
          <div>
            <img width="300" height="400" :src="`${data.Book.image}`" />
          </div>
          <div class="w-full lg:2/3 ml-0 mt-8 lg:mt-0 lg:ml-16">
            <div class="text-4xl font-bold">{{ data.Book.title }}</div>
            <div class="text-2xl text-gray-800 mb-8">
              {{ data.Book.author }}
            </div>
            <div class="text-lg text-gray-800 leading-normal mb-8">
              {{ data.Book.description }}
            </div>
            <div class="my-12">
              <a
                href="`${Book.link}`"
                target="_blank"
                class="bg-purple-700 text-white rounded px-4 py-4 mr-4  hover:bg-purple-600"
                >View Book</a
              >
            </div>
            <router-link class="mr-25" :to="`Edit/${$route.params.ID}`"
              >Edit</router-link
            >
            &middot;
            <a
              to="#"
              @click.prevent="DeleteBook($route.params.ID)"
              class="mr-25"
              >Delete</a
            >
          </div>
        </div>
        <div v-else-if="!data">Book Not Found</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import DeleteBook from "./GraphQL/Mutations/DeleteBook.gql"
export default {
  methods: {
    DeleteBook(ID) {
      this.$apollo
        .mutate({
          mutation: DeleteBook,
          variables: { ID: ID }
        })
        .then(data => {
          console.log(data)
          this.$router.push("/")
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped></style>
