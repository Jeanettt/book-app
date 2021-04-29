export interface Book {
    id: string,
    title: string,
    author: string[],
    publishedDate: number,
    abstract: string,
    url: string,
    thumbnail: string
}

export interface BooksApiResult {
    kind: string,
    id: string,
    etag: string,
    selfLink: string,
    volumeInfo: {
        title: string,
        authors: string[],
        publisher: string,
        publishedDate: string,
        description: string,
        imageLinks: {
            smallTumbnail: string,
            thumbnail: string
        }
    }
}