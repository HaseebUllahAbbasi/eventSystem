import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { Button, Platform, useColorScheme } from "react-native";
import { Text, View } from "./components/Themed";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LoginScreen from "./screens/Login";
import SignScreen from "./screens/Sign";
import NewAccount from "./screens/NewAccount";
// import DrawerComponent from "./screens/DrawerHome";



import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from '@react-navigation/drawer'
import MainTabScreen from "./screens/MainTabScreen";
import MyEvents from "./screens/MyEvents";
import DisplayAllEvents from "./screens/DisplayAllEvents";
import MyRequests from "./screens/MyRequests";
import Tasks from "./screens/Tasks";
import CreateEvent from "./screens/CreateEvents";
import SignInScreen from "./screens/Sign";
import CreateNote from "./screens/createNote";
import CreateTask from "./screens/createTasks";
import NotFoundScreen from "./screens/NotFoundScreen";
import NotesEvent from "./screens/NotesEvent";
import EventTeam from "./screens/EventTeam";
import SendRequest from "./screens/SendRequest";


const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    padding: Platform.OS === "android" ? 20 : 0
  }
})

export default function App() {

  // const isLoadingComplete = useLoadedAssets();
  // const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  //   return (
  //     <SafeAreaProvider>
  //       <Navigation colorScheme={colorScheme} />
  //       <StatusBar />
  //     </SafeAreaProvider>
  //   );
  // }



  return (

    <NavigationContainer>
      <Drawer.Navigator >
        <Drawer.Screen name="Send Request" component={SendRequest} />
        <Drawer.Screen name="All Members of Event" component={EventTeam} />
        <Drawer.Screen name="Create Event" component={CreateEvent} />
        <Drawer.Screen name="Home" component={MyEvents} />
        <Drawer.Screen name="Requests" component={MyRequests} />
        <Drawer.Screen name="Events" component={DisplayAllEvents} />
        <Drawer.Screen name="My Events" component={MyEvents} />
        <Drawer.Screen name="My Tasks" component={Tasks} />
        <Drawer.Screen name="Logout" component={LoginScreen} />
        <Drawer.Screen name="Sign In" component={SignInScreen} />
        <Drawer.Screen name="Create New Note" component={CreateNote} />
        <Drawer.Screen name="Create New Task" component={CreateTask} />
        <Drawer.Screen name="Notes Of Event" component={NotesEvent} />




      </Drawer.Navigator>
    </NavigationContainer>


    // <View>
    // {/* <SignScreen/> */}
    //   {/* <LoginScreen></LoginScreen> */}
    //   {/* <NewAccount/> */}
    // </View>


  )

}
