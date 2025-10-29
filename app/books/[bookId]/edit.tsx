import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { getBookById, updateBook } from "@/services/bookService";
import Book from "@/models/Book";

const EditBookPage = () => {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [editor, setEditor] = useState("");
  const [theme, setTheme] = useState("");
  const [cover, setCover] = useState("");
  const [read, setRead] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;
    getBookById(bookId)
      .then((data) => {
        setBook(data);
        setName(data.name);
        setAuthor(data.author);
        setYear(data.year.toString());
        setEditor(data.editor);
        setTheme(data.theme);
        setCover(data.cover);
        setRead(data.read);
      })
      .catch(() => {
        Alert.alert("Error", "Unable to load book details.");
      })
      .finally(() => setLoading(false));
  }, [bookId]);

  const handleSubmit = async () => {
    if (!book) return;

    const updatedBook: Book = {
      ...book,
      name,
      author,
      year: parseInt(year, 10),
      editor,
      theme,
      cover,
      read,
    };

    try {
      await updateBook(updatedBook);
      Alert.alert("Success", "Book updated successfully!");
      router.replace(`/books/${book.id}`);
    } catch (error) {
      Alert.alert("Error", "Failed to update the book.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading book details...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Book not found.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Book</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Book name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Author</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Author name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={setYear}
          placeholder="Year of publication"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Editor</Text>
        <TextInput
          style={styles.input}
          value={editor}
          onChangeText={setEditor}
          placeholder="Editor name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Theme</Text>
        <TextInput
          style={styles.input}
          value={theme}
          onChangeText={setTheme}
          placeholder="Book theme"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Cover (Image URL)</Text>
        <TextInput
          style={styles.input}
          value={cover}
          onChangeText={setCover}
          placeholder="Cover image URL"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={read}
          onValueChange={setRead}
          color={read ? "#007AFF" : undefined}
        />
        <Text style={styles.checkboxLabel}>Already read</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSubmit} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default EditBookPage;
