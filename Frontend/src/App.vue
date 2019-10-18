<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ApolloQuery :query="require('./GraphQL/Queries/Categories.gql')">
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <!-- Some content -->
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <strong @click="UpdateSelectedCategory('All')" class="mr-25">All</strong>
          <strong @click="UpdateSelectedCategory('Featured')" class="mr-25">Featured</strong>
          <strong @click="UpdateSelectedCategory(Category.id)" v-for="Category of data.Categories" :key="Category.id" class="mr-25">
            {{Category.name}}
          </strong>
        </div>
      </template>
    </ApolloQuery>

    <div v-if="SelectedCategory === 'All'">
      <ApolloQuery :query="require('./GraphQL/Queries/AllBooks.gql')">
        <!-- The result will automatically updated -->
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <!-- Some content -->
          <div v-if="isLoading">Loading...</div>
          <div v-else>
             <div v-for="(Book, index) in data.Books" :key="Book.id">
              {{index+1}} - {{Book.title}}
            </div> 
          </div>
        </template>
      </ApolloQuery>
    </div>

     <div v-else-if="SelectedCategory === 'Featured'">
      <ApolloQuery :query="require('./GraphQL/Queries/FeaturedBooks.gql')" :variables="{Featured: true}">
        <!-- The result will automatically updated -->
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <!-- Some content -->
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="(Book, index) in data.FeaturedBooks" :key="Book.id">
              {{index+1}} - {{Book.title}}
            </div> 
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else>
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      SelectedCategory: "All"
    }
  },
  methods: {
    UpdateSelectedCategory(CategoryID){
      if(CategoryID === 'Featured'){
        this.SelectedCategory = CategoryID
      } else if (CategoryID === 'All'){
        this.SelectedCategory = CategoryID
      } else {
        this.SelectedCategory = CategoryID
      }
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
  text-decoration: none;
  cursor: pointer;
}

</style>
