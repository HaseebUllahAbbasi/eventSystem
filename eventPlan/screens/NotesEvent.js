import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';


const NotesEvent = () => {
    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "tasks": [
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
        <View>
                <Button style={[{ marginTop: "30px", marginBottom: "5px", marginLeft: "40px", marginRight: "40px" }]} type="outline" size={5} title={"Add New Note"}></Button>
                {
                    data.success == true && data.tasks.map((note, i) => <Card key={i} >
                        <Card.Title style={[{ backgroundColor: colors.card }]}>{note._id}</Card.Title>
                        <Card.Divider />
                        <View style={[{ backgroundColor: colors.border, borderRadius: "5px", padding: "5px", color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                    {note.NotesText}
                                </Text>
                                <Button style={[{ marginTop: "30px", marginBottom: "5px", marginLeft: "40px", marginRight: "40px" }]} type="outline" size={5} title={"Remove Note"}>
                                </Button>
                            </View>
                        </View>
                    </Card>
                    )

                }


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