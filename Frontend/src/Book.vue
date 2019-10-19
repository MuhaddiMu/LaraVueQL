<template>
  <div>
    <ApolloQuery
      :query="require('./GraphQL/Queries/Book.gql')"
      :variables="{ Parameter: $route.params.ID }"
    >
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <!-- Some content -->
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="data">
          <h2>{{ data.Book.title }} by {{ data.Book.author }}</h2>
          <img width="300" height="400" :src="`${data.Book.image}`" />
          <div>
            <router-link class="mr-25" :to="`Edit/${$route.params.ID}`"
              >Edit</router-link
            >
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
