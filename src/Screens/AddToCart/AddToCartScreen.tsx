import React from 'react';
import {Text, View} from 'react-native';
import Button from '../../Components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';

// import { Container } from './styles';

const AddToCart = () => {
    const Route = useRoute();
    const navigation: any = useNavigation();
    const Payment = () => {
        navigation.navigate('Payment');
    };
    return (
        <View>
            <Text>Add to cart</Text>
            <Button press={Payment} btnText="Proced For Payment" />
        </View>
    );
};

export default AddToCart;
