import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';


const NotesEvent = (props) => {
    const navigation = props.navigation;
    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "notes": [
            {
                "_id": "61a902652c03ace148847b40",
                "eventId": "61a4e0ed5f599ed12becaaf3",
                "NotesText": "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also ...",
                "__v": 0
            },
            {
                "_id": "61a902762c03ace148847b44",
                "eventId": "61a4e0ed5f599ed12becaaf3",
                "NotesText": "The Lorem ipum filling text is used by graphic designers, programmers and printers with the aim of occupying the spaces of a website, an advertising product or ..",
                "__v": 0
            },
            {
                "_id": "61a9027a2c03ace148847b48",
                "eventId": "61a4e0ed5f599ed12becaaf3",
                "NotesText": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is",
                "__v": 0
            }
        ]
    }

    );
    return (
        <ScrollView>

            <View>
                <View style={[{ marginTop: 20, marginBottom: 5, marginLeft: 40, marginRight: 40 }]}>
                    <Button onPress={() => {
                        navigation.navigate('newNote')
                    }
                    } size={5} title={"Add New Note"}></Button>

                </View>
                {
                    data.success == true && data.notes.map((note, i) => <Card key={i} >
                        <Card.Title style={[{ backgroundColor: colors.card }]}>{note._id}</Card.Title>
                        <Card.Divider />
                        <View style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                    {note.NotesText}
                                </Text>
                                <View style={[{ marginTop: 20, marginBottom: 5, marginLeft: 30, marginRight: 30 }]} >
                                    <Button type="outline" size={3} title={"Remove Note"}>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                    )
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