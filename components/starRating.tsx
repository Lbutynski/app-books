import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function StarRating({
  maxStars = 5,
  defaultRating = 0,
  onRatingChange,
  disabled,
}: {
  maxStars?: number;
  defaultRating?: number;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
}) {
  const [rating, setRating] = useState(defaultRating);

  const handlePress = (newRating: number) => {
    if (disabled) return;
    setRating(newRating);
    onRatingChange?.(newRating);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= rating;
        return (
          <TouchableOpacity key={index} onPress={() => handlePress(starNumber)}>
            <Ionicons
              name={isFilled ? "star" : "star-outline"}
              size={32}
              color={isFilled ? "#FFD700" : "#ccc"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
});
