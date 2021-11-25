import React , {useState}from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';

const MyRequests = ()=>
{
    const { colors } = useTheme();
    const [requests,setRequests] = useState([
        {id :"id_1",  eventName : "Name of Event" ,  Desc :"Lorem IPSUM , This is Descrption" },
        {id :"id_1",  eventName : "Name of Event" ,Desc :"Lorem IPSUM , This is Descrption" }  ,
        {id :"id_1",  eventName : "Name of Event"  ,Desc :"Lorem IPSUM , This is Descrption"},
        {id :"id_1",  eventName : "Name of Event" ,Desc :"Lorem IPSUM , This is Descrption"}
    ]);    
    return (
        <View>
            <Card.Title> My Requests</Card.Title>
            {
                requests.length != 0 &&  requests.map(item=> <Card>
                <Card.Title>
                    {item.eventName}
                </Card.Title>
                 <Card.Divider/>
                 <View>
                 <Text style={[{textAlign:"center", fontSize:"1rem", fontWeight:"bold", color: colors.text} ]}>
                                        {item.Desc}
                                    </Text>
                 <Button style={[{marginTop:"30px" , marginBottom:"5px", marginLeft:"40px", marginRight:"40px"  }]} type="outline" size={5} title={"Accept Request"}>
                 
                 </Button>   

                 </View>
                 </Card>)
            }
        </View>
    )
}
export default MyRequests;
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    blackColor: {
        color: "black",
      }
});