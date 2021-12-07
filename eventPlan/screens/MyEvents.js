import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';


import { Card, ListItem,ThemeProvider, Button, Icon } from 'react-native-elements'

import { Text } from "../components/Themed"
const MyEvents = (props) => {
    const navigation = props.navigation;

    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "events": [
            {
                "_id": "619032f2271ff186b1c1eca7",
                "userId": "619032a107",
                "eventName": "BirthDay",
                "eventDesc": "Simple Desc of Event but this is just nothing just a small description",
                "team": [
                    "61903152fd325904426375da"
                ],
                "tasks": [
                    "6190e046e5cb2abbe906c653",
                    "6190e111aea523d027c4dbed",
                    "6191254806d9d4318b2f83f1",
                    "6197e64193c8dc7293981279"
                ],
                "guestList": [],
                "notes": [],
                "eventStatus": false,
                "__v": 0
            },
            {
                "_id": "6196843e6198affe7a130ac8",
                "userId": "619681e80c",
                "eventName": "Party_1",
                "eventDesc": "Simple Desc of Event but this is just nothing just a small description",
                "team": [],
                "tasks": [],
                "guestList": [],
                "notes": [],
                "eventStatus": false,
                "__v": 0
            }
        ]
    });
    return (
        <View>
            <Text >
                {
                    data.success == true && data.events.map((eventItem, i) => <Card key={i}>
                        <Card.Title style={[{ backgroundColor: colors.card }]}>{eventItem.eventName}</Card.Title>
                        <Card.Divider />
                        <View key={i} style={[{ backgroundColor: colors.border, borderRadius: "5px", padding: "5px", color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    Description
                                </Text>
                                <Text style={[styles.section, { color: colors.text, paddingLeft: "5px" }]}> {eventItem.eventDesc} </Text>

                            </View>

                            <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    Planner
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.userId}
                                </Text>


                            </View>
                            <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    Team Members
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.team.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    Tasks Assigned
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.tasks.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    Notes
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.notes.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    Status
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.eventStatus ? "Completed" : "In Progess" }
                                </Text>
                            </View>
                            <View style={[styles.row, { justifyContent: "space-evenly" }]}>

                                <ThemeProvider >

                                {eventItem.eventStatus ? 
                                     <Button type="outline" size={3} style={[{ marginTop: "20px", marginBottom: "5px", width: "100px", color: "red" }]} title={"Complete"} disabled>
                                    </Button> : <Button type="outline" size={3} style={[{ marginTop: "20px", marginBottom: "5px", width: "100px", color: "red" }]} title={"Complete"}>
                                    </Button> }

                                </ThemeProvider>

                                <Button onPress={()=> {
                                    navigation.navigate('OneEvent')
                                }} style={[{ marginTop: "20px", marginBottom: "5px", width: "100px" }]} type="outline" size={3} title={"View"}>
                                </Button>

                            </View>
                        </View>


                    </Card>
                    )

                }

            </Text>

        </View>
    )
}
export default MyEvents;



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