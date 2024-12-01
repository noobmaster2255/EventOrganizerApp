import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventListScreen from "../screens/EventListScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import AddEventScreen from "../screens/AddEventScreen"; 
import { Button } from "react-native";
import { auth } from "../../firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome"; 

const Tab = createBottomTabNavigator();

const MainNavigator = ({ navigation }) => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50", 
        tabBarInactiveTintColor: "#aaa", 
      }}
    >
      <Tab.Screen
        name="Events"
        component={EventListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color={color} /> 
          ),
          headerRight: () => (
            <Button title="Logout" onPress={handleLogout} />
          ),
        }}
      />
      <Tab.Screen
        name="My Events"
        component={MyEventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check-o" size={size} color={color} /> 
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} /> 
          ),
        }}
      />
      <Tab.Screen
        name="Add Event"
        component={AddEventScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus-circle" size={size} color={color} />
          ),
        
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
