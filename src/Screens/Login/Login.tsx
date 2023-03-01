import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    Alert,
    Dimensions,
    Pressable,
} from 'react-native';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    withDelay,
    runOnJS,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import styles from './styles';
import {UserContext} from '../../Context/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {
    googleSignInUser,
    signInUser,
    FacebookLogin,
} from '../../Reducers/authSlice';
import {useNavigation} from '@react-navigation/native';
import {rootState} from '../../Reducers/store';
import FbIcon from 'react-native-vector-icons/SimpleLineIcons';
import AppleIcon from 'react-native-vector-icons/AntDesign';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';
import {
    LoginButton,
    AccessToken,
    Profile,
    LoginManager,
} from 'react-native-fbsdk-next';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import Button from '../../Components/Button';
import {TextInputs} from '../../Components';

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
        //     const Info: any = await GoogleSignin.signIn().then(
        //         (userInfo: any) => {
        //             console.log('userInfo all', userInfo);
        //             const emailArray: any = [];
        //              firestore()
        //                 .collection('People')
        //                 .get()
        //                 .then(querySnapshot => {
        //                     querySnapshot.forEach(documentSnapshot => {
        //                         var {email, ImageUrl} = Object(documentSnapshot.data());
        //                         //console.log('Keys Email ?? ', key.email);
        //                         console.log('user.email **', userInfo.user.email);
        //                         // console.log(
        //                         //     'User Email True ?? ',
        //                         //     key.email === user.email,
        //                         // );
        //                         emailArray.push({
        //                             email: email,
        //                             ImageUrl: ImageUrl,
        //                         });
        //                         emailArray.filter((item: any) => {
        //                             if (item.email === userInfo.user.email) {
        //                                 //console.log('FIND', key);
        //                                 //setUserData(key);
        //                                 //setAvatar(key.ImageUrl);
        //                                 console.log(
        //                                     'Unickly FIND **',
        //                                     item.email === userInfo.user.email,
        //                                 );
        //                                 console.log('Unickly FIND Image**', item.ImageUrl);
        //                             }
        //                         });
        //                         console.log('email Array', emailArray);
        //                         // if (key.email === user.email) {
        //                         //     //console.log('FIND', key);
        //                         //     setUserData(key);
        //                         //     setAvatar(key.ImageUrl);
        //                         //     //console.log('Unickly FIND **', avatar);
        //                         // }
        //                     });
        //                 });
        //         },
        //     );
        //     //console.log('user Info', userInfo.user.photo);
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
    const onFbLogin = async () => {
        try {
            await fbLogin(_responseInfoCallBack);
        } catch (error: any) {
            console.log('error raised', error);
        }
    };
    const fbLogin2 = () => {
        dispatch(FacebookLogin());
        // AccessToken.getCurrentAccessToken().then(data => {
        //     console.log('ne FB data ++  ', data);
        // });
        // Profile.getCurrentProfile().then(function (currentProfile) {
        //     if (currentProfile) {
        //         console.log(
        //             'The current logged user is: ' +
        //                 currentProfile.name +
        //                 '. His profile id is: ' +
        //                 currentProfile.userID,
        //         );
        //     }
        // });
    };
    const FBLogin3 = () => {
        Profile.getCurrentProfile().then(function (currentProfile) {
            if (currentProfile) {
                console.log(
                    'The current logged user is: ' +
                        currentProfile.name +
                        '. His profile id is: ' +
                        currentProfile.userID,
                );
            }
        });
    };
    // const fbLogin = (resCallback: any) => {
    //     LoginManager.logOut();
    //     return LoginManager.logInWithPermissions([
    //         'email',
    //         'public_profile',
    //     ]).then(
    //         (result: any) => {
    //             console.log('fb result==>>>>>>', result);
    //             if (
    //                 result.declinedPermissions &&
    //                 result.declinedPermissions.includes('email')
    //             ) {
    //                 resCallback({message: 'Email is required'});
    //             }
    //             if (result.isCancelled) {
    //                 console.log('error');
    //             } else {
    //                 const infoRequest = new GraphRequest(
    //                     '/me?fileds=email,name,picture, friend',
    //                     null,
    //                     resCallback,
    //                 );
    //                 new GraphRequestManager().addRequest(infoRequest).start();
    //             }
    //         },
    //         function (error: string) {
    //             console.log('Login fail with error:' + error);
    //         },
    //     );
    // };

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

    const alert = () => {
        Alert.alert('AAA');
    };
    const {height, width} = Dimensions.get('window');
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height / 2, 0],
        );
        return {
            transform: [
                {translateY: withTiming(interpolation, {duration: 1000})},
            ],
        };
    });

    const buttonsAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [250, 0],
        );
        return {
            opacity: withTiming(imagePosition.value, {duration: 500}),
            transform: [
                {translateY: withTiming(interpolation, {duration: 1000})},
            ],
        };
    });

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [180, 360],
        );
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {
                duration: 800,
            }),
            transform: [
                {rotate: withTiming(interpolation + 'deg', {duration: 1000})},
            ],
        };
    });

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                imagePosition.value === 0
                    ? withDelay(400, withTiming(1, {duration: 800}))
                    : withTiming(0, {duration: 300}),
        };
    });

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: formButtonScale.value}],
        };
    });

    const loginHandler = () => {
        imagePosition.value = 0;
        if (isRegistering) {
            runOnJS(setIsRegistering)(false);
        }
    };

    const registerHandler = () => {
        imagePosition.value = 0;
        if (!isRegistering) {
            runOnJS(setIsRegistering)(true);
        }
    };
    return (
        // <>
        //     {globalSpinner ? (
        //         <>
        //             <View
        //                 style={{
        //                     alignItems: 'center',
        //                     justifyContent: 'center',
        //                     flex: 1,
        //                 }}>
        //                 <ActivityIndicator color="#0a3749" size="large" />
        //             </View>
        //         </>
        //     ) : (
        //         <>
        //             <View style={style.main}>
        //                 <View
        //                     style={{
        //                         alignItems: 'center',
        //                         justifyContent: 'center',
        //                     }}>
        //                     <Text style={style.loginText}>Please Log-In</Text>
        //                     <Text style={style.sentence}>
        //                         Enter your email and password
        //                     </Text>
        //                 </View>

        //                 <View style={{}}>
        //                     <Text style={style.textInputHeading}>Email</Text>
        //                     <TextInput
        //                         style={[
        //                             style.input,
        //                             {
        //                                 borderColor:
        //                                     validate && data.email === ''
        //                                         ? 'red'
        //                                         : '#1b94c4',
        //                             },
        //                         ]}
        //                         onChangeText={e => setData({...data, email: e})}
        //                         value={data.email}
        //                         placeholderTextColor="#1b94c4"
        //                         keyboardType="email-address"
        //                         //keyboardAppearance="light"
        //                         placeholder="Email"
        //                     />
        //                     {validate && data.email === '' && (
        //                         <Text style={{marginLeft: 12, color: 'red'}}>
        //                             Email required
        //                         </Text>
        //                     )}
        //                     <Text style={style.textInputHeading}>Password</Text>
        //                     {/* <TextInput
        //                         style={[
        //                             style.input,
        //                             {
        //                                 borderColor:
        //                                     validate && data.password === ''
        //                                         ? 'red'
        //                                         : '#1b94c4',
        //                             },
        //                         ]}
        //                         onChangeText={e =>
        //                             setData({...data, password: e})
        //                         }
        //                         value={data.password}
        //                         //value={'123'}
        //                         placeholderTextColor="#1b94c4"
        //                         secureTextEntry={true}
        //                         placeholder="Password"
        //                     /> */}
        //                     <TextInputs
        //                         placeholder="enter Password"
        //                         placeholderTextColor="#1b94c4"
        //                         secureTextEntry={true}
        //                         onChangeText={e =>
        //                             setData({...data, password: e})
        //                         }
        //                         btnStyle={{
        //                             borderColor:
        //                                 validate && data.password === ''
        //                                     ? 'red'
        //                                     : '#1b94c4',
        //                         }}
        //                     />
        //                     {validate && data.password === '' && (
        //                         <Text style={{marginLeft: 12, color: 'red'}}>
        //                             Password required
        //                         </Text>
        //                     )}
        //                     <Button press={Authenticate} btnText="Submit" />
        //                     {/* <TouchableOpacity
        //                         style={style.button}
        //                         onPress={Authenticate}>
        //                         <Text style={style.buttonText}>Submit</Text>
        //                     </TouchableOpacity> */}
        //                     {/* <Button press={alert} btnText="component BTN" /> */}
        //                     <View
        //                         style={{
        //                             //flex: 1,
        //                             alignItems: 'center',
        //                             justifyContent: 'center',
        //                             flexDirection: 'row',
        //                         }}>
        //                         <View
        //                             style={{
        //                                 height: 1,
        //                                 backgroundColor: '#000000',
        //                                 width: '30%',
        //                                 marginRight: 10,
        //                                 marginVertical: 20,
        //                             }}></View>
        //                         <Text
        //                             style={{fontSize: 20, fontWeight: 'bold'}}>
        //                             Or
        //                         </Text>
        //                         <View
        //                             style={{
        //                                 height: 1,
        //                                 backgroundColor: '#000000',
        //                                 width: '30%',
        //                                 marginLeft: 10,
        //                             }}></View>
        //                     </View>
        //                     <TouchableOpacity
        //                         onPress={fbLogin2}
        //                         style={style.button}>
        //                         <FbIcon
        //                             name="social-facebook"
        //                             size={22}
        //                             color={'#0a3749'}
        //                         />
        //                         <Text style={style.buttonText}>
        //                             Facebook Login
        //                         </Text>
        //                     </TouchableOpacity>
        //                     {/* <LoginButton
        //                         style={{
        //                             alignItems: 'center',
        //                             backgroundColor: '#95d6f0',
        //                             padding: 10,
        //                             marginHorizontal: 10,
        //                             borderRadius: 25,
        //                             marginVertical: 3,

        //                             height: 40,
        //                         }}
        //                         onLoginFinished={(error, result) => {
        //                             if (error) {
        //                                 console.log(
        //                                     'login has error: ' + result,
        //                                 );
        //                             } else if (result.isCancelled) {
        //                                 console.log('login is cancelled.');
        //                             } else {
        //                                 // AccessToken.getCurrentAccessToken().then(
        //                                 //     data => {
        //                                 //         console.log(
        //                                 //             'ne FB data ++  ',
        //                                 //             data,
        //                                 //         );
        //                                 //     },
        //                                 // );
        //                                 // const ProfileDetails =
        //                                 //     Profile.getCurrentProfile().then(
        //                                 //         function (currentProfile) {
        //                                 //             if (currentProfile) {
        //                                 //                 console.log(
        //                                 //                     currentProfile,
        //                                 //                 );
        //                                 //             }
        //                                 //         },
        //                                 //     );
        //                                 // console.log(ProfileDetails);
        //                                 fbLogin2();
        //                                 FBLogin3();
        //                             }
        //                         }}
        //                         onLogoutFinished={() => console.log('logout.')}
        //                     /> */}
        //                     <TouchableOpacity
        //                         style={style.button}
        //                         onPress={googleSignIn}>
        //                         <FbIcon
        //                             name="social-google"
        //                             size={20}
        //                             color={'#0a3749'}
        //                         />
        //                         <Text
        //                             style={[
        //                                 style.buttonText,
        //                                 {paddingLeft: 5},
        //                             ]}>
        //                             Google Login
        //                         </Text>
        //                     </TouchableOpacity>
        //                     <TouchableOpacity
        //                         style={style.button}
        //                         onPress={appleLogin}>
        //                         <AppleIcon
        //                             name="apple-o"
        //                             size={22}
        //                             color={'#0a3749'}
        //                         />
        //                         <Text
        //                             style={[
        //                                 style.buttonText,
        //                                 {paddingLeft: 5},
        //                             ]}>
        //                             Apple Login
        //                         </Text>
        //                     </TouchableOpacity>
        //                     <TouchableOpacity
        //                         onPress={() => navigation.navigate('SignUp')}>
        //                         <Text
        //                             style={[
        //                                 style.buttonText,
        //                                 {alignSelf: 'center', marginTop: 12},
        //                             ]}>
        //                             Don't Have Account ? Sign Up
        //                         </Text>
        //                     </TouchableOpacity>
        //                 </View>
        //                 <View></View>
        //             </View>
        //         </>
        //     )}
        // </>
        <Animated.View style={styles.container}>
            <Animated.View
                style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                <Svg height={height + 100} width={width}>
                    <ClipPath id="clipPathId">
                        <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                    </ClipPath>
                    <Image
                        href={require('../../Assets/login-background.jpg')}
                        width={width + 100}
                        height={height + 100}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#clipPathId)"
                    />
                </Svg>
                <Animated.View
                    style={[
                        styles.closeButtonContainer,
                        closeButtonContainerStyle,
                    ]}>
                    <Text onPress={() => (imagePosition.value = 1)}>X</Text>
                </Animated.View>
            </Animated.View>
            <View style={styles.bottomContainer}>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={styles.button} onPress={loginHandler}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={styles.button} onPress={registerHandler}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View
                    style={[styles.formInputContainer, formAnimatedStyle]}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    {isRegistering && (
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                    )}
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    <Animated.View
                        style={[styles.formButton, formButtonAnimatedStyle]}>
                        <Pressable
                            onPress={() =>
                                (formButtonScale.value = withSequence(
                                    withSpring(1.5),
                                    withSpring(1),
                                ))
                            }>
                            <Text style={styles.buttonText}>
                                {isRegistering ? 'REGISTER' : 'LOG IN'}
                            </Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </Animated.View>
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
