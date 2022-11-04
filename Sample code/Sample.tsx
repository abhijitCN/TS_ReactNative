import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    Button,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {db} from '../../Constant/Firebase';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';

function Sample({navigation}) {
    // const {user, signOut} = useContext<any>(UserContext);
    const [animate, setAnimate] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);
    const user = useSelector(state => state.user);
    // const onPress = () => {
    //   signOut();
    // };
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false);
        }, 2000);
    });
    const getProfileData = async () => {
        const productList: any[] = [];
        console.log('called');
        await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot);
                // querySnapshot.forEach(documentSnapshot => {
                //     const {name, phoneNo, email} = documentSnapshot.data();
                //     productList.push({
                //         name: name,
                //         phoneNo: phoneNo,
                //         email: email,
                //     });
                //     console.log(
                //         'User ID: ',
                //         name,
                //         phoneNo,
                //         email,
                //         //documentSnapshot.id,
                //         //documentSnapshot.data(),
                //     );
                // });
            });
        setPosts(productList);
        console.log('GetValue', posts);
    };
    // useEffect(() => {
    //     console.log('user data');
    //     getProfileData();
    // }, []);
    const lapsList = () => {
        return posts.map((data: any) => {
            return (
                <View>
                    <Text style={style.text}>{data.name}</Text>
                    <Text style={style.text}>{data.email}</Text>
                    <Text style={style.text}>{data.phoneNo}</Text>
                </View>
            );
        });
    };
    // Storing User Data
    const [userDoc, setUserDoc] = useState(null);
    // Update Text
    const [text, setText] = useState('');

    // MARK: CRUD Functions
    const CreateDoc = () => {
        // MARK: Creating New Doc in Firebase
        // Before that enable Firebase in Firebase Console
        const myDoc = doc(db, 'MyCollection', 'MyDocument');

        // Your Document Goes Here
        const docData = {
            name: 'iJustine',
            bio: 'YouTuber',
        };

        setDoc(myDoc, docData)
            // Handling Promises
            .then(() => {
                // MARK: Success
                Alert.alert('Document Created!');
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };
    //Mark: READ FUNCTION
    const Read = () => {
        // MARK: Reading Doc
        // You can read what ever document by changing the collection and document path here
        const myDoc = doc(db, 'MyCollection', 'MyDocument');
        getDoc(myDoc)
            // Handling Promises
            .then(snapshot => {
                // MARK: Success
                if (snapshot.exists) {
                    setUserDoc(snapshot.data());
                    Alert.alert('Doc Found', snapshot.data());
                } else {
                    Alert.alert('No Doc Found');
                }
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };
    //Mark: UPDATE FUNCTION
    const Update = (value, merge) => {
        // MARK: Updating Doc
        const myDoc = doc(db, 'MyCollection', 'MyDocument');
        // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
        setDoc(myDoc, value, {merge: merge})
            // Handling Promises
            .then(() => {
                // MARK: Success
                Alert.alert('Updated Successfully!');
                setText('');
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };
    //Mark: DELETE FUNCTION

    const Delete = () => {
        // MARK: Deleting Doc
        const myDoc = doc(db, 'MyCollection', 'MyDocument');

        deleteDoc(myDoc)
            // Handling Promises
            .then(() => {
                // MARK: Success
                Alert.alert('Deleted Successfully!');
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };

    const App = () => {
        const verifi = useSelector((state: rootState) => state.verification);
        const isValid = AsyncStorage.getItem('userToken');
        //console.log('isValid?????????????', isValid);
        useEffect(() => {
            console.log('print', verifi.logUser);
        }, [verifi]);
        useEffect(() => getUser(), []);

        const getUser = async () => {
            try {
                const value = await AsyncStorage.getItem('userToken');
                console.log('#######', value);
                if (value != null) {
                    //setUser(JSON.parse(value));
                    console.log('?????', value);
                }
                console.log('=====', value);
            } catch (error) {
                console.log(error);
            }
        };
        const isAuthenticate = !!verifi.logUser;
        console.log('NOT NOT isAuthenticate', isAuthenticate);

        return (
            <>{isAuthenticate ? <AuthNavigator /> : <MainStackNavigation />}</>
        );
    };
    const pickImageAndUpload = (path, imageName) => {
        console.log('pick Image And Upload');
        launchImageLibrary({quality: 0.5}, fileobj => {
            let reference = storage().ref().child(`/userprofile/${Date.now()}`);
            let task = reference.putFile(path);
            //const storage = getStorage();
            //const mountainsRef = ref(storage, fileobj.assets[0].uri);
            console.log('click on image ?? ', fileobj.assets[0].uri);
            //let selectedImage = fileobj.assets[0].uri
            //setEditValue({Image:selectedImage})
            task.then(() => {
                console.log('Image uploaded to the bucket!');
                //console.log("selectedImage ?? >> ",editValue.Image)
            }).catch(e => console.log('uploading image error => ', e));
            // const uploadTask = storage
            //     .ref()
            //     .child(`/userprofile/${Date.now()}`)
            //     .putFile(mountainsRef);
            // uploadTask.on(
            //     'state_changed',
            //     snapshot => {
            //         var progress =
            //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //         if (progress == 100) console.log('image uploaded');
            //     },
            //     error => {
            //         console.log('error uploading image');
            //     },
            //     // () => {
            //     //     uploadTask.snapshot.ref
            //     //         .getDownloadURL()
            //     //         .then(downloadURL => {
            //     //             Image(downloadURL);
            //     //         });
            //     // },
            // );
        });
    };
    pickImageAndUpload(
        'data/user/0/com.tsreactnative/cache/rn_image_picker_lib_temp_0a9c0e6f-dcf9-4890-afd7-3c0345c25610.jpg',
        'ab',
    );

    // Import: Packages
    import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
    import axios from 'axios';

    // AsyncThunk: getUserDetails
    export const getUserDetails = createAsyncThunk(
        'userDetails/getUserDetails',
        async () => {
            try {
                const apiUrl = process.env.REACT_APP_URL;

                var config = {
                    method: 'get',
                    url: `${apiUrl}/claimSet?UserName=${state.loginDetails.username}&Password=${state.loginDetails.password}`,
                    headers: {
                        accept: 'application/json',
                    },
                };

                const response = await axios(config);
                const data = await response.data;
                return data;
            } catch (error) {
                console.log(error);
            }
        },
    );

    // Slice: userDetailsSlice
    export const userDetailsSlice = createSlice({
        name: 'userDetails',
        initialState: {
            loginDetails: {
                username: '',
                password: '',
            },
            details: [],
            status: null,
        },
        reducers: {
            addUsername: (state, {payload}) => {
                state.loginDetails.username = payload;
            },
            addPassword: (state, {payload}) => {
                state.loginDetails.password = payload;
            },
        },
        extraReducers: {
            [getUserDetails.pending]: (state, action) => {
                state.status = 'loading';
            },
            [getUserDetails.fulfilled]: (state, {payload}) => {
                state.details = payload;
                state.status = 'success';
            },
            [getUserDetails.rejected]: (state, action) => {
                state.status = 'failed';
            },
        },
    });

    // Actions: addUsername, addPassword
    export const {addUsername, addPassword} = userDetailsSlice.actions;

    // Reducer: userDetailsSlice.reducer
    export default userDetailsSlice.reducer;
    return (
        <View style={style.main}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25}}>
                    Home
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        padding: 5,
                    }}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../../Assets/avatar.jpeg')}
                    />
                </TouchableOpacity>
            </View>
            {/* {animate === true ? (
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
            ) : ( */}
            <View
                style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Hello,{user.email}
                </Text>
                <Button title="Create New Doc" onPress={CreateDoc}></Button>
            </View>
            <Button title="Read Doc" onPress={Read}></Button>
            {userDoc != null && <Text>Bio: {userDoc.bio}</Text>}
            <TextInput
                style={{
                    width: '95%',
                    fontSize: 18,
                    padding: 12,
                    borderColor: 'gray',
                    borderWidth: 0.2,
                    borderRadius: 10,
                    marginVertical: 20,
                }}
                placeholder="Type Here"
                onChangeText={text => {
                    setText(text);
                }}
                value={text}></TextInput>

            <Button
                title="Update Doc"
                onPress={() => {
                    Update(
                        {
                            bio: text,
                        },
                        true,
                    );
                }}
                disabled={text == ''}></Button>
            <Button title="Delete Doc" onPress={Delete}></Button>
            {/* )} */}
        </View>
    );
}
const style = StyleSheet.create({
    main: {
        //alignItems: 'center',
        flex: 1,
        //justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        width: 100,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0a3749',
    },
    buttonContainer: {
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        marginHorizontal: 10,
    },
});
export default Sample;
//Password change
const reauthenticate = () => {
    if (editValue.currentPassword) {
        var user: any = firebase.auth().currentUser;
        console.log('reauthenticate function call', user?.email);
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email,
            editValue.currentPassword,
        );
        console.log('cred ?? ', cred);
        return user.reauthenticateWithCredential(cred);
    } else {
        SetValiadate(true);
    }
};

const onChangePasswordPress = () => {
    if (editValue.newPassword) {
        dispatch(toggleSpinner(true));
        reauthenticate()
            .then(() => {
                var user: any = firebase.auth().currentUser;
                user.updatePassword(editValue.newPassword)
                    .then(() => {
                        dispatch(toggleSpinner(false));
                        Alert.alert('Password change Successfully');
                        navigation.navigate('Home');
                    })
                    .catch((error: any) => {
                        console.log(error.message);
                    });
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    } else {
        SetValiadate(true);
    }
};
//destination
<GooglePlacesAutocomplete
    placeholder="Enter Destination Location"
    onPress={(data, details = null) =>
        setGeometry2(details?.geometry?.location)
    }
    query={{
        key: 'AIzaSyDWiQo9spq2PLzl5i4OR2oBEXRoaMcgwYQ',
    }}
    fetchDetails={true}
    onFail={error => console.log(error)}
    onNotFound={() => console.log('no results')}
    listEmptyComponent={() => (
        <View style={{}}>
            <Text>No results were found</Text>
        </View>
    )}
    styles={{
        container: {
            marginHorizontal: 12,

            width: '95%',
        },
        description: {
            color: '#000',
            fontSize: 16,
        },
        predefinedPlacesDescription: {
            color: '#3caf50',
        },
    }}
/>;

//Video call
// import React, {useState} from 'react';
// import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';
// import {Text, View} from 'react-native';

// // import { Container } from './styles';

// const VideoCall = () => {
//     const [videoCall, setVideoCall] = useState(true);
//     const connectionData = {
//         appId: '<app-id>',
//         channel: '<channel-name>',
//         token: '<token>',
//     };
//     const props: PropsInterface = {
//         rtcProps: {
//             appId: 'a22539bebe8b4312bc60a8bd34c202bc',
//             channel: 'Testing',
//         },
//         callbacks: {
//             EndCall: () => setVideoCall(false),
//         },
//     };
//     const callbacks = {
//         EndCall: () => setVideoCall(false),
//     };
//     return (
//         <View>
//             {videoCall ? (
//                 <AgoraUIKit
//                     //connectionData={connectionData}
//                     rtcProps={props.rtcProps}
//                     callbacks={props.callbacks}
//                 />
//             ) : (
//                 <Text onPress={() => setVideoCall(true)}>Start Call</Text>
//             )}
//         </View>
//     );
// };

//export default VideoCall;

// import React, {useState} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import {Text, View} from 'react-native';
// const VideoCall = () => {
//     const [videoCall, setVideoCall] = useState(true);
//     const connectionData = {
//         appId: '<Agora App ID>',
//         channel: 'test',
//     };
//     const rtcCallbacks = {
//         EndCall: () => setVideoCall(false),
//     };
//     return (
//         <View>
//             {videoCall ? (
//                 <AgoraUIKit
//                     connectionData={connectionData}
//                     rtcCallbacks={rtcCallbacks}
//                 />
//             ) : (
//                 <Text onPress={() => setVideoCall(true)}>Start Call</Text>
//             )}
//         </View>
//     );
// };
// export default VideoCall;

import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';
const VideoCall = () => {
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const appId = 'a22539bebe8b4312bc60a8bd34c202bc';
    const channelName = 'videocall';
    const token =
        '007eJxTYAitmuSgmHT+6sZP85hC/3QE1ExgOZL93b34xwMhseUfRLYqMCQaGZkaWyalJqVaJJkYGxolJZsZJFokpRibJBsZAHm32RKTGwIZGfg19rEwMkAgiM/JUJaZkpqfnJiTw8AAADEVIcw=';
    const uid = 0;
    function showMessage(msg: string) {
        setMessage(msg);
    }
    useEffect(() => {
        // Initialize Agora engine when the app starts
        setupVideoSDKEngine();
    });

    const setupVideoSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            await getPermission();
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage(
                        'Successfully joined the channel ' + channelName,
                    );
                    setIsJoined(true);
                },
                onUserJoined: (_connection, Uid) => {
                    showMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    showMessage('Remote user left the channel. uid: ' + Uid);
                    setRemoteUid(0);
                },
            });
            agoraEngine.initialize({
                appId: appId,
            });
            agoraEngine.enableVideo();
        } catch (e) {
            console.log(e);
        }
    };
    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
        } catch (e) {
            console.log(e);
        }
    };
    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('You left the channel');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SafeAreaView style={styles.main}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.head}>Video Calling</Text>
                <View style={styles.btnContainer}>
                    <View
                        style={{
                            height: 50,
                            width: 100,
                            backgroundColor: '#0a3749',
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 15,
                        }}>
                        <Text
                            onPress={join}
                            style={{
                                fontWeight: 'bold',
                                color: '#ffffff',
                                fontSize: 22,
                            }}>
                            Join
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 50,
                            width: 100,
                            backgroundColor: '#0a3749',
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            onPress={join}
                            style={{
                                fontWeight: 'bold',
                                color: '#ffffff',
                                fontSize: 22,
                            }}>
                            Leave
                        </Text>
                    </View>
                </View>
                {isJoined ? (
                    <React.Fragment key={0}>
                        <RtcSurfaceView
                            canvas={{uid: 0}}
                            style={styles.videoView}
                        />
                        <Text>Local user uid: {uid}</Text>
                    </React.Fragment>
                ) : (
                    <Text>Join a channel</Text>
                )}
                {isJoined && remoteUid !== 0 ? (
                    <React.Fragment key={remoteUid}>
                        <RtcSurfaceView
                            canvas={{uid: remoteUid}}
                            style={styles.videoView}
                        />
                        <Text>Remote user uid: {remoteUid}</Text>
                    </React.Fragment>
                ) : (
                    <Text>Waiting for a remote user to join</Text>
                )}
                <Text style={styles.info}>{message}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0a3749',
        margin: 5,
        //alignSelf: 'center',
    },
    main: {flex: 1, alignItems: 'center'},
    scroll: {flex: 1, backgroundColor: '#ffffff', width: '100%'},
    scrollContainer: {alignItems: 'center'},
    videoView: {width: '95%', height: 600},
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    head: {marginVertical: 10, fontWeight: 'bold', fontSize: 25},
    info: {backgroundColor: '#ffffff', color: '#0000ff'},
});

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};

