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
          <span @click="UpdateSelectedCategory(Category.id)" v-for="(Category, index) of data.Categories" :key="Category.id" class="mr-25">
            {{ index+1 }} - {{Category.name}}
          </span>
        </div>
      </template>
    </ApolloQuery>


    <ApolloQuery :query="require('./GraphQL/Queries/Category.gql')" :variables="{id: SelectedCategory}">
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <!-- Some content -->
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <div v-for="(Book, index) in data.Category.Books" :key="Book.id">
            {{index+1}} - {{Book.title}}
          </div>
        </div>
      </template>
    </ApolloQuery>


  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      SelectedCategory: "1"
    }
  },
  methods: {
    UpdateSelectedCategory(CategoryID){
      this.SelectedCategory = CategoryID
    }
  },
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
