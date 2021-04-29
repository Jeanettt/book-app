<template>
  <section class="home">
    <h2>Hello!</h2>
    <p>
      Welcome to my Books app. Below is a small collection of books about one of my favourite subjects: surfing. But you can also pick a category of your own!
      </p>
    <label for="category">Pick a category: </label>
    <select id="category" @change="changeCategory($event)">
      <option selected>Categories</option>
      <option v-for="(category, index) in categories" 
              :key="index" 
              :value="category"
              >
        {{ category }}
      </option>
    </select>
    <p>
       Prefer to be surprised? Go to the <router-link to="/random">random page</router-link>.
    </p>
    <h2>Book Collection</h2>
    <BooksList :category="category" :key="booksListKey"/>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BooksList from '@/components/BooksList.vue'
import { RandomSubjects } from '@/model/RandomSubjects'

@Component({
  components: {
    BooksList,
  }
})

export default class Home extends Vue {
  public category = 'surfing'
  public booksListKey = 0
  private categories = RandomSubjects

  changeCategory(event: Event): void {
    this.category = (event.target as HTMLSelectElement).value
    console.log(event)
    console.log(event.target)
    this.booksListKey += 1
  }
}
</script>
