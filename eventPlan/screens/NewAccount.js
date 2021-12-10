import React, { useState } from 'react';
import {
    Button,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import apiLink from '../shared/apiLink';

const NewAccount = (props) => {
    const navigation = props.navigation;
    const [data, setData] = React.useState({
        api: false,
        username: '',
        password: '',
        email: '',
        number: '',
        secureTextEntry: true,

        isValidNumber: false,
        isValidUser: false,
        isValidPassword: false,
        isValidEmail: false,
    });

    const { colors } = useTheme();

    // const { signIn } = React.useContext(AuthContext);


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


    const handleValidUser = (val) => {
        if (val.trim().length() > 4) {
            setData({
                ...data,
                username: data.username,
                isValidUser: true
            })
        }
        else {

            setData({
                ...data,
                username: data.username,
                isValidUser: false
            })
        }
    }
    const handleValidEmail = (val) => {
        if (val.trim().length() > 8) {
            setData({
                ...data,
                email: data.email,
                isValidEmail: true
            })
        }
        else {

            setData({
                ...data,
                email: data.email,
                isValidEmail: false
            })
        }
    }

    const handleValidPassword = (val) => {
        if (val.trim().length() > 7) {
            setData({
                ...data,
                password: data.password,
                isValidPassword: true
            })
        }
        else {

            setData({
                ...data,
                username: data.username,
                isValidPassword: false
            })
        }
    }
    const handleValidNumber = (val) => {
        if (val.trim().length() > 10) {
            setData({
                ...data,
                number: data.number,
                isValidNumber: true
            })
        }
        else {

            setData({
                ...data,
                number: data.number,
                isValidNumber: false
            })
        }
    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome To Event Plan </Text>
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
                    }]}>Username</Text>
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
                            onChangeText={(val) => handleValidUser(val)}
                        />
                        {data.isValidUser ?
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

                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleValidEmail(val)}
                        />
                        {data.isValidEmail ?
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

                    {data.isValidEmail ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Email Should Be Valid.</Text>
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



                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handleValidPassword(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                {
                    data.api && <ActivityIndicator color="#0000ff"   style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
                }
                <View style={styles.button}>
                    <TouchableOpacity

                        onPress={ async() => {
                            setData({...data,api: true})
                            const apiBody = { name: data.username, password: data.password, email: data.email, number: data.number };
                            const apiData = await fetch(`${apiLink}/person`, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(apiBody),
                            });
                            const jsonData = await apiData.json();
                            setData({...data,api: false})
                            if(jsonData.success)
                            {
                                alert("New Account Created")
                            }
                            else{
                                alert("Not Created")

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
                        }]}>Create New Account</Text>
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </View>
    );
};

export default NewAccount;

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
        marginLeft: 10,
        marginRight: 10,

        height: '200%',
        borderWidth: 1,
        borderColor: "#8b929b",
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