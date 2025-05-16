import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  ////////////////////

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E68F4B",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F5F6FA",
          paddingTop: 10,
        },
      }}
      initialRouteName="ActionScreen"
    >
      <Tabs.Screen
        name="ActionScreen"
        options={{
          title: "Deck",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-playing-diamond-multiple-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="StarredMoviesScreen"
        options={{
          title: "Your hand",
          tabBarIcon: ({ color }) => (
            <Octicons name="stack" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
