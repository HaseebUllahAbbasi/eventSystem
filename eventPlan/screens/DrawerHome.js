import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import {createDrawerNavigator} from '@react-navigation/drawer'
import MainTabScreen from "./MainTabScreen";
// import { DrawerContent } from "..screens/DrawerContent";


const Drawer = createDrawerNavigator();
const DrawerComponent = (props)=>
{
    return(
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props=> <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={MainTabScreen}>

                </Drawer.Screen>
            </Drawer.Navigator>     
        </NavigationContainer>
        
    )
}
export default DrawerComponent;
