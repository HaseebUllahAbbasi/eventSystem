import React , {useState}from "react";
import { View, Text } from "react-native";
const MyRequests = ()=>
{
    const [requests,setRequests] = useState([]);
    
    return (
        <View>
            <Text> My Requests</Text>
            {
                requests.length != 0 &&  requests.map(item=> <Text> Item</Text>)
                
            }
        </View>

    )
}
export default MyRequests;
