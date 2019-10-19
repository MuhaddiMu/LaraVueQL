<template>
  <div class="create">
    <h1>Add New Book</h1>
    <form action="" method="post" @submit.prevent="AddBook">
      <div class="form-group">
        <label for="Title">Title </label>
        <input v-model="Title" type="text" name="Title" />
      </div>
      <div class="form-group">
        <label for="Author">Author </label>
        <input v-model="Author" type="text" name="Author" />
      </div>
      <div class="form-group">
        <label for="ImageURL">ImageURL </label>
        <input v-model="ImageURL" type="text" name="ImageURL" />
      </div>
      <div class="form-group">
        <label for="Description">Description </label>
        <textarea
          v-model="Description"
          name="Description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="Link">Link </label>
        <input v-model="Link" type="text" name="Link" />
      </div>
      <div class="form-group">
        <label for="Featured">Featured </label>
        <input v-model="Featured" type="checkbox" name="Featured" />
      </div>
      <div class="form-group">
        <label for="Featured">
          <ApolloQuery :query="require('./GraphQL/Queries/Categories.gql')">
            <!-- The result will automatically updated -->
            <template slot-scope="{ result: { data, loading }, isLoading }">
              <!-- Some content -->
              <div v-if="isLoading">Loading...</div>
              <div v-else>
                <select v-model.number="Category" name="Featured">
                  <option value="" selected disabled>Select Category</option>
                  <option
                    v-for="Category of data.Categories"
                    :key="Category.id"
                    :value="`${Category.id}`"
                    >{{ Category.name }}</option
                  >
                </select>
              </div>
            </template>
          </ApolloQuery>
        </label>
      </div>
      <div class="form-group">
        <button type="submit">Add Book</button>
      </div>
    </form>
  </div>
</template>

<script>
import AddBook from "./GraphQL/Mutations/AddBook.gql"
export default {
  data() {
    return {
      Title: "",
      Author: "",
      ImageURL: "",
      Description: "",
      Link: "",
      Featured: false,
      Category: ""
    }
  },

  methods: {
    AddBook() {
      this.$apollo
        .mutate({
          mutation: AddBook,
          variables: {
            Title: this.Title,
            Author: this.Author,
            ImageURL: this.ImageURL,
            Description: this.Description,
            Link: this.Link,
            Featured: this.Featured,
            Category: this.Category
          }
        })
        .then(data => {
          console.log(data)
          this.Title = this.Author = this.ImageURL = this.Description = this.Link = this.Category =
            ""
          this.Featured = false
          this.$router.push("/")
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-top: 16px;
}
input[type="text"] {
  padding: 10px 15px;
}
button {
  padding: 16px;
  background: #027bff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}
</style>
