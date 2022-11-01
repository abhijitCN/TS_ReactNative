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
