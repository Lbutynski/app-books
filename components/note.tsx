import Note from "@/models/Note";
import { Text, View } from "react-native";

const NoteComponent = (note: Note) => {
  return (
    <View>
      <Text>{note.content}</Text>
      <Text>{new Date(note.dateISO).toLocaleDateString()}</Text>
    </View>
  );
};

export default NoteComponent;
