import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventListScreen from "../screens/EventListScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={EventListScreen} />
      <Tab.Screen name="My Events" component={MyEventsScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