export default VideoCall;

//Google login with checking validation (email)
export const googleSignInUser: any = createAsyncThunk(
    'GoogleSignInUser',
    async (body: any) => {
        try {
            await GoogleSignin.hasPlayServices();
            const Info: any = await GoogleSignin.signIn().then(
                (userInfo: any) => {
                    console.log('userInfo all', userInfo);
                    const emailArray: any = [];
                    firestore()
                        .collection('People')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(documentSnapshot => {
                                var {email, ImageUrl} = Object(
                                    documentSnapshot.data(),
                                );
                                //console.log('Keys Email ?? ', key.email);
                                console.log(
                                    'user.email **',
                                    userInfo.user.email,
                                );
                                // console.log(
                                //     'User Email True ?? ',
                                //     key.email === user.email,
                                // );
                                emailArray.push({
                                    email: email,
                                    ImageUrl: ImageUrl,
                                });
                                emailArray.filter((item: any) => {
                                    if (item.email === userInfo.user.email) {
                                        //console.log('FIND', key);
                                        //setUserData(key);
                                        //setAvatar(key.ImageUrl);
                                        console.log(
                                            'Unickly FIND **',
                                            item.email === userInfo.user.email,
                                        );
                                        console.log(
                                            'Unickly FIND Image**',
                                            item.ImageUrl,
                                        );
                                        return userInfo.user.email;
                                    }
                                });
                                console.log('email Array', emailArray);
                                // if (key.email === user.email) {
                                //     //console.log('FIND', key);
                                //     setUserData(key);
                                //     setAvatar(key.ImageUrl);
                                //     //console.log('Unickly FIND **', avatar);
                                // }
                            });
                        });
                },
            );
            //console.log('user Info', userInfo.user.photo);
            return Info.user.email;
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
            } else {
                console.log('some other error happened');
            }
        }
    },
);
