import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import Button from '../../Components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import CartIcon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {rootState} from '../../Reducers/store';
import {ScrollView} from 'react-native-gesture-handler';
import {
    addCartProduct,
    decrementQuantity,
    deleteMyCartItem,
} from '../../Reducers/CartSlice';
import Filter from 'react-native-vector-icons/AntDesign';
import {responsiveHeight, responsiveWidth} from '../../Utils/ScreenDimention';
import RupeeSign from 'react-native-vector-icons/FontAwesome5';

const AddToCart = () => {
    const Route = useRoute();
    const navigation: any = useNavigation();
    const cartProductArray: any = useSelector<any>(state => state.cart);
    const user: any = useSelector<any>((state: rootState) => state.user);
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch();

    console.log(' ** cartProductArray ?? ** ', cartProductArray);

    useEffect(() => {
        sample();
    }, []);
    const sample = async () => {
        const emailArray: any = [];
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    var {email, ImageUrl} = Object(documentSnapshot.data());
                    console.log('user.email **', user.email);
                    emailArray.push({
                        email: email,
                        ImageUrl: ImageUrl,
                    });
                    emailArray.filter((item: any) => {
                        if (item.email === user.email) {
                            console.log(
                                'Unickly FIND **',
                                item.email === user.email,
                            );
                            console.log('Unickly FIND Image**', item.ImageUrl);
                            setAvatar(item.ImageUrl);
                        }
                    });
                    console.log('email Array', emailArray);
                });
            });
    };

    const Increment = () => {
        navigation.navigate('Payment');
    };
    const Decrement = (item: any): void => {
        dispatch(addCartProduct(item));
    };
    const TotalPrice = () => {
        let total = 0;
        cartProductArray.map((item: any) => {
            total = total + item.quantity * item.price;
        });
        return total;
    };
    const totalPriceForPayment = TotalPrice();
    const Payment = (data: any) => {
        navigation.navigate('Payment', {
            items: totalPriceForPayment,
            cartArray: cartProductArray,
        });
    };
    return (
        <View style={{}}>
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
                <Text style={style.header}>Your Cart</Text>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        padding: 5,
                        paddingRight: 12,
                    }}>
                    {avatar ? (
                        <>
                            <Image
                                style={style.image}
                                source={{
                                    uri: avatar,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Image
                                style={style.image}
                                source={require('../../Assets/avatar2.png')}
                            />
                        </>
                    )}
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddToCart')}
                    style={{
                        position: 'absolute',
                        top: responsiveWidth(20),
                        right: responsiveWidth(25),
                    }}>
                    <CartIcon
                        name="shopping-cart"
                        size={responsiveHeight(28)}
                        color={'#000000'}
                    />
                    <View style={{marginTop: responsiveHeight(99)}}>
                        <Text
                            style={{
                                position: 'absolute',
                                left: responsiveWidth(30),
                                bottom: 18,
                                fontWeight: 'bold',
                                fontSize: 15,
                                backgroundColor: '#95d6f0',
                                borderRadius: 100,

                                padding: responsiveWidth(95),
                            }}>
                            {cartProductArray.length}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={cartProductArray}
                renderItem={({item}) => {
                    return (
                        <>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 15,
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
                                        width: '70%',
                                    }}>
                                    {item.ImageUrl ? (
                                        <>
                                            <Image
                                                style={{
                                                    height: 150,
                                                    width: '50%',
                                                    minWidth: 150,
                                                    borderTopLeftRadius: 10,
                                                    marginVertical: 0,
                                                    borderBottomLeftRadius: 10,
                                                    resizeMode: 'center',
                                                }}
                                                source={{
                                                    uri: item.ImageUrl,
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Image
                                                style={{
                                                    height: 170,
                                                    width: '100%',
                                                    minWidth: 150,
                                                    borderRadius: 10,
                                                }}
                                                source={{
                                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                                }}
                                            />
                                        </>
                                    )}
                                    <View
                                        style={{
                                            marginTop: 15,
                                            marginLeft: 15,
                                        }}>
                                        <Text style={[style.productText, {}]}>
                                            {item.name}
                                        </Text>

                                        <Text style={style.productText}>
                                            {item.category}
                                        </Text>
                                        {/* <Text style={[style.productText, {}]}>
                                            Rating -{' '}
                                            {
                                                <Filter
                                                    name="star"
                                                    color={'green'}
                                                    size={20}
                                                />
                                            }
                                        </Text> */}

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <RupeeSign
                                                name="rupee-sign"
                                                color={'#0a3749'}
                                                size={20}
                                            />
                                            <Text
                                                style={[
                                                    {
                                                        marginLeft: 3,
                                                        fontSize: 20,
                                                        fontWeight: '600',
                                                    },
                                                ]}>
                                                {item.price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        //alignSelf: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                    }}>
                                    {item.quantity == 0 ? null : (
                                        <Button
                                            press={() => {
                                                if (item.quantity > 1) {
                                                    dispatch(
                                                        decrementQuantity(item),
                                                    );
                                                } else {
                                                    dispatch(
                                                        deleteMyCartItem(
                                                            item.docId,
                                                        ),
                                                    );
                                                }
                                            }}
                                            btnStyle={{width: 70}}
                                            btnText="-"
                                        />
                                    )}
                                    {item.quantity == 0 ? null : (
                                        <Text
                                            style={{
                                                fontSize: 25,
                                                fontWeight: 'bold',
                                                color: '#0a3749',
                                            }}>
                                            {item.quantity}
                                        </Text>
                                    )}
                                    {item.quantity == 0 ? null : (
                                        <Button
                                            press={() =>
                                                dispatch(addCartProduct(item))
                                            }
                                            btnStyle={{width: 70}}
                                            btnText="+"
                                        />
                                    )}
                                </View>
                            </View>
                        </>
                    );
                }}
                //showsVerticalScrollIndicator={false}
                horizontal={false}
                numColumns={1}
            />
            {cartProductArray.length > 0 ? (
                <View style={{}}>
                    {/* <View
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
                            {'Added items' +
                                '(' +
                                cartProductArray.length +
                                ')'}
                        </Text>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: '#0a3749',
                            }}>
                            {'Total Price' + TotalPrice()}
                        </Text>
                    </View> */}
                    <View>
                        <Button
                            press={Payment}
                            btnText={
                                'Proceed to Buy' +
                                '(' +
                                cartProductArray.length +
                                'Items' +
                                ')'
                            }
                        />
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                        Cart is Empty
                    </Text>
                </View>
            )}
        </View>
    );
};
const style = StyleSheet.create({
    main: {
        //flex: 1,
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
    productText: {
        fontSize: 16,
        fontWeight: '600',
    },
    header: {marginTop: 20, fontWeight: 'bold', fontSize: 25, marginBottom: 5},
    helloText: {fontSize: 20, fontWeight: 'bold', marginTop: 6},
    image: {width: 50, height: 50, borderRadius: 25},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 20,
        backgroundColor: '#0a3749',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    touchableOpacityStyle2: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 85,
        backgroundColor: '#0a3749',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        //backgroundColor:'black'
    },
    card_template: {
        overflow: 'hidden',
        shadowColor: '#2d2d',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    scrollView: {
        //  flex: 1,
    },
    centeredView: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 55,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        minWidth: 200,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#95d6f0',
    },
    textStyle: {
        color: '#0a3749',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    modalText: {
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#0a3749',
    },
    searchSection: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        borderColor: '#1b94c4',
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        //flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});
export default AddToCart;
