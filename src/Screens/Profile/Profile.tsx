import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation}) => {
    const {user, signOut} = useContext<any>(UserContext);
    const [posts, setPosts] = useState<any>([]);

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            signOut();
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

    const getProfileData = async () => {
        const productList: any[] = [];
        console.log('called');
        await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot);
                querySnapshot.forEach(documentSnapshot => {
                    const {name, phoneNo, email} = documentSnapshot.data();
                    productList.push({
                        name: name,
                        phoneNo: phoneNo,
                        email: email,
                    });
                    // console.log(
                    //     'User ID: ',
                    //     name,
                    //     phoneNo,
                    //     email,
                    //     //documentSnapshot.id,
                    //     //documentSnapshot.data(),
                    // );
                });
            });
        setPosts(productList);
        console.log('GetValue', posts);
    };
    // const valueName = posts[0].name;
    // const valueEmail = posts[0].email;
    // const valuePhoneNo = posts[0].phoneNo;

    const lapsList = () => {
        return posts.map((data: any) => {
            return (
                <View>
                    <Text style={style.text}>{data.name}</Text>
                    <Text style={style.text}>{data.email}</Text>
                    <Text style={style.text}>{data.phoneNo}</Text>
                </View>
            );
        });
    };

    useEffect(() => {
        getProfileData;
    }, []);

    return (
        <View style={style.main}>
            <View style={{alignItems: 'center'}}>
                <View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 25,
                            paddingTop: 20,
                        }}>
                        Profile
                    </Text>
                </View>
                <Image
                    style={{
                        width: 200,
                        height: 200,
                        marginTop: 40,
                        marginBottom: 5,
                    }}
                    source={require('../../Assets/avatar.jpeg')}
                />
                <View>{lapsList()}</View>
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
                    onPress={() => navigation.navigate('EditProfile', {})}>
                    <Text style={style.buttonText}>Edit Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={getProfileData}>
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
