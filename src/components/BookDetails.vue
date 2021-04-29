<template>
    <section class="BookDetails">
        <template v-if="book">
            <h2>
                {{ book.title }}
            </h2>
            <img :src="book.thumbnail">
            <p> by 
                <em v-for="(author, index) in book.author" :key="index">{{ author }}, </em></p>
            <p>
                {{ book.abstract }}
            </p>
            <h3>Other books by this author:</h3>
            <template v-if="recBooks">
                <ul class="rec-books">
                    <li v-for="(book, index) in recBooks" :key="index"><img :src="book.thumbnail">{{ shortenTitle(book.title) }}</li>
                </ul>                
            </template>
            <template v-else>
                 <p>There are no other books by this author</p>
            </template>
        </template>
        <template v-else>
            Please select a book first
        </template>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Book, BooksApiResult } from '@/model/Book';
import axios from 'axios';

@Component
export default class BookDetails extends Vue {
    @Prop() book!: Book
    mainAuthor = ''
    recBooks: Book[] = []
    private missingImage = 'https://fr-labels.com/1025-home_default/210-x-297-mm-200-feuilles-pboite.jpg';


    async fetchData(arg: string): Promise<void> {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:"${arg}"`
            const response = await axios.get(url)
            const firstThreeResults = response.data.items.slice(0, 3)
            this.recBooks = firstThreeResults.map((result : BooksApiResult) => ({
                id: result.id,
                title: result.volumeInfo.title,
                author: result.volumeInfo.authors ? result.volumeInfo.authors : 'no known authors',
                publishedDate: result.volumeInfo.publishedDate,
                abstract: result.volumeInfo.description,
                url: result.selfLink,
                thumbnail: result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : this.missingImage
            }))
        } 
        catch (err) {
            if (err.response) {
                // client received an error response (5xx, 4xx)
                console.log("Server Error:", err)
            } else if (err.request) {
                // client never received a response, or request never left
                console.log("Network Error:", err)
            } else {
                console.log("Client Error:", err)
            }
        }
  }

    mounted(): void {
        this.mainAuthor = this.book.author[0].replace(/\s/g, '+')
        this.fetchData(this.mainAuthor) 
    }   
    shortenTitle(text: string): string{
        if(text.length > 60){
            return (text.slice(0, 60) + '...')
        } else if (text)
        {
            return text
        }
        return ''
    }
}
</script>