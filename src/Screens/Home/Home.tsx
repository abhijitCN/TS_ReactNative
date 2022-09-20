import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

function Home({navigation}) {
    // const {user, signOut} = useContext<any>(UserContext);
    const [animate, setAnimate] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);
    const user = useSelector(state => state.user);
    // const onPress = () => {
    //   signOut();
    // };
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false);
        }, 2000);
    });
    const getProfileData = async () => {
        const productList: any[] = [];
        console.log('called');
        await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot);
                // querySnapshot.forEach(documentSnapshot => {
                //     const {name, phoneNo, email} = documentSnapshot.data();
                //     productList.push({
                //         name: name,
                //         phoneNo: phoneNo,
                //         email: email,
                //     });
                //     console.log(
                //         'User ID: ',
                //         name,
                //         phoneNo,
                //         email,
                //         //documentSnapshot.id,
                //         //documentSnapshot.data(),
                //     );
                // });
            });
        setPosts(productList);
        console.log('GetValue', posts);
    };
    useEffect(() => {
        console.log('user data');
        getProfileData();
    }, []);
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

    return (
        <View style={style.main}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25}}>
                    Home
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        padding: 5,
                    }}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../../Assets/avatar.jpeg')}
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
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        Hello,{user.email}
                    </Text>
                </View>
            )}
        </View>
    );
}
const style = StyleSheet.create({
    main: {
        //alignItems: 'center',
        flex: 1,
        //justifyContent: 'center',
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
});
export default Home;
