import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Share,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {signOut} from '../Reducers/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../Reducers/store';

const CustomDrawer = (props: any) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<any>({});
    const user: any = useSelector<any>(state => state.user);
    const [avatar, setAvatar] = useState();
    const profile = useSelector<any>((state: rootState) => state.profile);
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'We Chat App',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //Alert.alert(error.message);
        }
    };
    useEffect(() => {
        sample();
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
                    //console.log('KEYS && ?? ', key.email);
                    //console.log('user.email **', user.email);
                    //console.log('User Email ?? ', key.email === user.email);
                    if (key.email === user.email) {
                        //console.log('FIND', key);
                        setUserData(key);
                        setAvatar(key.ImageUrl);
                        console.log('Unickly FIND AVATA**', avatar);
                    }
                });
            });
    };

    const getUserAvatar = async () => {
        const userAvatar: any = [];
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                console.log('Total users data: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Total data =>> ', documentSnapshot.data());
                    const {ImageUrl} = documentSnapshot.data();
                    userAvatar.push({
                        avatarUrl: ImageUrl,
                    });
                });
            });
        //setAvatar(userAvatar);
    };

    useEffect(() => {
        //getUserAvatar();
    }, []);

    const logOut = () => {
        dispatch(signOut());
        Alert.alert('Logout Successfully');
    };

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{backgroundColor: '#8200d6'}}>
                <ImageBackground
                    source={require('../Assets/DrawerBackground.jpg')}
                    style={{padding: 20}}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {
                            //profile?.Image ?
                            avatar ? (
                                <>
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                        }}
                                        source={{
                                            uri: avatar,
                                            //uri: profile?.Image,
                                            //uri: avatar[0]?.avatarUrl,
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                        }}
                                        source={require('../Assets/avatar2.png')}
                                    />
                                </>
                            )
                        }
                        {/* <Image
              source={require('../Assets/user-profile.jpg')}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 1 }}
            /> */}
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 18,
                                fontFamily: 'Roboto-Medium',
                                marginBottom: 0,
                            }}>
                            Abhijit Saha
                        </Text>
                    </View>
                </ImageBackground>
                <View
                    style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    padding: 20,
                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
                }}>
                <TouchableOpacity
                    onPress={onShare}
                    style={{paddingVertical: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logOut}
                    style={{paddingVertical: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
