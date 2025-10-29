import Book from "@/models/Book";
import { deleteBook, updateBook } from "@/services/bookService";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox"; // ✅ correct import
import { useState } from "react";

const BookLine = (book: Book) => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(book.read);

  const handleDeleteBook = () => {
    deleteBook(book.id).then(() => {
      router.replace("/"); // refresh list
    });
  };

  const handleReadStatus = (newValue: boolean) => {
    updateBook({ ...book, read: newValue }).then(() => {
      setChecked(newValue);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{book.name}</Text>
        <Text style={styles.details}>
          {book.author} • {book.year}
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={handleReadStatus}
            color={isChecked ? "#007AFF" : undefined}
          />
          <Text style={styles.checkboxLabel}>Read</Text>
        </View>

        <Button
          title="Details"
          color="#007AFF"
          onPress={() => router.push(`/books/${book.id}` as const)}
        />

        <Button title="Delete" color="#FF3B30" onPress={handleDeleteBook} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  info: {
    flex: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxLabel: {
    marginLeft: 6,
    color: "#333",
    fontSize: 14,
  },
});

export default BookLine;
