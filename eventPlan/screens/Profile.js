
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-native-elements'

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";

const Profile = (props) => 
{
    const { colors } = useTheme();
    
    const navigation = props.navigation;

    const _id = navigation.getParam('id');
    const _name = navigation.getParam('name');

    const [data, setData] = useState({
        name: _name,
        number: "",
        email: "",
        id: _id
    });
    useEffect(async () => {
        // const apiBody = { eventId: _eventId };
        const apiData = await fetch(`${apiLink}/person/${_id}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonData = await apiData.json();
        console.log(jsonData);

        if (jsonData.success) 
        {
            const members = jsonData.members;
            const team =  jsonData.team;
            console.log(jsonData)
            setData({...data,success:true, name: jsonData.personFetched.name, email: jsonData.personFetched.email , number:jsonData.personFetched.number })
            alert("Got the Member")
        }
        else {
            alert("No Members")
        }

    }, [])

    return (
        <View>
        
            <View>
                <Card>
                    <Card.Title style={[{ backgroundColor: colors.card , fontSize: 25 }]}>{data.name}</Card.Title>
                    <Card.Divider />

                    <View style={[{ backgroundColor: colors.border, borderRadius: 8, padding: 5, color: colors.text }]}>
                        
                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                Email
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: colors.text }]}>
                                {data.email}
                            </Text>


                        </View>
                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                Number
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: colors.text }]}>
                                {data.number}
                            </Text>


                        </View>
                    </View>

                </Card>
            </View>

            {
             
                 data.api && <ActivityIndicator color="#0000ff"   style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
        </View>
    )
}
export default Profile;

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