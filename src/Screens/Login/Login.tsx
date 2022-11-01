import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {googleSignInUser, signInUser} from '../../Reducers/authSlice';
import {useNavigation} from '@react-navigation/native';
import {rootState} from '../../Reducers/store';
import FbIcon from 'react-native-vector-icons/SimpleLineIcons';
import AppleIcon from 'react-native-vector-icons/AntDesign';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {
    LoginManager,
    GraphRequestManager,
    GraphRequest,
} from 'react-native-fbsdk';

interface textFields {
    email: string;
    password: string;
}

const Login = () => {
    const [data, setData] = useState<textFields>({email: '', password: ''});
    const [validate, SetValiadate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigation: any = useNavigation();

    const globalSpinner: any = useSelector<any>(
        (state: rootState) => state.user.globalLoading,
    );

    const Authenticate = () => {
        dispatch(signInUser(data));
    };

    useEffect(() => {
        GoogleSignin.configure();
    }, []);

    //Google Login
    const googleSignIn = async () => {
        dispatch(googleSignInUser());
        // try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     console.log('Google Login User Info', userInfo);
        //     //dispatch({});
        // } catch (error: any) {
        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //         console.log('user cancelled the login flow');
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //         console.log('operation (e.g. sign in) is in progress already');
        //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //         console.log(' play services not available or outdated');
        //     } else {
        //         console.log('some other error happened');
        //     }
        // }
    };
    //FB Login
    const fbLogin = (resCallback: any) => {
        LoginManager.logOut();
        return LoginManager.logInWithPermissions([
            'email',
            'public_profile',
        ]).then(
            (result: any) => {
                console.log('fb result==>>>>>>', result);
                if (
                    result.declinedPermissions &&
                    result.declinedPermissions.includes('email')
                ) {
                    resCallback({message: 'Email is required'});
                }
                if (result.isCancelled) {
                    console.log('error');
                } else {
                    const infoRequest = new GraphRequest(
                        '/me?fileds=email,name,picture, friend',
                        null,
                        resCallback,
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                }
            },
            function (error: string) {
                console.log('Login fail with error:' + error);
            },
        );
    };

    const onFbLogin = async () => {
        try {
            await fbLogin(_responseInfoCallBack);
        } catch (error: any) {
            console.log('error raised', error);
        }
    };

    const _responseInfoCallBack = async (error: any, result: any) => {
        if (error) {
            console.log('error top', error);
            return;
        } else {
            const userData = result;
            console.log('fb data+++++', userData);
        }
    };

    //Apple Login
    const appleLogin = async () => {
        const appleLoginResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        //   const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        //   if (credentialState === appleAuth.State.AUTHORIZED) {
        //   }
    };

    return (
        <>
            {globalSpinner ? (
                <>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                        <ActivityIndicator color="#0a3749" size="large" />
                    </View>
                </>
            ) : (
                <>
                    <View style={style.main}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={style.loginText}>Please Log-In</Text>
                            <Text style={style.sentence}>
                                Enter your email and password
                            </Text>
                        </View>

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
                                onChangeText={e =>
                                    setData({...data, password: e})
                                }
                                value={data.password}
                                //value={'123'}
                                placeholderTextColor="#1b94c4"
                                secureTextEntry={true}
                                placeholder="Password"
                            />
                            {validate && data.password === '' && (
                                <Text style={{marginLeft: 12, color: 'red'}}>
                                    Password required
                                </Text>
                            )}

                            <TouchableOpacity
                                style={style.button}
                                onPress={Authenticate}>
                                <Text style={style.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    //flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: '#000000',
                                        width: '30%',
                                        marginRight: 10,
                                        marginVertical: 20,
                                    }}></View>
                                <Text
                                    style={{fontSize: 20, fontWeight: 'bold'}}>
                                    Or
                                </Text>
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: '#000000',
                                        width: '30%',
                                        marginLeft: 10,
                                    }}></View>
                            </View>
                            <TouchableOpacity
                                onPress={onFbLogin}
                                style={style.button}>
                                <FbIcon
                                    name="social-facebook"
                                    size={22}
                                    color={'#0a3749'}
                                />
                                <Text style={style.buttonText}>
                                    Facebook Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={style.button}
                                onPress={googleSignIn}>
                                <FbIcon
                                    name="social-google"
                                    size={20}
                                    color={'#0a3749'}
                                />
                                <Text
                                    style={[
                                        style.buttonText,
                                        {paddingLeft: 5},
                                    ]}>
                                    Google Sign-up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={style.button}
                                onPress={appleLogin}>
                                <AppleIcon
                                    name="apple-o"
                                    size={22}
                                    color={'#0a3749'}
                                />
                                <Text
                                    style={[
                                        style.buttonText,
                                        {paddingLeft: 5},
                                    ]}>
                                    Apple Login
                                </Text>
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
                        <View></View>
                    </View>
                </>
            )}
        </>
    );
};

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
        borderColor: '#1b94c4',
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0a3749',
    },
    loginText: {
        fontSize: 45,
        color: '#1b94c4',
        fontFamily: 'Fasthand-Regular',
    },
    sentence: {
        marginLeft: 17,
        fontSize: 20,
        color: '#1b94c4',
        fontFamily: 'Poppins-Bold',
    },
    textInputHeading: {
        marginHorizontal: 10,
        color: '#1b94c4',
    },
});
export default Login;
