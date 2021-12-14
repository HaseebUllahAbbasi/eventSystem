import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-native-elements'

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";
const OneEvent = (props) => {

    const navigation = props.navigation;

    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('event');
    const _eventName = navigation.getParam('eventName');
    const _eventId = navigation.getParam('eventId');
    const _eventAdmin = navigation.getParam('eventAdmin');

    console.log(_eventId)
    const { colors } = useTheme();
    const [data, setData] = useState({
        api: false,

        event: {
            "_id": "",
            "userId": "",
            "eventName": "",
            "eventDesc": "",
            "team": [],
            "tasks": [],
            "guestList": [],
            "notes": [],
            "eventStatus": false,
            "__v": 0
        }

    }
    );

    useEffect(async () => {
        // const apiBody = { eventId: _eventId };

        const apiData = await fetch(`${apiLink}/event/${_eventId}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonData = await apiData.json();
        console.log(jsonData);

        if (jsonData.success) {
            setData({ ...data, event: jsonData.event })

        }
        else {
            alert("No Notes")
        }
    }, [])

    return (
        <View>
            <Card>
                <Card.Title style={[{ backgroundColor: colors.card, fontSize: 20 }]}>{data.event.eventName}</Card.Title>
                <Card.Divider />
                <View style={[{ backgroundColor: colors.border, borderRadius: 8, padding: 5, color: colors.text }]}>
                <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                            Description
                        </Text>
                        <Text style={[{ fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.eventDesc}
                        </Text>


                    </View>


                    <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                            Planner
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.userName}
                        </Text>


                    </View>


                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            Team Members
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.team.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            Tasks Assigned
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.tasks.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            Notes
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.notes.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            Guest
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.guestList.length}
                        </Text>
                    </View>


                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            Status
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize : 15, fontWeight: "bold", color: colors.text }]}>
                            {data.event.eventStatus ? "Completed" : "In Progess"}
                        </Text>
                    </View>

                    <View style={[styles.row, { justifyContent: "space-evenly" }]}>
                        <Button onPress={() => {

                            navigation.navigate('eventTask', { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })

                        }} style={[{ marginTop: 10, marginBottom: 5 }]} type="outline" size={3} title={"View Tasks"}>
                        </Button>
                        <Button onPress={() => {
                            navigation.navigate('eventNotes',
                                { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })
                        }} style={[{ marginTop: 10, marginBottom: 5 }]} type="outline" size={3} title={"View Notes"}>
                        </Button>

                    </View>
                    <View style={[styles.row, { justifyContent: "space-evenly" }]}>
                        <Button onPress={() => {
                            navigation.navigate('eventTeam',
                                { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })
                        }} style={[{ marginTop: 10, marginBottom: 5 }]} type="outline" size={3} title={"View Members "}>
                        </Button>
                        <Button onPress={() => {
                            navigation.navigate('eventGuest',
                                { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })
                        }} style={[{ marginTop: 10, marginBottom: 5 }]} type="outline" size={3} title={"View Guests "}>
                        </Button>
                    </View>
                    <View style={[styles.row, { justifyContent: "space-evenly" }]}>
                        {
                            data.event.eventStatus == false  ? <Button onPress={async () => {

                                setData({
                                    ...data, api: true
                                });

                                const apiBody = { eventId: `${_eventId}`, plannerId: `${_eventAdmin}`, eventStatus: true };
                                const apiData = await fetch(`${apiLink}/changeStatus`, {
                                    method: 'POST', // or 'PUT'
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(apiBody),
                                });
                                const jsonData = await apiData.json();
                                console.log(jsonData);
                                setData({
                                    ...data, api: false
                                });


                                if (jsonData.success) {
                                    alert(" Event Completed ")
                                }
                                else {
                                    alert("Event not Completed")
                                }

                            }} style={[{ marginTop: 10, marginBottom: 5 }]} type="outline" size={3} title={"Complete Event"}>
                            </Button>
                                : <Button disabled type="outline" title={"Complete Event"} ></Button>
                        }
                    </View>

                </View>


            </Card>
        </View>
    )
}
export default OneEvent;



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