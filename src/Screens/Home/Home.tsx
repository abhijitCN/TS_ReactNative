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
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
//import firestore from '@react-native-firebase/firestore';
//import {db} from '../../Constant/Firebase';
//import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {rootState} from '../../Reducers/store';
import {toggleSpinner} from '../../Reducers/toggleSpinnerSlice';
import {getStorage, ref, uploadBytes, getMetadata} from 'firebase/storage';

function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //const [animate, setAnimate] = useState<boolean>(true);
    const user: any = useSelector<any>((state: rootState) => state.user);
    const profile: any = useSelector<any>((state: rootState) => state.profile);
    console.log(' < profile > ', profile);
    const SPINNER: any = useSelector<any>(
        (state: rootState) => state.toggleSpinner,
    );
    console.log(' < SPINNER > ', SPINNER);
    console.log('YOU USER', user);
    console.log(' < globalLoading > ', user.globalLoading);
    useEffect(() => {
        setTimeout(() => {
            //setAnimate(false);
            dispatch(toggleSpinner(false));
        }, 500);
    }, [SPINNER.show]);
    // useEffect(() => {
    //     callImageFromStorage();
    // }, []);
    // const callImageFromStorage = () => {
    //     const storage = getStorage();
    //     const forestRef = ref(storage, `/userprofile/`);
    //     getMetadata(forestRef)
    //         .then(metadata => {
    //             console.log('metadata ?? ', metadata);
    //         })
    //         .catch(error => {
    //         });
    // };
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
                    {profile?.Image ? (
                        <>
                            <Image
                                style={style.image}
                                source={{
                                    uri: profile?.Image,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Image
                                style={style.image}
                                source={require('../../Assets/avatar2.png')}
                            />
                        </>
                    )}
                </TouchableOpacity>
            </View>
            {SPINNER.show === true ? (
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
    image: {width: 50, height: 50, borderRadius: 25},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Home;
