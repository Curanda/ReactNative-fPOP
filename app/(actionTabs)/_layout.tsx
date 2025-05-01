import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="ActionScreen"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="StarredMoviesScreen"
        options={{
          title: 'Starred Movies',
        }}
      />
    </Tabs>
  );
}
