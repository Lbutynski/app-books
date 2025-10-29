import BookLine from "@/components/bookLine";
import Book from "@/models/Book";
import { getBooks } from "@/services/bookService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    (async () => {
      getBooks().then((data) => setBooks(data));
    })();
  }, []);
  return (
    <>
      <Button
        title="Ajouter un livre"
        onPress={() => {
          router.push("/addBook");
        }}
      />
      <ScrollView>
        {books.map((book) => (
          <BookLine key={book.id} {...book} />
        ))}
      </ScrollView>
    </>
  );
}
