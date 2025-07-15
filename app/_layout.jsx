import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs screenOptions={{
    headerShown: false
  }}
  >;

    <Tabs.Screen
      name="SearchGroups"
      options={{
        title: 'Search',
        tabBarIcon: ({ color }) => (
          <Ionicons name="search-sharp" size={24} color={color} />
        )
      }}
    />

    <Tabs.Screen
    name="index"
    options={{
      title: 'Index',
        tabBarIcon: ({ color }) => (
          <Ionicons name="search-sharp" size={24} color={color} />
        )
    }}
    />

  </Tabs>;

}
