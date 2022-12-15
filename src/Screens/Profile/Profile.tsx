import React, {useEffect, useState} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {signOut} from '../../Reducers/authSlice';
import {rootState} from '../../Reducers/store';
import {toggleSpinner} from '../../Reducers/toggleSpinnerSlice';
import ArrowBack from 'react-native-vector-icons/Ionicons';

const Profile = () => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<any>({});
    const user: any = useSelector<any>(state => state.user);
    const profile: any = useSelector<any>((state: rootState) => state.profile);
    const [avatar, setAvatar] = useState();
    const verify2: any = useSelector((state: rootState) => state.user);
    console.log('inside verify', verify2);
    useEffect(() => {
        sample();
    }, []);

    const logOut = () => {
        dispatch(toggleSpinner(true));
        console.log('SPINNER?.show == true ** ', SPINNER?.show);
        dispatch(signOut());
        dispatch(toggleSpinner(false));
        console.log('SPINNER?.show == false ** ', SPINNER?.show);
    };

    const getUserAvatar = async () => {
        const userAvatar: any = [];
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                //console.log('Total users data: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    //console.log('Total data =>> ', documentSnapshot.data());
                    const {ImageUrl} = documentSnapshot.data();
                    userAvatar.push({
                        avatarUrl: ImageUrl,
                    });
                });
            });
        //setAvatar(userAvatar);
    };

    useEffect(() => {
        getUserAvatar();
        //console.log('** avatar image now **', avatar[0]?.avatarUrl);
    }, []);

    const sample = async () => {
        //console.log('called sample');
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                // console.log('Total querySnapshot: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    var key = Object(documentSnapshot.data());
                    console.log('KEYS && ?? ', key.email);
                    //console.log('user.email **', user.email);
                    console.log('User Email ?? ', key.email === user.email);
                    if (key.email === user.email) {
                        //console.log('FIND', key);
                        setUserData(key);
                        setAvatar(key.ImageUrl);
                        //console.log('Unickly FIND **', avatar);
                    }
                });
            });
    };

    const SPINNER: any = useSelector<any>(
        (state: rootState) => state.toggleSpinner,
    );
    console.log('toggleSpinner in change password **', SPINNER);

    useEffect(() => {
        console.log(' <useEffect SPINNER > ', SPINNER.show);
    }, [SPINNER.show]);
    return (
        <View style={style.main}>
            {SPINNER?.show === true ? (
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
            ) : (
                <>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
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
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <View>
                            {avatar ? (
                                //profile?.Image ?
                                <>
                                    <Image
                                        style={{
                                            width: 150,
                                            height: 150,
                                            backgroundColor: '#eafafc',
                                            alignSelf: 'center',
                                            borderRadius: 90,
                                        }}
                                        source={{
                                            //uri: profile?.Image,
                                            uri: avatar,
                                        }}
                                    />
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </View>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() =>
                                navigation.navigate('EditProfile', {
                                    data: userData,
                                })
                            }>
                            <Text style={style.buttonText}>Edit Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() =>
                                navigation.navigate('AddAddress', {
                                    data: userData,
                                })
                            }>
                            <Text style={style.buttonText}>Add Address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() =>
                                navigation.navigate('ChangePassword')
                            }>
                            <Text style={style.buttonText}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={logOut}>
                            <Text style={style.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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
