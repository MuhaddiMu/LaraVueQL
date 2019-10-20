<template>
  <div>
    <div class="hero bg-gray-300 mb-24">
      <div class="ml-10 mr-10 flex  justify-between py-10">
        <div class="mt-10">
          <h1 class="w-3/4 mb-4 text-4xl font-bold">
            Book Recommendation site built with GraphQL
          </h1>
          <p class="leading-normal w-3/4">
            Built With Laravel(Lighthouse, GraphQL), Vue.Js(Vue Apollo) &
            Tailwind CSS which actually sucks
          </p>
          <div class="flex items-center mt-6">
            <a
              href=""
              class="bg-purple-700 text-white rounded px-4 py-4 mr-4  hover:bg-purple-600"
              >View Books</a
            >
            <a
              href=""
              class="border border-purple-800 rounded text-purple-800 px-4 py-4 hover:bg-purple-600 hover:text-white"
              >Ping Me
            </a>
          </div>
        </div>
        <div>
          <img src="./assets/hero.svg" alt="hero" />
        </div>
      </div>
    </div>

    <ApolloQuery :query="require('./GraphQL/Queries/Categories.gql')">
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <!-- Some content -->
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <strong @click="UpdateSelectedCategory('All')" class="mr-25"
            >All</strong
          >
          <strong @click="UpdateSelectedCategory('Featured')" class="mr-25"
            >Featured</strong
          >
          <strong
            @click="UpdateSelectedCategory(Category.id)"
            v-for="Category of data.Categories"
            :key="Category.id"
            class="mr-25"
          >
            {{ Category.name }}
          </strong>
        </div>
      </template> </ApolloQuery
    ><br />

    <div v-if="SelectedCategory === 'All'">
      <ApolloQuery :query="require('./GraphQL/Queries/AllBooks.gql')">
        <!-- The result will automatically updated -->
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <!-- Some content -->
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="(Book, index) in data.Books" :key="Book.id">
              <div>
                <img width="200" height="300" :src="`${Book.image}`" /><br />
                {{ index + 1 }} -
                <router-link :to="`/Book/${Book.id}`">{{
                  Book.title
                }}</router-link>
                by {{ Book.author }} <br />
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else-if="SelectedCategory === 'Featured'">
      <ApolloQuery
        :query="require('./GraphQL/Queries/FeaturedBooks.gql')"
        :variables="{ Featured: true }"
      >
        <!-- The result will automatically updated -->
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <!-- Some content -->
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="(Book, index) in data.FeaturedBooks" :key="Book.id">
              <div>
                <img width="200" height="300" :src="`${Book.image}`" /><br />
                {{ index + 1 }} -
                <router-link :to="`/Book/${Book.id}`">{{
                  Book.title
                }}</router-link>
                by {{ Book.author }} <br />
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else>
      <ApolloQuery
        :query="require('./GraphQL/Queries/Category.gql')"
        :variables="{ id: SelectedCategory }"
      >
        <!-- The result will automatically updated -->
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <!-- Some content -->
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="(Book, index) in data.Category.Books" :key="Book.id">
              <div>
                <img width="200" height="300" :src="`${Book.image}`" /><br />
                {{ index + 1 }} -
                <router-link :to="`/Book/${Book.id}`">{{
                  Book.title
                }}</router-link>
                by {{ Book.author }} <br />
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      SelectedCategory: "All"
    }
  },
  methods: {
    UpdateSelectedCategory(CategoryID) {
      if (CategoryID === "All") {
        this.SelectedCategory = CategoryID
      }
      if (CategoryID === "All") {
        this.SelectedCategory = CategoryID
      } else {
        this.SelectedCategory = CategoryID
      }
    }
  }
}
</script>
