<template>
  <section class="random">
    <h2>Books about {{ randomSubject }}</h2>
    <p>Not so much into {{ randomSubject }}? Change the subject:</p>
    <button @click="changeSubject()">Change Subject</button>
    <BooksList :category="randomSubject" :key="booksListKey"/>  
  </section>
</template>

<style scoped>
  ol {
    text-align: left;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BooksList from '@/components/BooksList.vue';
import { RandomSubjects } from '../model/RandomSubjects';

@Component({
  components: {
    BooksList,
  }
})

export default class Random extends Vue {
  public booksListKey = 0;
  private randomNum: number = Math.floor(Math.random() * 32);
  private randomSubject: string = RandomSubjects[this.randomNum];

  changeSubject():void {
    this.randomNum = Math.floor(Math.random() * 32)
    this.randomSubject = RandomSubjects[this.randomNum]
    this.booksListKey += 1
  }
}
</script>
