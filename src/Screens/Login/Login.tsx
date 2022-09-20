import React, {useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../Context/AuthContext';
import {firebase} from '@react-native-firebase/auth';
import {verify} from '../../Reducers/verificationSlice';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../../Reducers/authSlice';

const Login = ({navigation}) => {
    const {signIn} = useContext<any>(UserContext);
    const credential = {email: '123', password: '123'};
    const [data, setData] = useState<any>({email: '', password: ''});
    const [validate, SetValiadate] = useState<boolean>(false);
    const dispatch = useDispatch();

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

    const FBLogin = async () => {
        if (data.password && data.email) {
            console.log('??', data.email, data.password);
            try {
                const user = await firebase
                    .auth()
                    .signInWithEmailAndPassword(data.email, data.password);
                if (user.user.providerData[0].email) {
                    dispatch(
                        signUpUser({email: user.user.providerData[0].email}),
                    );
                    console.log('USER EMAIL', user.user.providerData[0].email);
                    Alert.alert('Login Successfully');
                    dispatch(verify(true));
                }
            } catch (error) {
                console.log('error', error);
                dispatch(verify(false));
            }
        } else {
            SetValiadate(true);
        }
    };

    return (
        <View style={style.main}>
            <Text style={style.loginText}>Log In</Text>
            <Text style={style.sentence}>Enter your email and password</Text>
            <View style={{}}>
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
                    onChangeText={e => setData({...data, email: e})}
                    value={data.email}
                    placeholderTextColor="#1b94c4"
                    keyboardType="email-address"
                    //keyboardAppearance="light"
                    placeholder="Email"
                />
                {validate && data.email === '' && (
                    <Text style={{marginLeft: 12, color: 'red'}}>
                        Email required
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
                    onChangeText={e => setData({...data, password: e})}
                    value={data.password}
                    //value={'123'}
                    placeholderTextColor="#1b94c4"
                    //keyboardType="default"
                    //keyboardAppearance="light"
                    placeholder="Password"
                />
                {validate && data.password === '' && (
                    <Text style={{marginLeft: 12, color: 'red'}}>
                        Password required
                    </Text>
                )}
                <TouchableOpacity style={style.button} onPress={FBLogin}>
                    <Text style={style.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
