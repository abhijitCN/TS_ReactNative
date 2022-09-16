import {firebase} from '@react-native-firebase/auth';
import React, {useState, useContext} from 'react';
//import firestore from '@react-native-firebase/firestore';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    SafeAreaView,
    Alert,
} from 'react-native';

function Registration({navigation}) {
    const [data, setData] = useState<any>({
        name: '',
        email: '',
        phoneNo: '',
        password: '',
    });
    const [validate, SetValiadate] = useState<boolean>(false);

    const onPress = async () => {
        // Alert.alert('All ok');
        if (data.password && data.email && data.name && data.phoneNo) {
            console.log(
                '??',
                data.email,
                data.password,
                data.name,
                data.phoneNo,
            );
            try {
                const {user} = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.email, data.password);
                if (user) {
                    console.log('>>>>>', JSON.stringify(user.email));
                    // await firebase
                    //     .firestore()
                    //     .collection('users')
                    //     .doc(user.uid)
                    //     .set(data.displayName);
                }
            } catch (error) {
                console.log('error', error);
            }
            //Alert.alert('All ok');
        } else {
            SetValiadate(true);
        }
    };

    const signIn = async () => {
        if (data.name && data.email && data.Phone && data.password) {
            try {
                const user = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.email, data.password);
                if (user) {
                    Alert.alert(JSON.stringify(user));
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <View style={{flex: 1}}>
            <View style={{justifyContent: 'center', flex: 1}}>
                <Text style={style.loginText}>Registration</Text>
                <Text style={style.sentence}>Enter your details</Text>
                <View style={{}}>
                    <Text style={style.textInputHeading}>Name</Text>
                    <TextInput
                        style={[
                            style.input,
                            {
                                borderColor:
                                    validate && data.name === ''
                                        ? 'red'
                                        : '#1b94c4',
                            },
                        ]}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        onChangeText={e => setData({...data, name: e})}
                        placeholder="Name"
                        value={data.name}
                    />
                    {validate && data.name === '' && (
                        <Text style={{marginLeft: 12, color: 'red'}}>
                            Name required
                        </Text>
                    )}
                    <Text style={style.textInputHeading}>Email</Text>

                    <TextInput
                        style={[
                            style.input,
                            {
                                borderColor:
                                    validate && data.email === ''
                                        ? 'red'
                                        : '#1b94c4',
                            },
                        ]}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Email"
                        onChangeText={e => setData({...data, email: e})}
                    />
                    {validate && data.email === '' && (
                        <Text style={{marginLeft: 12, color: 'red'}}>
                            Email required
                        </Text>
                    )}

                    <Text style={style.textInputHeading}>Phone No</Text>

                    <TextInput
                        style={[
                            style.input,
                            {
                                borderColor:
                                    validate && data.phoneNo === ''
                                        ? 'red'
                                        : '#1b94c4',
                            },
                        ]}
                        placeholderTextColor="#1b94c4"
                        keyboardType="phone-pad"
                        placeholder="Phone No"
                        onChangeText={e => setData({...data, phoneNo: e})}
                    />
                    {validate && data.phoneNo === '' && (
                        <Text style={{marginLeft: 12, color: 'red'}}>
                            Phone No required
                        </Text>
                    )}

                    <Text style={style.textInputHeading}>Password</Text>
                    <TextInput
                        style={[
                            style.input,
                            {
                                borderColor:
                                    validate && data.password === ''
                                        ? 'red'
                                        : '#1b94c4',
                            },
                        ]}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="password"
                        onChangeText={e => setData({...data, password: e})}
                    />
                    {validate && data.password === '' && (
                        <Text style={{marginLeft: 12, color: 'red'}}>
                            Password required
                        </Text>
                    )}

                    <TouchableOpacity style={style.button} onPress={onPress}>
                        <Text style={style.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text
                            style={[
                                style.buttonText,
                                {alignSelf: 'center', marginTop: 12},
                            ]}>
                            Already Have Account? Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#eafafc',
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0a3749',
    },
    loginText: {
        marginLeft: 12,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#1b94c4',
    },
    sentence: {
        marginLeft: 12,
        marginBottom: 10,
        fontSize: 20,
        color: '#1b94c4',
    },
    textInputHeading: {
        marginHorizontal: 10,
        color: '#1b94c4',
    },
});

/**
 * name
 * email
 * password
 * mobile
 *
 */

export default Registration;
