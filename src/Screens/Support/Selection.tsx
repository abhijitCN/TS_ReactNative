import {View, Text} from 'react-native';
import React from 'react';
import VideoCall from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function Selection() {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <Text
                style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 25,
                    alignSelf: 'center',
                }}>
                Video Call / Voice Call
            </Text>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flex: 1,
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SupportVideoCall')}
                    style={{
                        width: 95,
                        height: 95,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a3749',
                        borderRadius: 50,
                        shadowColor: '#000',
                        marginRight: 25,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                    <VideoCall name="video-call" size={40} color={'#ffffff'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SupportVoiceCall')}
                    style={{
                        width: 95,
                        height: 95,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a3749',
                        borderRadius: 50,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                    <VideoCall name="add-call" size={40} color={'#ffffff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
