import { Elysia } from "elysia";

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
  .put("/books/:id", ({ params, body, error, set }) => {
    const id = Number(params.id);
    const book = bookList.find((book) => book.id === id);
    if (!book) {
      return error(404, "Book not found");
    }
    const updatedBook = body as Book;
    bookList = bookList.map((book) =>
      book.id === id ? { ...book, ...updatedBook } : book
    );
    return "Updated Successfully";
  })
  .delete("/books/:id", ({ params, error }) => {
    const id = Number(params.id);
    const book = bookList.find((book) => book.id === id);
    if (!book) {
      return error(404, "Book not found");
    }
    bookList = bookList.filter((book) => book.id !== id);
    return "Deleted Successfully";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
