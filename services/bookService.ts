import Book from "@/models/Book";
import { SearchOptions } from "@/utils/SearchTypes";
const API_URL = "http://localhost:3000";

export const getBooks = async (
  searchOptions?: SearchOptions
): Promise<Book[]> => {
  const params = new URLSearchParams();

  if (searchOptions?.search) params.append("q", searchOptions.search);
  if (searchOptions?.read !== undefined)
    params.append("read", String(searchOptions.read));
  if (searchOptions?.favorite !== undefined)
    params.append("favorite", String(searchOptions.favorite));
  if (searchOptions?.sortBy) params.append("sort", searchOptions.sortBy);
  if (searchOptions?.sortOrder) params.append("order", searchOptions.sortOrder);

  const queryString = params.toString();
  const url = queryString
    ? `${API_URL}/books?${queryString}`
    : `${API_URL}/books`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
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
