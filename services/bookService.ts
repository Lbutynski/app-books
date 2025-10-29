import Book from "@/models/Book";

export const getBooks = async (): Promise<Book[]> => {
  const data = (await fetch("http://localhost:3000/books")).json();
  return data;
};
export const getBookById = async (id: string): Promise<Book> => {
  const data = (await fetch(`http://localhost:3000/books/${id}`)).json();
  return data;
};
export const addBook = async (book: {
  name: string;
  author: string;
  year: number;
  cover: string;
  editor: string;
  theme: string;
}): Promise<Book> => {
  const data = await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return data.json();
};
export const updateBook = async (book: Book): Promise<Book> => {
  const data = await fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return data.json();
};
export const deleteBook = async (id: string): Promise<void> => {
  await fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });
};
