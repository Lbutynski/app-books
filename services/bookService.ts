import Book from "@/models/Book";
const API_URL = "http://localhost:3000";

export const getBooks = async (): Promise<Book[]> => {
  const data = (await fetch(`${API_URL}/books`)).json();
  return data;
};
export const getBookById = async (id: string): Promise<Book> => {
  const data = (await fetch(`${API_URL}/books/${id}`)).json();
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
  const data = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return data.json();
};
export const updateBook = async (book: Book): Promise<Book> => {
  const data = await fetch(`${API_URL}/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return data.json();
};
export const deleteBook = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
};
export const getNotes = async (bookId: string) => {
  const res = await fetch(`${API_URL}/books/${bookId}/notes`);
  return res.json();
};

export const addNote = async (bookId: string, content: string) => {
  const res = await fetch(`${API_URL}/books/${bookId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return res.json();
};
