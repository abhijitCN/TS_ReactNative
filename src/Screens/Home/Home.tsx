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
import {useNavigation} from '@react-navigation/native';

function Home() {
    const navigation = useNavigation();
    const [animate, setAnimate] = useState<boolean>(true);
    const user: any = useSelector<any>(state => state.user);
    console.log('YOU USER', user);
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false);
        }, 2000);
    });

    return (
        <View style={style.main}>
            <View style={style.container}>
                <Text style={style.header}>Home</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        padding: 5,
                    }}>
                    <Image
                        style={style.image}
                        source={require('../../Assets/avatar2.png')}
                    />
                </TouchableOpacity>
            </View>
            {animate === true ? (
                <>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                        <ActivityIndicator color="red" size="large" />
                    </View>
                </>
            ) : (
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    <Text style={style.helloText}>Hello,{user?.email}</Text>
                </View>
            )}
        </View>
    );
}
const style = StyleSheet.create({
    main: {
        flex: 1,
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
    header: {marginTop: 20, fontWeight: 'bold', fontSize: 25},
    helloText: {fontSize: 20, fontWeight: 'bold'},
    image: {width: 50, height: 50},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Home;
