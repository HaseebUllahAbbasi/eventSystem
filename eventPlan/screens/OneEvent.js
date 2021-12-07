import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
const OneEvent = (props) => {

    const navigation = props.navigation;
    const [data, setData] = useState({
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
    });
    return (
        <View>
            <Card>
                <Card.Title style={[{ backgroundColor: colors.card }]}>{data.eventName}</Card.Title>
                <Card.Divider />
                <View style={[{ backgroundColor: colors.border, borderRadius: "5px", padding: "5px", color: colors.text }]}>
                    <View>
                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            Description
                        </Text>
                        <Text style={[styles.section, { color: colors.text, paddingLeft: "5px" }]}> {data.eventDesc} </Text>

                    </View>
                    <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            Planner
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            {data.userId}
                        </Text>


                    </View>
                    <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            Team Members
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            {data.team.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            Tasks Assigned
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            {data.tasks.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            Notes
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            {data.notes.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            Status
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                            {data.eventStatus ? "Completed" : "In Progess"}
                        </Text>
                    </View>

                    <Button style={[{ marginTop: "20px", marginBottom: "5px" }]} type="outline" size={3} title={"View"}>
                    </Button>

                </View>


            </Card>
        </View>
    )
}
export default OneEvent;

