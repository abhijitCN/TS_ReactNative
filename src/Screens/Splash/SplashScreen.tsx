import React from 'react';
import {Dimensions, StyleSheet, View, TextInput, Image} from 'react-native';
const {height, width} = Dimensions.get('screen');
//import {useNavigation} from '@react-navigation/native';
//import * as asa from './Splash.scss';

const Splash: React.FC = ({navigation}) => {
    //const navigation = useNavigation();
    setTimeout(() => {
        navigation.replace('Login');
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
                //style={asa.container}
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
