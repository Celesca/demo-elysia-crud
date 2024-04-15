import { Elysia } from "elysia";

type Book = {
  id: number;
  title: string;
  price: number;
}

let bookList: Book[] = [
  {"id": 1, "title": "Refactoring", "price": 100},
  {"id": 2, "title": "Clean Code", "price": 200},
]

const app = new Elysia()
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
