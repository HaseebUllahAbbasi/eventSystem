import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";


const MyRequests = (props) => {
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
        const apiData = await fetch(`${apiLink}/requestsDetails/${_id}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonData = await apiData.json();
        if (jsonData.success) {
            const requestDetailedData = jsonData.requestDetailedData
            setData({ ...data, success: true, notes: [...requestDetailedData] })
        }
        else {
            alert("No Requests")
        }

    }, [])
    return (
        <ScrollView>
            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
            <View>

                {
                    data.success == true ? data.notes.map((item, i) => <Card key={i} >
                        <Card.Title style={[{ backgroundColor: colors.card }]}>{item.eventName}</Card.Title>
                        <Card.Divider />
                        <View style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Planner
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {item.userName}
                                </Text>


                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Description
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {item.eventDesc}
                                </Text>
                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Team Members
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {item.team.length}
                                </Text>
                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Guest 
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {item.guestList.length}
                                </Text>
                            </View>
                            


                            <View style={[styles.row, { justifyContent: "space-evenly" }]}>

                                <Button onPress={async () => {
                                    const apiBody = { userId : `${_id}`, eventId: `${item._id}` };
                            const apiData = await fetch(`${apiLink}/cancelRequest`, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(apiBody),
                            });
                            const jsonData = await apiData.json();
                            console.log(jsonData);                        
                            setData({
                                ...data,api: false 
                            });
    
                            if(jsonData.success)
                            {
                                alert("Cancelled Request")
                                const filteredList = data.notes.filter(reqItem=> reqItem._id != item._id);
                                setData({
                                    ...data, notes: [...filteredList]
                                })
                            }
                            else
                            {
                                alert("Not Cancelled")
                            }
                                }} style={[{ marginTop: 10, marginBottom: 5, width: 50 }]} type="outline" size={3} title={"Cancel"}>
                                </Button>

                                <Button onPress={async () => {
                                    const apiBody = { userId : `${_id}`, eventId: `${item._id}`, eventName: `${item.eventName}` };
                            const apiData = await fetch(`${apiLink}/acceptRequest`, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(apiBody),
                            });
                            const jsonData = await apiData.json();
                            console.log(jsonData);                        
                            setData({
                                ...data,api: false 
                            });
                            
                            
                            if(jsonData.success)
                            {
                                alert("Accepted Request ")
                                const filteredList = data.notes.filter(reqItem=> reqItem._id != item._id);
                                setData({
                                    ...data, notes: [...filteredList]
                                })
                            }
                            else
                            {
                                alert("Not Accepted")
                            }
                                }} style={[{ marginTop: 10, marginBottom: 5, width: 50 }]} type="outline" size={3} title={"Accept"}>
                                </Button>


                            </View>


                        </View>


                    </Card>
                    )
                        : <Card style={[{ backgroundColor: colors.card }]}>

                            <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                                No Requests
                            </Text>

                        </Card>
                }
            </View>

        </ScrollView>
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