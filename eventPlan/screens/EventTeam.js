import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem,ThemeProvider, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';

const theme = {
    Button: {
      titleStyle: {
        // color: 'blue'
      }
    }
  };
  
const EventTeam = (props) => {
    const navigation = props.navigation;

    const { colors } = useTheme();
    const [data, setData] = useState({
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
    }

    );
    return (
        <View>
                <Button style={[{ marginTop: "30px", marginBottom: "5px", marginLeft: "40px", marginRight: "40px" }]} type="outline" size={5} title={"Add New Member"}></Button>
                {
                    data.success == true && data.team.map((member, i) => <Card key={i} >
                        <View style={[{ backgroundColor: colors.border, borderRadius: "5px", padding: "5px", color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: colors.text }]}>
                                    {member.name}
                                </Text>
                            </View>
                            <View style={[styles.row,{ justifyContent:"space-evenly"}]}>
                            
                            <ThemeProvider theme={theme}>
                            
                            <Button   type="outline"  size={3} style={[{ marginTop: "20px", marginBottom: "5px" , width:"80px",color:"red"}]}  title={"Remove"}>
                                </Button>
                                
                                <Button  style={[{ marginTop: "20px", marginBottom:"5px" ,width:"80px" }]} type="outline" size={3} title={"View"}>
                                </Button>
                                </ThemeProvider>

                            </View>
                        </View>
                    </Card>
                    )

                }


        </View>
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
        color:"#ff5c5c",
      }
});