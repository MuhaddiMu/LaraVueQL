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
        <div v-else>
          <h2>{{ data.Book.title }} by {{ data.Book.author }}</h2>
          <img width="300" height="400" :src="`${data.Book.image}`" />
          <div>
            <router-link class="mr-25" :to="`Edit/${$route.params.ID}`"
              >Edit</router-link
            >
            <router-link to="#" class="mr-25">Delete</router-link>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
