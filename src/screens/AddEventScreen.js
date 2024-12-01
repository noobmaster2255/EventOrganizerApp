import React from "react";
import { View, StyleSheet } from "react-native";
import EventForm from "../components/EventForm";  

const AddEventScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <EventForm navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default AddEventScreen;
