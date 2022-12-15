import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import VideoCall from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import ArrowBack from 'react-native-vector-icons/Ionicons';

export default function Selection() {
    const navigation: any = useNavigation();

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 2,
                        padding: 5,
                        paddingRight: 12,
                    }}>
                    <ArrowBack
                        name="arrow-back-circle-outline"
                        color={'#0a3749'}
                        size={40}
                    />
                </TouchableOpacity>
                <Text style={styles.header}>Video Call / Voice Call</Text>
            </View>
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

const styles = StyleSheet.create({
    header: {marginTop: 16, fontWeight: 'bold', fontSize: 25},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
