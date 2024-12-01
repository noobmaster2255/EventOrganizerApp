import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const EventForm = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleAddEvent = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("You must be logged in to create an event.");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        location,
        creator: user.uid,
      });
      Alert.alert("Event Added Successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Add Event" onPress={handleAddEvent} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
});

export default EventForm;
