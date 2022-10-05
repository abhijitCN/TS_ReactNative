import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {verify} from '../../Reducers/verificationSlice';
import {useNavigation} from '@react-navigation/native';
import {signOut} from '../../Reducers/authSlice';

const Profile = () => {
    const navigation = useNavigation();
    //const {user, signOut} = useContext<any>(UserContext);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState<any>([]);
    const [userData, setUserData] = useState<any>({});
    const user = useSelector<any>(state => state.user);
    useEffect(() => {
        //getProfileData();
        sample();
    }, []);

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            dispatch(verify(false));
            Toast.show({
                type: 'success',
                text1: 'Logout Successfully',
                position: 'top',
            });
            console.log('Logout');
        } catch (error) {
            console.log('Logout error');
        }
    };

    const logOut2 = () => {
        dispatch(signOut());
    };

    const getProfileData = async () => {
        const productList: any[] = [];
        console.log('called');
        await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                console.log(
                    'Total DATA: ',
                    querySnapshot.docs[0]._data
                        ? querySnapshot.docs[0]._data
                        : null,
                );
                let data = querySnapshot.docs.filter(r => {
                    return r._data.email === user.email;
                });
                setUserData(data);
                console.log(data);
            });
        setPosts(productList);
        console.log('GetValue', posts);
    };

    const sample = async () => {
        console.log('called sample');
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                console.log('Total querySnapshot: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    var key = Object(documentSnapshot.data());
                    console.log('KEYS ?? ', key.email);
                    //console.log('User Email ?? ', user.email);
                    if (key.email === user.email) {
                        console.log('FIND', key);
                        setUserData(key);
                    }
                });
            });
    };

    return (
        <View style={style.main}>
            <View style={{alignItems: 'center'}}>
                <View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 25,
                            paddingVertical: 20,
                        }}>
                        Profile
                    </Text>
                </View>
                <View>
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            backgroundColor: '#eafafc',
                            alignSelf: 'center',
                            borderRadius: 90,
                        }}
                        source={require('../../Assets/avatar2.png')}
                    />
                </View>
                <View>
                    <Toast />
                </View>
            </View>
            <View
                style={{
                    //flexDirection: 'row',
                    //width: '100%',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={style.button}
                    onPress={() =>
                        navigation.navigate('EditProfile', {data: userData})
                    }>
                    <Text style={style.buttonText}>Edit Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.button}
                    onPress={() =>
                        navigation.navigate('AddAddress', {data: userData})
                    }>
                    <Text style={style.buttonText}>Add Address</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={style.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={logOut2}>
                    <Text style={style.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
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
        width: '90%',
        marginTop: 10,
        //height: 50,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0a3749',
        textAlignVertical: 'center',
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
export default Profile;
