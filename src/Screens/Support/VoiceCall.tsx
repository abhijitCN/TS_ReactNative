// import React from 'react';
// import {Text, View} from 'react-native';

// // import { Container } from './styles';

// const VoiceCall: React.FC = () => {
//     return (
//         <View>
//             <Text>Voice Call</Text>
//         </View>
//     );
// };

// export default VoiceCall;
import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
} from 'react-native-agora';

const appId = 'a22539bebe8b4312bc60a8bd34c202bc';
const channelName = 'videocall';
const token =
    '007eJxTYAitmuSgmHT+6sZP85hC/3QE1ExgOZL93b34xwMhseUfRLYqMCQaGZkaWyalJqVaJJkYGxolJZsZJFokpRibJBsZAHm32RKTGwIZGfg19rEwMkAgiM/JUJaZkpqfnJiTw8AAADEVIcw=';
const uid = 0;

const VoiceCall = () => {
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user

    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        }
    };

    function showMessage(msg: string) {
        setMessage(msg);
    }

    useEffect(() => {
        // Initialize Agora engine when the app starts
        setupVoiceSDKEngine();
    });

    const setupVoiceSDKEngine = async () => {
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
            <Text style={styles.head2}>Video Calling</Text>
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
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined ? (
                    <Text>Local user uid: {uid}</Text>
                ) : (
                    <Text>Join a channel</Text>
                )}
                {isJoined && remoteUid !== 0 ? (
                    <Text>Remote user uid: {remoteUid}</Text>
                ) : (
                    <Text>Waiting for a remote user to join</Text>
                )}
                <Text>{message}</Text>
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
        backgroundColor: '#0055cc',
        margin: 5,
        alignSelf: 'center',
    },
    main: {flex: 1, alignItems: 'center', backgroundColor: '#ffffff'},
    scroll: {flex: 1, backgroundColor: '#ffffff', width: '100%'},
    scrollContainer: {alignItems: 'center'},
    videoView: {width: '90%', height: 200},
    btnContainer: {flexDirection: 'row', justifyContent: 'center'},
    head: {fontSize: 20},
    head2: {marginVertical: 10, fontWeight: 'bold', fontSize: 25},
});

export default VoiceCall;
