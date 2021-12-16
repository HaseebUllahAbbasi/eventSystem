import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";


const NotesEvent = (props) => {
    const navigation = props.navigation;

    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('event');
    const _eventName = navigation.getParam('eventName');
    const _eventId = navigation.getParam('eventId');
    const _eventAdmin = navigation.getParam('eventAdmin');

    const { colors } = useTheme();
    const [data, setData] = useState({ success: false });

    useEffect(async () => {
        const apiBody = { eventId: _eventId };
        const apiData = await fetch(`${apiLink}/notesOfEvent`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiBody),
        });
        const jsonData = await apiData.json();
        // console.log(jsonData);

        if (jsonData.success) {
            const noteListsFound = jsonData.noteListsFound
            setData({ ...data, success: true, notes: [...noteListsFound] })
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
                <Card.Title style={[{ backgroundColor: colors.card, fontSize: 30 }]}>{_eventName}</Card.Title>

                <View style={[{ marginTop: 20, marginBottom: 5, marginLeft: 40, marginRight: 40 }]}>
                    <Button onPress={() => {
                        navigation.navigate('newNote', { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin })
                    }
                    } size={5} title={"Add New Note"}></Button>

                </View>
                {
                    data.success == true ? data.notes.map((note, i) => <Card key={i} >
                        <Card.Title style={[{ backgroundColor: colors.card }]}>Note : {i+1} </Card.Title>
                        <Card.Divider />
                        <View style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    {note.NotesText}
                                </Text>
                                <View style={[{ marginTop: 20, marginBottom: 5, marginLeft: 30, marginRight: 30 }]} >
                                    <Button onPress={async () => {
                                        const apiBody = { eventId: _eventId , plannerId: _eventAdmin, noteId :note._id   };
                                        const apiData = await fetch(`${apiLink}/removeNote`, {
                                            method: 'POST', // or 'PUT'
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(apiBody),
                                        });
                                        const jsonData = await apiData.json();
                                        // console.log(jsonData);

                                        if (jsonData.success) {
                                            const new_Notes =  data.notes.filter(noteItem=> noteItem._id != note._id )

                                            setData({...data,notes :[...new_Notes] })
                                            alert("Note removed")
                                        }
                                        else {
                                            alert("Incomplete")
                                        }

                                   }}

                                        type="outline" size={3} title={"Remove Note"}>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                    )
                        : <Card style={[{ backgroundColor: colors.card }]}>

                            <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                                No Notes For The Event
                            </Text>

                        </Card>
                }
            </View>

        </ScrollView>
    )
}
export default NotesEvent;



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