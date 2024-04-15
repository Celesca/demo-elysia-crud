import { Elysia, t } from "elysia";

type Book = {
  id: number;
  title: string;
  price: number;
};

let bookList: Book[] = [
  { title: "Refactoring", price: 100, id: 1 },
  { title: "Clean Code", price: 200, id: 2 },
];

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/books", () => bookList)
  .post("/books", ({ body }) => {
    const newBook = body as Book;
    newBook.id = bookList.length + 1;
    bookList.push(newBook);
    return newBook;
  })
  .put("/books/:id", ({ params, body, error }) => {
    const id = Number(params.id);
    const bookIndex = bookList.findIndex((book) => book.id === id);
  
    if (bookIndex === -1) {
      error(404, "Book not found");
    } else {
      const updatedBook = body as Book;
      const book = bookList[bookIndex];
      book.title = updatedBook.title;
      book.price = updatedBook.price;
      return book;

  }})
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
