import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Books List" }} />
      <Stack.Screen name="books/[bookId]" options={{ title: "Book Details" }} />
      <Stack.Screen
        name="books/[bookId]/edit"
        options={{ title: "Edit Book" }}
      />
      <Stack.Screen name="addBook" options={{ title: "Add Book" }} />
    </Stack>
  );
}
