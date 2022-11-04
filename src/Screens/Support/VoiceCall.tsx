import React, {useRef, useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
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
    const agoraEngineRef = useRef<IRtcEngine>();
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(0);
    const [message, setMessage] = useState('');

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
        setupVoiceSDKEngine();
    });

    const setupVoiceSDKEngine = async () => {
        try {
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
            <Text style={styles.head2}>Voice Calling</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={join}
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
                        style={{
                            fontWeight: 'bold',
                            color: '#ffffff',
                            fontSize: 22,
                        }}>
                        Join
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={leave}
                    style={{
                        height: 50,
                        width: 100,
                        backgroundColor: '#0a3749',
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#ffffff',
                            fontSize: 22,
                        }}>
                        Leave
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined ? (
                    <Text>Local user uid: {uid}</Text>
                ) : (
                    <Text style={{marginTop: 50}}>Join a channel</Text>
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

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};

export default VoiceCall;
