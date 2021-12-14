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
    TouchableOpacity,ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import apiLink from '../shared/apiLink';


const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;
const CreateEvent = (props) => {

    const navigation = props.navigation;
    
    const _user = navigation.getParam('user');
    const _email = navigation.getParam('email');
    const _id = navigation.getParam('id');
    const _number = navigation.getParam('event');
    const { colors } = useTheme();

    const [data, setData] = useState({
        api:false,
        isValidEventName: false,
        isValidPId : true,
        isValidDesc:false,
        isValidPlanner: true,
        eventName: "",
        plannerId: _id,
        eventStatus: false,
        eventDesc: "",
        PlannerName: _user
    });
    
    const handleValidPlannerId = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidPId: true
            });
        } else {
            setData({
                ...data,
                isValidPId: false
            });
        }
    }

    
    const  eventNameChange = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            eventName: value,
            isValidEventName: true
        })
        else
        setData({
            ...data,
            eventName: value,
            isValidEventName: false
            
        })
    }
    const  eventPlannerId = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            isValidPId: value,
            isValidPId: true
        })
        else
        setData({
            ...data,
            isValidPId: value,
            isValidPId: false
        })
    }

    const  eventPlannerName = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            
            PlannerName: value,
            isValidPlanner: true
        })
        else
        setData({
            ...data,
            PlannerName: value,
            isValidPlanner: false
        })
    }
    

    const  eventDesc = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            eventDesc: value,
            isValidDesc: true
        })
        else
        setData({
            ...data,
            eventDesc: value,
            isValidDesc: false
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            
            <View style={styles.text_header}>
                <Text style={[styles.text_header,{margin:10}]}> Enter Event Information  </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <View style={{ marginBottom: 10 }}>
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
                            placeholder="Event Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => eventNameChange(val)}
                            // onEndEditing={(e) => handleValidEventName(e.nativeEvent.text)}
                            value={data.eventName}

                        />
                        {data.isValidEventName ?
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

                    {data.isValidEventName ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Event Name must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                </View>


                <View style={{ marginBottom: 10 }}>
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
                        value={data.PlannerName}
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            editable={false}
                            autoCapitalize="none"
                            onChangeText={(val) => eventPlannerName(val)}
                            // onEndEditing={(e) => handleValidPlannerName(e.nativeEvent.text)}
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

                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Planner ID</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="id-card-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                        editable={false}
                        value={data.plannerId}
                            placeholder="Your ID"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => eventPlannerId(val)}
                            // onEndEditing={(e) => handleValidPlannerId(e.nativeEvent.text)}
                        />
                        {data.isValidPId ?
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

                    {data.isValidPId ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Id Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Description</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="file-text-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Description"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => eventDesc(val)}
                            // onEndEditing={(e) => handleValidDesc(e.nativeEvent.text)}
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
            onPress={ async ()=>{
                setData({
                                ...data,api:true 
                            });

                const apiBody = { userName: `${_user}`, plannerId: `${_id}`, eventName: data.eventName,  eventStatus : false,  eventDesc: data.eventDesc   };
                            const apiData = await fetch(`${apiLink}/event`, {
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
                                alert("Event Created")
                            }
                            else
                            {
                                alert("Event Not created")
                            }
            }}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 5
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Create New Event</Text>
                </TouchableOpacity>

            </View>
            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }

            </Animatable.View>

        </View>
    )
}

export default CreateEvent;
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
    
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    textInput: {
        marginLeft:5,
        borderStyle:"solid",
        borderWidth: 1,
        borderColor:"#D3D3D3",
        
        borderRadius:10,
        
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
