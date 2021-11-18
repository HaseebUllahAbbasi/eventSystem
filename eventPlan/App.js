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
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f0f",
    padding:Platform.OS === "android"?20 : 0
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
    <View>
    <SignScreen/>
      {/* <LoginScreen></LoginScreen> */}
    </View>
    
  )

}
