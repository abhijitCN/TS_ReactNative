import React, {useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../Context/AuthContext';

const Login = ({navigation}) => {
    const {signIn} = useContext<any>(UserContext);
    const credential = {email: '123', password: '123'};
    const [data, setData] = useState<any>({email: '', password: ''});
    const onPress = () => {
        if (
            credential.email === data.email &&
            credential.password === data.password
        ) {
            Toast.show({
                type: 'success',
                text1: 'Logout Successfully',
                position: 'top',
            });
            signIn(data);
        } else {
            if (!data.email || !data.password) {
                console.log('Required All Felds');
            } else if (credential.email !== data.email) {
                console.log('Wrong Email');
            } else if (credential.password !== data.password) {
                console.log('Wrong Password');
            }
        }
    };
    return (
        <>
            <View style={style.main}>
                <Text style={style.loginText}>Log In</Text>
                <Text style={style.sentence}>
                    Enter your email and password
                </Text>
                <View style={{}}>
                    <Text style={style.textInputHeading}>Email</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={e => setData({...data, email: e})}
                        value={data.email}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        //keyboardAppearance="light"
                        placeholder="Email"
                    />
                    <Text style={style.textInputHeading}>Password</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={e => setData({...data, password: e})}
                        value={data.password}
                        //value={'123'}
                        placeholderTextColor="#1b94c4"
                        //keyboardType="default"
                        //keyboardAppearance="light"
                        placeholder="Password"
                    />
                    <TouchableOpacity style={style.button} onPress={onPress}>
                        <Text style={style.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}>
                        <Text
                            style={[
                                style.buttonText,
                                {alignSelf: 'center', marginTop: 12},
                            ]}>
                            Don't Have Account ? Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Toast />
                </View>
            </View>
        </>
    );
};
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
        fontWeight: '500',
        color: '#1b94c4',
    },
    sentence: {
        marginLeft: 12,
        fontSize: 20,
        color: '#1b94c4',
    },
    textInputHeading: {
        marginHorizontal: 10,
        color: '#1b94c4',
    },
});
export default Login;
