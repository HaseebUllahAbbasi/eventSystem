import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, ThemeProvider, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";

const theme = {
    Button: {
        titleStyle: {
            // color: 'blue'
        }
    }
};

const EventTeam = (props) => {
    const navigation = props.navigation;

    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('event');
    const _eventName = navigation.getParam('eventName');
    const _eventId = navigation.getParam('eventId');
    const _eventAdmin = navigation.getParam('eventAdmin');
    const _AdminName = navigation.getParam('adminName');


    const { colors } = useTheme();
    const [data, setData] = useState({
        api: false,
        "success": true,
        "team":
            [
                {
                    "id": "61abe12b0722c9f739f10726",
                    "name": "nazeer2"
                },
                {
                    "id": "61abe12b0722c9f739f10726",
                    "name": "nazeer2"
                },
                {
                    "id": "61abe12b0722c9f739f10726",
                    "name": "nazeer2"
                },
                {
                    "id": "61abe12b0722c9f739f10726",
                    "name": "nazeer2"
                },
                {
                    "id": "61abe12b0722c9f739f10726",
                    "name": "nazeer2"
                },
                {
                    "id": "61abe12b0722c9f739f10726",
                    "name": "nazeer2"
                }

            ]
    });

    useEffect(async () => {
        // const apiBody = { eventId: _eventId };
        const apiData = await fetch(`${apiLink}/getMembers/${_eventId}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonData = await apiData.json();
        console.log(jsonData);

        if (jsonData.success) {
            const members = jsonData.members;
            const team = jsonData.team
            setData({ ...data, success: true, team: [...team] })
        }
        else {
            setData({ ...data, success: false, })

            alert("No Members")
        }

    }, [])
    return (
        <ScrollView>

            <View>
                <View style={[{ marginTop: 25, marginBottom: 5, marginLeft: 40, marginRight: 40 }]}>

                    <Button onPress={() => {
                        navigation.navigate('sendRequest', { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin,adminName : _AdminName })
                    }} size={5} title={"Add New Member"}>

                    </Button>
                </View>
                {
                    data.success == true ? data.team.map((member, i) => <Card key={i} >
                        <View style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: colors.text }]}>
                                    {member.name}
                                </Text>
                            </View>
                            <View style={[styles.row, { justifyContent: "space-evenly" }]}>

                                <ThemeProvider theme={theme}>

                                    <Button
                                        onPress={async () => {

                                            setData({
                                                ...data, api: true
                                            });

                                            const apiBody = { eventId: `${_eventId}`, plannerId: `${_eventAdmin}`, memberId : `${member.id}`, memberName: member.name };
                                            const apiData = await fetch(`${apiLink}/removeMember`, {
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
                                            

                                            if (jsonData.success) 
                                            {
                                                alert("Member Removed ")
                                            }
                                            else {
                                                alert("Member Not Removed")
                                            }

                                        }}

                                        type="outline" size={3} style={[{ marginTop: 15, marginBottom: 5, width: 40, color: "red" }]} title={"Remove"}>
                                    </Button>

                                    <Button onPress={() => {
                                        navigation.navigate('memberProfile', { name: member.name, id: member.id });
                                    }} style={[{ marginTop: 15, marginBottom: 5, width: 40 }]} type="outline" size={3} title={"View"}>
                                    </Button>
                                </ThemeProvider>

                            </View>
                        </View>
                    </Card>
                    ) : <Card style={[{ backgroundColor: colors.card }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                            No Team Members
                        </Text>

                    </Card>

                }

                {

                    data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
                }

            </View>

        </ScrollView>
    )
}
export default EventTeam;
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
    },
    button: {
        color: "#ff5c5c",
    }
});