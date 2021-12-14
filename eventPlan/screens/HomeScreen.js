import React, { useState } from "react"
import { View, StyleSheet, ScrollView ,ActivityIndicator} from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Card, ListItem, ThemeProvider, Button, Icon } from 'react-native-elements'

import { Text } from "../components/Themed"
import apiLink from "../shared/apiLink";
const HomeScreen = (props) => {
    const navigation = props.navigation;
    

    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('number');
    const _requests = navigation.getParam('requests');
    
    
    const [homeScreenData,setScreen] = useState({
        userName: _user,
        email: _email,
        req: _requests,
        num: _number
    }) 
    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "events": [
            {
                "_id": "61abe16a0722c9f739f10729",
                "userId": "61abe10b0722c9f739f10720",
                "eventName": "Party_1",
                "eventDesc": "Kuch Ziada Nahi",
                "userName": "Shaikh",
                "team": [
                    {
                        "personID": "61abe12b0722c9f739f10726",
                        "name": "nazeer2"
                    }
                ],
                "tasks": [],
                "guestList": [],
                "notes": [
                    "61b3abfbb66eee83ede808c7",
                    "61b3b3d4c4c26e0540e33218",
                    "61b60f0cdf446b9656ec5e05",
                    "61b61647df446b9656ec5e17"
                ],
                "eventStatus": false,
                "__v": 0
            }
        ]
    });

    useState( async()=>
    {
        setData({
            ...data,api: true 
        });
        
        const apiData = await fetch(`${apiLink}/getEvents`);
        const jsonData = await apiData.json();
        console.log(jsonData);
                               
        setData({
            ...data,api: false,events: [...jsonData.events] 
        });
        setScreen({
            userName: _user,
            email: _email,
            req: _requests,
            num: _number
        });
        
        
    },[])
    return (
        <ScrollView>
            
            {
                    data.api && <ActivityIndicator color="#0000ff"   style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
                <Card style={[{ backgroundColor: colors.card }]}>
                    
                    <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                    
                        Hi {homeScreenData.userName} , 
                        You Have  {homeScreenData.req} Requests
                    </Text>
                    <View>
                        <Button onPress={() => {
                            navigation.navigate('myRequests',{user: _user, email: _email, number:_number, id: _id  })
                        }} title={"View Requests"}>

                        </Button>
                    </View>
                </Card>
                <Card style={[{ backgroundColor: colors.card , marginTop:5 } ]}>    
                    <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                    
                        Why Are You Waiting ! Just Create New Event
                    </Text>
                    <View>
                        <Button onPress={() => {
                            navigation.navigate('createEvent',{user: _user, email: _email, number:_number, id: _id  })
                        }} title={"Create Event"}>

                        </Button>
                    </View>
                </Card>
                
                {
                    data.success == true && data.events.map((eventItem, i) => <Card key={i}>
                        <Card.Title style={[{ backgroundColor: colors.card }]}>{eventItem.eventName}</Card.Title>
                        <Card.Divider />
                        <View key={i} style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Description
                                </Text>
                                <Text style={[styles.section, { color: colors.text, paddingLeft: 5 }]}> {eventItem.eventDesc} </Text>

                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Planner
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.userName}
                                </Text>


                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Team Members
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.team.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Tasks Assigned
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.tasks.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Notes
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.notes.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Status
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.eventStatus ? "Completed" : "In Progess"}
                                </Text>
                            </View>
                            <View style={[styles.row, { justifyContent: "space-evenly" }]}>

                                <ThemeProvider >

                                    {eventItem.eventStatus ?
                                        <Button type="outline" size={3} style={[{ marginTop: 10, marginBottom: 5, width: 50, color: "red" }]} title={"Complete"} disabled>
                                        </Button> : <Button type="outline" size={3} style={[{ marginTop: 10, marginBottom: 5, width: 50, color: "red" }]} title={"Complete"}>
                                        </Button>}

                                </ThemeProvider>

                                <Button onPress={() => {
                                    navigation.navigate('OneEvent', {user: _user, email: _email, number:_number, id: _id ,eventId : eventItem._id, eventName : eventItem.eventName, eventAdmin: eventItem.userId })
                                }} style={[{ marginTop: 10, marginBottom: 5, width: 50 }]} type="outline" size={3} title={"View"}>
                                </Button>

                            </View>

                        </View>


                    </Card>
                    )

                }


        </ScrollView>

    )
}
export default HomeScreen;
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