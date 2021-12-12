import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import { CheckBox } from 'react-native';
import apiLink from "../shared/apiLink";

const EventTasks = (props) => {
    const navigation = props.navigation;

    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('event');
    const _eventName = navigation.getParam('eventName');
    const _eventId = navigation.getParam('eventId');
    const _eventAdmin = navigation.getParam('eventAdmin');
    const colors = useTheme();
    const [data, setData] = useState({
        api:false,
        "success": true,
        tasks: []
    });
    
    useEffect(async () => {
        const apiBody = { eventId: _eventId };
        const apiData = await fetch(`${apiLink}/assignTask/${_eventId}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiBody),
        });
        const jsonData = await apiData.json();
        console.log(jsonData);

        if (jsonData.success) {
            const tasks = jsonData.tasks
            setData({ ...data, success: true, tasks: [...tasks] })
            alert("Got the notes")
        }
        else {
            alert("No Notes")
        }


    }, [])
    
    return (
        <ScrollView>
            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
            <View>
                <View style={[{ marginTop: 25, marginBottom: 5, marginLeft: 40, marginRight: 40 }]} >
                    <Button onPress={() => {
                        navigation.navigate('newTask',{user: _user, email: _email, number:_number, id: _id ,eventId : _eventId, eventName : _eventName, eventAdmin: _eventAdmin } )

                    }} size={4} title={"Add New Task"}></Button>
                </View>
                {
                    data.tasks.length != 0 ? data.tasks.map((item, i) => <Card key={i}>
                        <Card.Title>
                            {item.taskText}
                        </Card.Title>
                        <Card.Divider />
                        <View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>
                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    Id
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    {item._id}
                                </Text>
                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>
                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    Event
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    {item.eventId}
                                </Text>
                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>
                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    Task Status
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    {item.taskStatus === true ? "Completed" : "Not Completed"}
                                </Text>
                            </View>
                            {item.taskStatus === true ? <Button style={[{ marginTop: 15, marginBottom: 5, marginLeft: 20, marginRight: 20 }]} type="solid" size={5} title={"Completed"} disabled>

                            </Button> : <Button style={[{ marginTop: 15, marginBottom: 5, marginLeft: 20, marginRight: 20 }]} type="outline" size={5} title={"Complete Task"}>

                            </Button>}

                        </View>
                    </Card>) : <Card style={[{ backgroundColor: colors.card }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                            No Tasks For The Event
                        </Text>

                    </Card>
                }
            </View>

        </ScrollView>
    )

}
export default EventTasks;