<template>
  <div class="create py-10 px-10">
    <h1 class="mb-4">Edit Book</h1>
    <form action="" method="post" @submit.prevent="EditBook">
      <div class="form-group">
        <label class="font-bold mb-2" for="Title">Title </label>
        <input v-model="Title" type="text" name="Title" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="Author">Author </label>
        <input v-model="Author" type="text" name="Author" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="ImageURL">ImageURL </label>
        <input v-model="ImageURL" type="text" name="ImageURL" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="Description">Description </label>
        <textarea
          v-model="Description"
          name="Description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="Link">Link </label>
        <input v-model="Link" type="text" name="Link" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="Featured">Featured </label>
        <input v-model="Featured" type="checkbox" name="Featured" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="Featured">
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
        <button type="submit">Update Book</button>
      </div>
    </form>
  </div>
</template>

<script>
import UpdateBook from "./GraphQL/Mutations/UpdateBook.gql"
import Book from "./GraphQL/Queries/Book.gql"
export default {
  data() {
    return {
      Title: "",
      Author: "",
      ImageURL: "",
      Description: "",
      Link: "",
      Featured: false,
      Category: "",
      Book: null
    }
  },

  methods: {
    EditBook() {
      this.$apollo
        .mutate({
          mutation: UpdateBook,
          variables: {
            ID: this.$route.params.ID,
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
          this.$router.push(`/Book/${this.$route.params.ID}`)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  apollo: {
    Book: {
      query: Book,
      variables() {
        if (this.$route && this.$route.params) {
          return { Parameter: this.$route.params.ID }
        }
      },
      result({ data }) {
        this.Title = data.Book.title
        this.Author = data.Book.author
        this.ImageURL = data.Book.image
        this.Description = data.Book.description
        this.Link = data.Book.link
        this.Featured = data.Book.featured
        this.Category = data.Book.category.id
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-top: 16px;
}
input[type="text"],
textarea {
  padding: 10px 15px;
  border: 1px solid lightgray;
  border-radius: 5px;
}
button {
  padding: 16px;
  background: #027bff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}
label {
  display: block;
}
</style>
