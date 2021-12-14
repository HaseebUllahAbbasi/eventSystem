import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
    ActivityIndicator
} from 'react-native';
import apiLink from '../shared/apiLink'
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;
const InviteGuest = (props) => {
    const navigation = props.navigation;


    
    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('event');
    const _eventName = navigation.getParam('eventName');
    const _eventId = navigation.getParam('eventId');
    const _eventAdmin = navigation.getParam('eventAdmin');
    const _AdminName = navigation.getParam('adminName');


    const data_1 = { eventName: "Dinner &  Party", eventPlanner: "Faisal Nisar" }
    const { colors } = useTheme();

    const [data, setData] = useState({
        api: false,
        validData: true,
        eventName: _eventName,
        eventPlanner: _eventAdmin,
        username: "",
        number: "",
        isValidNumber: false
    });
    const handleValidNumber = (val) => {
        if (val.trim().length > 10) {
            setData({
                ...data,
                number: val,
                isValidNumber: true
            })
        }
        else {

            setData({
                ...data,
                number: val,
                isValidNumber: false
            })
        }
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    useEffect(()=>
    {
    console.log("in send")


    },[])
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
            <View style={styles.text_header}>
                <Text style={[styles.text_header, { margin: 10 }]}>  Request Information  </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Event Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="group"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput

                            editable={false}
                            placeholder="Event Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={_eventName}
                            autoCapitalize="none"
                        // onChangeText={(val) => textInputChange(val)}

                        // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}

                        />
                        {data.validData ?
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

                </View>


                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Event Planner</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            editable={false}
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            // onChangeText={(val) => textInputChange(val)}
                            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                            value={_AdminName}
                        />
                        {data.validData ?
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
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Member Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            value={data.username}
                            placeholder="UserName"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
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

                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Name Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>
                <View>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Number</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="phone"
                                color={colors.white}
                                size={20}
                            />
                            <TextInput
                        value={data.number}

                                placeholder="Your Number"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidNumber(val)}
                            />
                            {data.isValidNumber ?
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

                        {data.isValidNumber ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>Number must be 11 characters </Text>
                            </Animatable.View>
                        }
                    </View>



                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={
                            async () => {
                                if(data.isValidNumber == false || data.validData == false)
                                {
                                    alert("please enter Complete Data")
                                    return;
                                }

                                setData({
                                    ...data, api: true
                                });
                                const apiBody = { eventId: `${_eventId}`, plannerId: `${_eventAdmin}`, guestName: `${data.username}`, guestNumber: `${data.number}` };
                                const apiData = await fetch(`${apiLink}/addGuest`, {
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
                                    alert("Guest Invited")
                                }
                                else {
                                    alert("Not Invited")
                                }
                            }
                        }
                        // onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 5
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Send Request</Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>

        </View>
    )
}

export default InviteGuest;
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
        marginLeft: 5,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#D3D3D3",
        borderRadius: 10,
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
