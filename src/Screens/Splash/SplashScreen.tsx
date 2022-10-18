import React from 'react';
import {Dimensions, StyleSheet, View, TextInput, Image} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';

const Splash: React.FC = () => {
    const navigation = useNavigation();
    setTimeout(() => {
        navigation.navigate('Login');
    }, 2000);

    return (
        <View
            style={{
                height: height,
                width: width,
                backgroundColor: '#ffffff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Image
                style={{
                    width: 200,
                    height: 200,
                    //backgroundColor: '#eafafc',
                    alignSelf: 'center',
                }}
                source={require('../../Assets/icon.png')}
            />
        </View>
    );
};

export default Splash;
