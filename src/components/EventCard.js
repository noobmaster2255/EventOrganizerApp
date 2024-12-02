import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { db, auth } from "../../firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const EventCard = ({ event, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(event.title);
  const [newDescription, setNewDescription] = useState(event.description);
  const [newDate, setNewDate] = useState(event.date);
  const [newLocation, setNewLocation] = useState(event.location);

  const handleEditEvent = async () => {
    const user = auth.currentUser;
    if (user && user.uid === event.creator) {
      try {
        const eventRef = doc(db, "events", event.id);
        console.log("Updating Event:", eventRef);
        await updateDoc(eventRef, {
          title: newTitle,
          description: newDescription,
          date: newDate,
          location: newLocation,
        });
        console.log("Update successful");
        Alert.alert("Event Updated Successfully");
        setIsEditing(false);
      } catch (error) {
        console.error("Update Error:", error.message);
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("You can only edit your own events.");
    }
  };
  

  const handleDeleteEvent = async () => {
    const user = auth.currentUser;
    if (user && user.uid === event.creator) {
      try {
        const eventRef = doc(db, "events", event.id);
        const favoriteRef = doc(db, "favorites", `${user.uid}_${event.id}`);
  
        await Promise.all([deleteDoc(eventRef), deleteDoc(favoriteRef)]);
  
        Alert.alert("Event Deleted Successfully");
        onDelete(event.id);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("You can only delete your own events.");
    }
  };
  

  return (
    <View style={styles.card}>
      {isEditing ? (
        <>
          <TextInput
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newDescription}
            onChangeText={setNewDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Date"
            value={newDate}
            onChangeText={setNewDate}
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={newLocation}
            onChangeText={setNewLocation}
            style={styles.input}
          />
          <Button title="Save Changes" onPress={handleEditEvent} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.date}>{event.date}</Text>
          <Text style={styles.location}>{event.location}</Text>
          {event.creator === auth.currentUser?.uid && (
            <>
              <Button title="Edit Event" onPress={() => setIsEditing(true)} />
              <Button title="Delete Event" onPress={handleDeleteEvent} />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 10, // To add horizontal margin for spacing
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EventCard;
