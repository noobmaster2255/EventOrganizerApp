import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "react-native-vector-icons"; 
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native"; 

const EventListCard = ({ event }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkIfFavorited = async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const favoriteDocRef = doc(db, "favorites", `${userId}_${event.id}`);
          const docSnapshot = await getDoc(favoriteDocRef);
          setIsFavorited(docSnapshot.exists());
        }
      };

      checkIfFavorited();
    }, [event.id]) 
  );

  const handleFavorite = async () => {
    try {
      if (!auth.currentUser) {
        Alert.alert("You need to be logged in to add favorites.");
        return;
      }

      const userId = auth.currentUser.uid;

      if (isFavorited) {
        await deleteDoc(doc(db, "favorites", `${userId}_${event.id}`));
        setIsFavorited(false);
        Alert.alert("Event removed from favorites!");
      } else {
        await setDoc(doc(db, "favorites", `${userId}_${event.id}`), {
          userId,
          eventId: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          creator: event.creator,
        });
        setIsFavorited(true);
        Alert.alert("Event added to favorites!");
      }
    } catch (error) {
      console.error("Error adding/removing favorite: ", error);
      Alert.alert("Error", "There was an issue adding/removing from favorites.");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.date}>{event.date}</Text>
          <Text style={styles.location}>{event.location}</Text>
        </View>

        <TouchableOpacity onPress={handleFavorite}>
          <MaterialIcons
            name={isFavorited ? "favorite" : "favorite-border"} 
            size={30}
            color={isFavorited ? "red" : "gray"} 
          />
        </TouchableOpacity>
      </View>
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
  content: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
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

export default EventListCard;
