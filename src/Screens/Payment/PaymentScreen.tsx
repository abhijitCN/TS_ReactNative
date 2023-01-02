import React from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

// import { Container } from './styles';

const Payment: React.FC = () => {
    return (
        <View>
            <Text>Payment</Text>
            <TouchableHighlight
                onPress={() => {
                    var options = {
                        description: 'Credits towards consultation',
                        image: 'https://i.imgur.com/3g7nmJC.png',
                        currency: 'INR',
                        key: '', // Your api key
                        amount: '5000',
                        name: 'foo',
                        prefill: {
                            email: 'void@razorpay.com',
                            contact: '9191919191',
                            name: 'Razorpay Software',
                        },
                        theme: {color: '#F37254'},
                    };
                    RazorpayCheckout.open(options)
                        .then(data => {
                            // handle success
                            Alert.alert(`Success: ${data.razorpay_payment_id}`);
                        })
                        .catch(error => {
                            // handle failure
                            Alert.alert(
                                `Error: ${error.code} | ${error.description}`,
                            );
                        });
                }}></TouchableHighlight>
        </View>
    );
};

export default Payment;
