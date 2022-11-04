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
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';
const VideoCall = () => {
    const agoraEngineRef = useRef<IRtcEngine>();
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(0);
    const [message, setMessage] = useState('');
    const appId = 'a22539bebe8b4312bc60a8bd34c202bc';
    const channelName = 'videocall';
    const token =
        '007eJxTYAitmuSgmHT+6sZP85hC/3QE1ExgOZL93b34xwMhseUfRLYqMCQaGZkaWyalJqVaJJkYGxolJZsZJFokpRibJBsZAHm32RKTGwIZGfg19rEwMkAgiM/JUJaZkpqfnJiTw8AAADEVIcw=';
    const uid = 0;

    function showMessage(msg: string) {
        setMessage(msg);
    }
    useEffect(() => {
        setupVideoSDKEngine();
    });

    const setupVideoSDKEngine = async () => {
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
                {isJoined ? (
                    <React.Fragment key={0}>
                        <RtcSurfaceView
                            canvas={{uid: 0}}
                            style={styles.videoView}
                        />
                        <Text>Local user uid: {uid}</Text>
                    </React.Fragment>
                ) : (
                    <Text style={{marginTop: 50}}>Join a channel</Text>
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
