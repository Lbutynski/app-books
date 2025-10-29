import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {
  getBookById,
  deleteBook,
  updateBook,
  getNotes,
  addNote,
} from "@/services/bookService";
import Book from "@/models/Book";
import { Checkbox } from "expo-checkbox";
import Note from "@/models/Note";
import NoteComponent from "@/components/note";
import StarRating from "@/components/starRating";

export default function BookDetailPage() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState<string>("");

  useEffect(() => {
    if (bookId) {
      getBookById(bookId)
        .then((data) => {
          setBook(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [bookId]);
  useEffect(() => {
    if (bookId) {
      getNotes(bookId)
        .then((data) => {
          setNotes(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [bookId]);

  const handleDelete = () => {
    if (!book) return;
    deleteBook(book.id).then(() => {
      router.replace("/");
    });
  };
  const handleFavoriteToggle = () => {
    updateBook({ ...book!, favorite: !book!.favorite }).then((updatedBook) => {
      setBook(updatedBook);
    });
  };
  const handleReadToggle = () => {
    updateBook({ ...book!, read: !book!.read }).then((updatedBook) => {
      setBook(updatedBook);
    });
  };
  const handleCommentAdd = () => {
    if (!bookId) return;
    if (noteContent.trim() === "") return;

    addNote(bookId, noteContent)
      .then((newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setNoteContent("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Book not found.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {book.cover ? (
          <Image
            source={{ uri: book.cover }}
            style={styles.cover}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noCover}>
            <Text style={styles.noCoverText}>No cover available</Text>
          </View>
        )}

        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.author}>by {book.author}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Editor:</Text>
          <Text style={styles.value}>{book.editor}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{book.year}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Theme:</Text>
          <Text style={styles.value}>{book.theme}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Read:</Text>
          <Checkbox value={book.read} onValueChange={handleReadToggle} />
          <Text style={styles.value}>{book.read ? "✅ Yes" : "❌ No"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Favorite:</Text>
          <Checkbox
            value={book.favorite}
            onValueChange={handleFavoriteToggle}
          />
          <Text style={styles.value}>{book.favorite ? "⭐ Yes" : "— No"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Rating:</Text>
          <StarRating defaultRating={book.rating} disabled={true} />
        </View>
        <View>
          {notes.map((note) => (
            <NoteComponent key={note.id} {...note} />
          ))}
        </View>
        <View>
          <TextInput
            value={noteContent}
            onChangeText={setNoteContent}
            placeholder="Enter your comment"
          />
          <Button title="Add Note" onPress={handleCommentAdd} />
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Button title="Back" onPress={() => router.back()} color="#007AFF" />
        <Button
          title="Edit"
          onPress={() => router.push(`/books/${book.id}/edit` as const)}
          color="#34C759"
        />
        <Button title="Delete" onPress={handleDelete} color="#FF3B30" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: 180,
    height: 260,
    borderRadius: 10,
    marginBottom: 20,
  },
  noCover: {
    width: 180,
    height: 260,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  noCoverText: {
    color: "#555",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },
  author: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    width: "100%",
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  value: {
    color: "#444",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
});
