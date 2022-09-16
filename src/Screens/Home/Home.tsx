import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-toast-message';

function Home({navigation}) {
    const {user, signOut} = useContext<any>(UserContext);
    const [animate, setAnimate] = useState<boolean>(true);

    // const onPress = () => {
    //   signOut();
    // };
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false);
        }, 2000);
    });
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
                        <ActivityIndicator
                            animating={animate}
                            color="red"
                            size="large"
                        />
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
                        Hello, {user.email}
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
});
export default Home;
