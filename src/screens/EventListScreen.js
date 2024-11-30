import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { auth, db } from '../firebaseConfig';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('events').onSnapshot(snapshot => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Button title="Add to Favourites" onPress={() => {}} />
          </View>
        )}
      />
      <Button title="Log Out" onPress={() => auth.signOut()} />
    </View>
  );
};

export default EventListScreen;
