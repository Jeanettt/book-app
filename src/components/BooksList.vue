<template>
    <section class="BooksList">
        <p>Sort the books:</p>
        <div class="btn-bar">
            <button class="sort-az" 
                    :class="{ active: azActive, }"
                    @click="toggleBtn()"
            >
                    by a-z
            </button>
            <button class="sort-year" 
                    :class="{ active: yearActive, }"
                    @click="toggleBtn()"
            >
                   by year
            </button>
        </div>
        <div class="card-container">
            <div class="card-book"
                v-for="(book, index) in books" 
                :key="index" 
                :book="book">
                <router-link 
                    :to="{ name: 'Details', 
                    params:{ bookId: book.id, book: book }}"
                    :book="book">
                    <img
                        :src="book.thumbnail"
                        :alt="book.caption"
                    />
                    <h3>{{ shortenTitle(book.title) }}</h3>
                    <p> <em>{{ shortenDate(book.publishedDate) }}</em> <br>
                        {{ shorten(book.abstract) }}
                    </p>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Book, BooksApiResult } from '../model/Book'
import axios from 'axios'

@Component
export default class BooksList extends Vue {
    @Prop() category!: string;
    public books: Book[] = [];
    private missingImage = 'https://fr-labels.com/1025-home_default/210-x-297-mm-200-feuilles-pboite.jpg';
    private azActive = true;
    private yearActive = false;

    async fetchData(): Promise<void> {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${this.category}`
            const response = await axios.get(url)
            const results = response.data.items.slice(0, 10)
            this.books = results.map((result : BooksApiResult) => ({
                id: result.id,
                title: result.volumeInfo.title,
                author: result.volumeInfo.authors,
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
        this.fetchData()
        this.books = this.sortAZ()
    }

    toggleBtn(): void {
        this.azActive = !this.azActive;
        this.yearActive = !this.yearActive;
        if (this.azActive) {
            this.books = this.sortAZ()
        } else {
            this.books = this.sortDate()
        }
    }

	sortAZ(): Book[] {
		let sortedBooks = this.books;
		
		sortedBooks = sortedBooks.sort((a,b) => {
			let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
			if (fa < fb) {
				return -1
			}
			if (fa > fb) {
				return 1
			}
			return 0
		})

        return sortedBooks;
	}
	sortDate(): Book[] {
		let sortedBooks = this.books;
		
		sortedBooks = sortedBooks.sort((a,b) => {
			let fa = a.publishedDate, fb = b.publishedDate;
			if (fa < fb) {
				return -1
			}
			if (fa > fb) {
				return 1
			}
			return 0
		})

        return sortedBooks;
	}
    shorten(text: string): string{
        if(text){
            return (text.slice(0, 140) + '...')
        }
        return ''
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
    shortenDate(text: string): string{
        if(text){
            return (text.slice(0, 4))
        } 
        return ''
    }
}
</script>