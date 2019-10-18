<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- Apollo Query -->
    <ApolloQuery :query="require('./GraphQL/Queries/Categories.gql')">
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <!-- Some content -->
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <a href="" v-for="(Category, index) of data.Categories" :key="Category.id" class="mr-25">
            {{ index+1 }} - {{Category.name}}
          </a>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from 'graphql-tag' 
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mr-25 {
  margin-right: 25px;
  text-decoration: none
}

</style>
