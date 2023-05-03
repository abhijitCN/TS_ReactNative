import React, {useState} from 'react';
import {
    Alert,
    Text,
    FlatList,
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
import ArrowBack from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Payment: React.FC = () => {
    const [isLiked, setIsLiked] = useState([
        {id: 1, value: true, name: 'Online Payment', selected: false},
        {id: 2, value: false, name: 'Cash On Delivery', selected: false},
        {id: 3, value: false, name: 'UPI', selected: false},
        {id: 4, value: false, name: 'Debit card', selected: false},
    ]);
    const Route = useRoute();
    const navigation: any = useNavigation();
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
            <View style={style.container}>
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
                <Text style={style.header}>Checkout</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginHorizontal: 12, marginTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: '800'}}>
                        Added Items
                    </Text>
                </View>
                <FlatList
                    data={cartProductArray}
                    renderItem={({item}) => {
                        return (
                            <>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        //marginTop: 5,
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            margin: 12,
                                            borderColor: 'gray',
                                            borderRadius: 10,
                                            backgroundColor: '#bff0f7',
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 4,
                                            elevation: 5,
                                            width: '95%',
                                        }}>
                                        <>
                                            <Image
                                                style={{
                                                    height: 80,
                                                    width: '30%',
                                                    resizeMode: 'center',

                                                    borderTopLeftRadius: 10,
                                                    marginVertical: 0,

                                                    borderBottomLeftRadius: 10,
                                                }}
                                                source={{
                                                    uri: item.ImageUrl,
                                                }}
                                            />
                                        </>
                                        <View
                                            style={{
                                                marginHorizontal: 15,
                                                marginVertical: 5,
                                            }}>
                                            <Text
                                                style={[
                                                    style.productText,
                                                    {flexWrap: 'wrap'},
                                                ]}>
                                                {item.name}
                                            </Text>
                                            <Text style={style.productText}>
                                                {item.category}
                                            </Text>
                                            <Text style={style.productText}>
                                                {item.price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        );
                    }}
                    horizontal={false}
                    numColumns={1}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 12,
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#0a3749',
                        }}>
                        {'Total Price'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#0a3749',
                        }}>
                        {TotalPrice()}
                    </Text>
                </View>
                <View style={{marginHorizontal: 12, marginTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: '800'}}>
                        Select Payment Mode
                    </Text>
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
                            <Text style={style.radioButtonText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={{margin: 12}}>
                    <Text style={{fontSize: 20, fontWeight: '800'}}>
                        Shipping Address
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                        Select Your Address
                    </Text>
                    <Button
                        // press={() =>
                        //     dispatch(addCartProduct(item))
                        // }
                        btnStyle={{width: 70}}
                        btnText="add"
                    />
                </View>
                <TouchableOpacity onPress={makePayment} style={style.button}>
                    <Text style={style.buttonText}>Proceed to Payment</Text>
                </TouchableOpacity>
            </ScrollView>
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
    productText: {
        fontSize: 16,
        fontWeight: '600',
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
        margin: 8,
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
    header: {marginTop: 20, fontWeight: 'bold', fontSize: 25, marginBottom: 5},
    helloText: {fontSize: 20, fontWeight: 'bold', marginTop: 6},
    image: {width: 50, height: 50, borderRadius: 25},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Payment;
