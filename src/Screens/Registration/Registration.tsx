import React, {useState, useContext} from 'react';
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
    const onPress = () => {
        if (
            data.email != '' &&
            data.name != '' &&
            data.phoneNo != '' &&
            data.password != ''
        ) {
            Alert.alert('All ok');
        } else if (
            data.email === '' &&
            data.name === '' &&
            data.phoneNo === ''
        ) {
            Alert.alert('Password Requre');
        } else if (
            data.email === '' &&
            data.name === '' &&
            data.password === ''
        ) {
            Alert.alert('All fields Requre');
        } else if (
            data.email === '' &&
            data.phoneNo === '' &&
            data.password === ''
        ) {
            Alert.alert('All fields Requre');
        } else if (
            data.name === '' &&
            data.phoneNo === '' &&
            data.password === ''
        ) {
            Alert.alert('All fields Requre');
        } else if (
            data.email === '' &&
            data.name === '' &&
            data.phoneNo === '' &&
            data.password === ''
        ) {
            Alert.alert('All Fields');
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
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        //keyboardAppearance="light"
                        placeholder="Name"
                    />
                    <Text style={style.textInputHeading}>Email</Text>

                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Email"
                        //keyboardAppearance="light"
                    />
                    <Text style={style.textInputHeading}>Phone No</Text>

                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Phone No"
                        //keyboardAppearance="light"
                    />
                    <Text style={style.textInputHeading}>Password</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="password"
                        //keyboardAppearance="light"
                    />
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
        // alignItems: 'center',
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#eafafc',
        borderColor: '#1b94c4',
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        //width: '90%',
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
