import React, { useState } from "react";
import {View,Text} from 'react-native'
const Tasks = ()=>
{
    const [data,setData] = useState([ "Tasks 2 "]); 
    return(
        <View>
            <Text>
            Tasks to Implement
            </Text>
        </View>
    )

}
export default Tasks;