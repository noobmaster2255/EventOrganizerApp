import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const EventFavCard = ({ event, removeEvent }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.location}>{event.location}</Text>
      
      <Button
        title="Remove from Favorites"
        onPress={() => removeEvent(event.id)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: "gray",
  },
});

export default EventFavCard;
