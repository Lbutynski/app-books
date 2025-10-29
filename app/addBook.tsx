import StarRating from "@/components/starRating";
import { addBook } from "@/services/bookService";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddBookPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [editor, setEditor] = useState("");
  const [theme, setTheme] = useState("");
  const [cover, setCover] = useState("");
  const [read, setRead] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const book = {
      name,
      author,
      year: parseInt(year, 10),
      editor,
      theme,
      cover,
      isRead: read,
      rating,
    };

    addBook(book).then(() => {
      router.replace("/");
    });
  };
  const handlePickImage = async () => {
    // Ask for media library permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      setCover(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Book</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter the book name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Author</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Enter the author name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={setYear}
          placeholder="Enter publication year"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Editor</Text>
        <TextInput
          style={styles.input}
          value={editor}
          onChangeText={setEditor}
          placeholder="Enter the editor name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Theme</Text>
        <TextInput
          style={styles.input}
          value={theme}
          onChangeText={setTheme}
          placeholder="Enter the theme"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Cover (image URL)</Text>
        <TextInput
          style={styles.input}
          value={cover}
          onChangeText={setCover}
          placeholder="Enter the cover image URL"
        />
      </View>
      <Button title="Change Cover" onPress={handlePickImage} color="#007AFF" />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={read}
          onValueChange={setRead}
          color={read ? "#007AFF" : undefined}
        />
        <Text style={styles.checkboxLabel}>Already read</Text>
      </View>
      <View>
        <StarRating defaultRating={rating} onRatingChange={setRating} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Book" onPress={handleSubmit} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
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

export default AddBookPage;
