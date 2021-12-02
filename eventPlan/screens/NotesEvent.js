import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';


import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { Text } from "../components/Themed"
const NotesEvent = () => {
    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "tasks": [
            {
                "_id": "61a902652c03ace148847b40",
                "eventId": "61a4e0ed5f599ed12becaaf3",
                "NotesText": "This is Note Text 2",
                "__v": 0
            },
            {
                "_id": "61a902762c03ace148847b44",
                "eventId": "61a4e0ed5f599ed12becaaf3",
                "NotesText": "This is Note Text 3",
                "__v": 0
            },
            {
                "_id": "61a9027a2c03ace148847b48",
                "eventId": "61a4e0ed5f599ed12becaaf3",
                "NotesText": "This is Note Text 4",
                "__v": 0
            }
        ]
    }

    );
    return (
        <View>
            <Text >
                {
                    data.success == true && data.tasks.map((note, i) => <View key={i} style={[styles.row, {width:"100%"}]}>
                        {/* {eventItem.eventStatus} */}
                        <Card >
                            <Card.Title style={[{ backgroundColor: colors.card }]}>{note._id}</Card.Title>
                            <Card.Divider />
                            <View style={[{ backgroundColor: colors.border, borderRadius: "5px", padding: "5px", color: colors.text }]}>
                                <View>
                                    <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                        {note.NotesText}
                                    </Text>
                                    
                                </View>
                            </View>
                        </Card>
                    </View>)

                }

            </Text>

        </View>
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