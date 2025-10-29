import Book from "@/models/Book";
import { getBookById } from "@/services/bookService";
import { useLocalSearchParams } from "expo-router";
import { use, useEffect, useState } from "react";
import { Text, View } from "react-native";

const DetailPage = () => {
  const { bookId } = useLocalSearchParams();
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    (async () => {
      getBookById(bookId as string).then((data) => setBook(data));
    })();
  }, [bookId]);
  return (
    <View>
      <Text>{book?.name}</Text>
    </View>
  );
};
export default DetailPage;
