import { Ionicons } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs screenOptions={{
      headerShown: false
    }}
    >;

    <Tabs.Screen
    name="SearchGroups"
    options={{
      title:'Search',
      tabBarIcon:({color})=>(
        <Ionicons name="search-sharp" size={24} color={color}/>
      )
    }}
    />

</Tabs>;

}
