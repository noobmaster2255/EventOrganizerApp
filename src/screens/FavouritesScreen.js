import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import EventFavCard from "../components/EventFavCard";
import { useIsFocused } from "@react-navigation/native";

const FavouritesScreen = () => {
  const [favourites, setFavourites] = useState([]);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    const fetchFavourites = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        setFavourites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    if (isFocused) {
      fetchFavourites();
    }
  }, [isFocused]); 

  const removeEvent = async (eventId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("You need to be logged in to remove from favorites.");
        return;
      }

      await deleteDoc(doc(db, "favorites", eventId));

      setFavourites((prevFavourites) => prevFavourites.filter((event) => event.id !== eventId));
      Alert.alert("Event removed from favorites!");
    } catch (error) {
      console.error("Error removing event from favorites: ", error);
      Alert.alert("Error", "There was an issue removing the event.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventFavCard event={item} removeEvent={removeEvent} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default FavouritesScreen;
