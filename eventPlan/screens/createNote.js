import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Button,
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;
const CreateNote = (props) => {
    const navigation = props.navigation;
    const { colors } = useTheme();


    // const [data, setData] = useState({
    //     eventId: "Party_1",
    //     plannerId: "61a4e0045f599ed12becaaee",
    //     Note: "This is Note"
    // });
    const handleEventId = (value)=>
    {
        if(value.trim().length>4)
        {
            setData({
                ...data,
                eventID: value,
                isValidEventId : true
            })
        }
        else
        {
            
            setData({
                ...data,
                eventID: value,
                isValidEventId : false
            })
        }
    }


    const handlePlannerId = (value)=>
    {
        if(value.trim().length>4)
        {
            setData({
                ...data,
                plannerId: value,
                isValidPlanner : true
            })
        }
        else
        {
            
            setData({
                ...data,
                plannerId: value,
                isValidPlanner : false
            })
        }
    }

    const handleDesc = (value)=>
    {
        if(value.trim().length>4)
        {
            setData({
                ...data,
                eventDesc: value,
                isValidDesc : true
            })
        }
        else
        {
            
            setData({
                ...data,
                eventDesc: value,
                isValidDesc : false
            })
        }
    }
    
    const [data, setData] = useState({
        isValidEventId: false,
        isValidPlanner: false,
        isValidDesc : false,
        eventID: "",
        plannerId: "",
        eventDesc: "",
    });
    

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            <View style={styles.text_header}>
                <Text style={[styles.text_header, { margin: "10px" }]}> Create New Note  </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <View style={{ marginBottom: "1rem" }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Event Id</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="group"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Event Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleEventId(val)}
                        />
                        {data.isValidEventId ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    {data.isValidEventId ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Event ID Should be Valid.</Text>
                        </Animatable.View>
                    }
                </View>


                <View style={{ marginBottom: "1rem" }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>
                        Your Id
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePlannerId(val)}
                        />
                        {data.isValidPlanner ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    {data.isValidPlanner ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Your Id Must be Valid.</Text>
                        </Animatable.View>
                    }
                </View>

                <View style={{ marginBottom: "1rem" }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Note </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="file-text-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Description"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleDesc(val)}
                        />
                        {data.isValidDesc ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    {data.isValidDesc ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Description Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 5
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Create New Note</Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>

        </View>
    )
}
export default CreateNote;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        marginLeft:"8px",
        border:"1px solid #D3D3D3	",
        borderRadius:"10px",
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
