<template>
  <div>
    <div class="hero bg-gray-300 mb-24">
      <div
        class="ml-10 mr-10 flex-col lg:flex-row flex  lg:justify-between py-10">
        <div class="mt-10">
          <h1 class="lg:w-3/4 w-full mb-4 text-4xl font-bold">
            Book Recommendation site built with GraphQL
          </h1>
          <p class="leading-normal w-full lg:w-3/4">
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
        <div class="mt-10  lg:mt-0">
          <img src="./assets/hero.svg" alt="hero" />
        </div>
      </div>
    </div>

    <div class="px-2">
      <div class="flex-wrap flex">
        <div class="w-full lg:w-1/4 px-4 mb-12">
          <ApolloQuery :query="require('./GraphQL/Queries/Categories.gql')">
            <!-- The result will automatically updated -->
            <template slot-scope="{ result: { data, loading }, isLoading }">
              <!-- Some content -->
              <div v-if="isLoading">Loading...</div>
              <ul class="list-reset text-lg" v-else>
                <li class="mb-6">
                  <strong @click="UpdateSelectedCategory('All')" class="mr-25"
                    >All</strong
                  >
                </li>
                <li class="mb-6">
                  <strong
                    @click="UpdateSelectedCategory('Featured')"
                    class="mr-25"
                    >Featured</strong
                  >
                </li>

                <strong
                  @click="UpdateSelectedCategory(Category.id)"
                  v-for="Category of data.Categories"
                  :key="Category.id"
                  class="mr-25"
                >
                  <li class="mb-6">{{ Category.name }}</li>
                </strong>
                <strong>
                  <router-link to="/Book/New"
                    ><li class="mb-6">Add Book</li></router-link
                  >
                </strong>
              </ul>
            </template> </ApolloQuery
          ><br />
        </div>

        <div class="w-full lg:w-3/4 px-4 mb-12">
          <div>
            <ApolloQuery
              v-if="SelectedCategory === 'All'"
              :query="require('./GraphQL/Queries/AllBooks.gql')"
            >
              <!-- The result will automatically updated -->
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <!-- Some content -->
                <div v-if="isLoading">Loading...</div>
                <div v-else class="flex flex-wrap">
                  <div
                    class="w-full lg:w-1/3 px-4 mb-12"
                    v-for="Book in data.Books"
                    :key="Book.id"
                  >
                    <div>
                      <router-link :to="`/Book/${Book.id}`">
                        <img
                          class="h-64"
                          width="200"
                          height="300"
                          :src="`${Book.image}`"
                        />
                      </router-link>
                      <router-link
                        class="text-lg font-bold text-black-800 hover:text-gray-800 "
                        :to="`/Book/${Book.id}`"
                        >{{ Book.title }}</router-link
                      ><br />
                      <div class="text-gray-800">{{ Book.author }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </ApolloQuery>
            <ApolloQuery
              v-else-if="SelectedCategory === 'Featured'"
              :query="require('./GraphQL/Queries/FeaturedBooks.gql')"
              :variables="{ Featured: true }"
            >
              <!-- The result will automatically updated -->
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <!-- Some content -->
                <div v-if="isLoading">Loading...</div>
                <div v-else class="flex flex-wrap">
                  <div
                    class="w-full lg:w-1/3 px-4 mb-12"
                    v-for="Book in data.FeaturedBooks"
                    :key="Book.id"
                  >
                    <div>
                      <router-link :to="`/Book/${Book.id}`">
                        <img
                          class="h-64"
                          width="200"
                          height="300"
                          :src="`${Book.image}`"
                        />
                      </router-link>
                      <router-link
                        class="text-lg font-bold text-black-800 hover:text-gray-800 "
                        :to="`/Book/${Book.id}`"
                        >{{ Book.title }}</router-link
                      ><br />
                      <div class="text-gray-800">{{ Book.author }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </ApolloQuery>

            <ApolloQuery
              v-else
              :query="require('./GraphQL/Queries/Category.gql')"
              :variables="{ id: SelectedCategory }"
            >
              <!-- The result will automatically updated -->
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <!-- Some content -->
                <div v-if="isLoading">Loading...</div>
                <div v-else class="flex flex-wrap">
                  <div
                    class="w-full lg:w-1/3 px-4 mb-12"
                    v-for="Book in data.Category.Books"
                    :key="Book.id"
                  >
                    <div>
                      <router-link :to="`/Book/${Book.id}`">
                        <img
                          class="h-64"
                          width="200"
                          height="300"
                          :src="`${Book.image}`"
                        />
                      </router-link>
                      <router-link
                        class="text-lg font-bold text-black-800 hover:text-gray-800 "
                        :to="`/Book/${Book.id}`"
                        >{{ Book.title }}</router-link
                      ><br />
                      <div class="text-gray-800">{{ Book.author }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </ApolloQuery>
          </div>
        </div>
      </div>
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
