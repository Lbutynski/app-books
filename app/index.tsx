import BookLine from "@/components/bookLine";
import Book from "@/models/Book";
import { getBooks } from "@/services/bookService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SortBy, SortOrder } from "@/utils/SearchTypes";

export default function Index() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks({ search, sortBy, sortOrder });
      setBooks(data);
      setMessage(data.length === 0 ? "Aucun livre trouvé." : "");
    } catch {
      setMessage("Erreur lors du chargement des livres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Livres</Text>

      {/* Search bar */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher un livre..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Sort pickers */}
      <View style={styles.sortContainer}>
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={(value) => setSortBy(value)}
        >
          <Picker.Item label="Titre" value="title" />
          <Picker.Item label="Auteur" value="author" />
          <Picker.Item label="Thème" value="theme" />
          <Picker.Item label="Année" value="year" />
          <Picker.Item label="Note" value="rating" />
        </Picker>

        <Picker
          selectedValue={sortOrder}
          style={styles.picker}
          onValueChange={(value) => setSortOrder(value)}
        >
          <Picker.Item label="Ascendant" value="asc" />
          <Picker.Item label="Descendant" value="desc" />
        </Picker>
      </View>

      {/* Search button */}
      <View style={styles.buttonContainer}>
        <Button title="Rechercher" onPress={fetchBooks} color="#007AFF" />
      </View>

      <Button
        title="➕ Ajouter un livre"
        color="#34C759"
        onPress={() => router.push("/addBook")}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <ScrollView>
        {loading ? (
          <Text style={styles.loading}>Chargement...</Text>
        ) : (
          books.map((book) => <BookLine key={book.id} {...book} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: { flex: 1, height: 50 },
  buttonContainer: { marginBottom: 15 },
  message: { textAlign: "center", color: "#999", marginVertical: 10 },
  loading: { textAlign: "center", color: "#007AFF", marginVertical: 10 },
});
