import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import EventCard from "../components/EventCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const MyEventsScreen = () => {
  const [myEvents, setMyEvents] = useState([]);

  const fetchMyEvents = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "events"), where("creator", "==", user.uid));
      const snapshot = await getDocs(q);
      setMyEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyEvents();
    }, []) 
  );

  const handleDeleteEvent = (eventId) => {
    setMyEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onDelete={handleDeleteEvent} />
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

export default MyEventsScreen;
