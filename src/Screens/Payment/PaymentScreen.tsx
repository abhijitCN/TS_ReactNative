import React, {useState} from 'react';
import {
    Alert,
    Text,
    TouchableHighlight,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {STRIP_PUBLISHKEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import Button from '../../Components/Button';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';

const Payment: React.FC = () => {
    const [isLiked, setIsLiked] = useState([
        {id: 1, value: true, name: 'Online Payment', selected: false},
        {id: 2, value: false, name: 'Cash On Delivery', selected: false},
    ]);
    const Route = useRoute();
    const routData = Route.params;
    const values: any = routData;
    console.log('payment details ** ', values);
    const cartProductArray: any = useSelector<any>(state => state.cart);

    const {confirmPayment} = useStripe();
    // const Payment = (data: any) => {
    //     Alert.alert(STRIP_PUBLISHKEY);
    // };
    var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_lonSqmEfYL3Ocx', // Your api key
        amount: '5000',
        name: 'foo',
        prefill: {
            email: 'abhijitsaha885@gmail.com',
            contact: '8910890886',
            name: 'abhijit saha',
        },
        theme: {color: '#1b94c4'},
    };
    const makePayment = () => {
        RazorpayCheckout.open(options)
            .then((data: any) => {
                // handle success
                Alert.alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch((error: any) => {
                // handle failure
                Alert.alert(`Error: ${error.code} | ${error.description}`);
            });
    };
    const onRadioBtnClick = (item: any) => {
        let updatedState = isLiked.map(isLikedItem =>
            isLikedItem.id === item.id
                ? {...isLikedItem, selected: true}
                : {...isLikedItem, selected: false},
        );
        setIsLiked(updatedState);
    };
    const TotalPrice = () => {
        let total = 0;
        cartProductArray.map((item: any) => {
            total = total + item.quantity * item.price;
        });
        return total;
    };
    return (
        <View
            style={{
                flex: 1,
            }}>
            <View style={{minHeight: 200}}>
                <View
                    style={{
                        backgroundColor: '#2d2d',
                        height: 140,
                        margin: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#0a3749',
                        }}>
                        {'Added items' + '(' + cartProductArray.length + ')'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#0a3749',
                        }}>
                        {'Total Price' + TotalPrice()}
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text>Address</Text>
                <Text>Edit Address</Text>
            </View>
            {isLiked.map(item => (
                <View style={style.radioButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            onRadioBtnClick(item);
                        }}
                        style={style.radioButton}>
                        {/* <View style={style.radioButtonIcon} /> */}
                        {item.selected ? (
                            <View style={style.radioButtonIcon} />
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onRadioBtnClick(item);
                        }}>
                        <Text style={style.radioButtonText}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity onPress={makePayment} style={style.button}>
                <Text style={style.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0a3749',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 45,
    },
    radioButton: {
        height: 20,
        width: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0a3749',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: '#98CFB6',
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16,
    },
});
export default Payment;
