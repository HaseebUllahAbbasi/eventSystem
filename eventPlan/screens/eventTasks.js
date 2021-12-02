import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import { CheckBox } from 'react-native';

const EventTasks = () => {
    const colors = useTheme();

    const [data, setData] = useState([
        {
            "_id": "6191254806d9d4318b2f83f1",
            "eventId": "619032f2271ff186b1c1eca7",
            "taskText": "Bring Cake",
            "assignTo": "61903152fd325904426375da",
            "__v": 0,
            "taskStatus": true
        },
        {
            "_id": "6197e64193c8dc7293981279",
            "eventId": "619032f2271ff186b1c1eca7",
            "taskText": "Bring Candles",
            "assignTo": "61903152fd325904426375da",
            "__v": 0
        }
    ]);
    return (
        <View>
        <Button style={[{ marginTop: "30px", marginBottom: "5px", marginLeft: "40px", marginRight: "40px" }]} type="outline" size={5} title={"Add New Task"}></Button>
            {
                data.length !== 0  && data.map((item,i) => <Card key={i}>
                    <Card.Title>
                        {item.taskText}
                    </Card.Title>
                    <Card.Divider />
                    <View>
                        <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                Id
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                {item._id}
                            </Text>
                        </View>

                        <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                Event
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                {item.eventId}
                            </Text>
                        </View>

                        <View style={[{ marginTop: "10px", flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                Task Status
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: "1rem", fontWeight: "bold", color: colors.text }]}>
                                {item.taskStatus === true ? "Completed" : "Not Completed"}
                            </Text>
                        </View>
                        {item.taskStatus === true ? <Button style={[{ marginTop: "30px", marginBottom: "5px", marginLeft: "40px", marginRight: "40px" }]} type="solid" size={5} title={"Completed"} disabled>

                        </Button> : <Button style={[{ marginTop: "30px", marginBottom: "5px", marginLeft: "40px", marginRight: "40px" }]} type="outline" size={5} title={"Complete Task"}>

                        </Button>}

                    </View>
                </Card>)
            }
        </View>
    )

}
export default EventTasks;