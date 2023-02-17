import React, {useContext, useEffect, useState, useRef} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
    StatusBar,
    RefreshControl,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../Reducers/store';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {
    addCartProduct,
    increaseQuantityInProductDetails,
} from '../../Reducers/CartSlice';
import CartIcon from 'react-native-vector-icons/Feather';
//import Toast from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

export default function ProductDetails() {
    const Route = useRoute();
    const navigation: any = useNavigation();
    const [avatar, setAvatar] = useState();
    const user: any = useSelector<any>((state: rootState) => state.user);
    const cartProductArray: any = useSelector<any>(state => state.cart);

    const routData = Route.params;
    const values: any = routData;
    console.log('values ** ', values.items);
    console.log(' ** cartProductArray ** ', cartProductArray);
    const dispatch = useDispatch();

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

    const AddProductToCart = () => {
        dispatch(addCartProduct(values.items));
        //dispatch(increaseQuantityInProductDetails(values.items));
        Toast.show({
            position: 'bottom',
            type: 'success',
            text1: 'Successfully Added',
            text2: 'Product Added Successfully',
        });
    };

    return (
        <View style={style.main}>
            <Toast
                ref={ref => {
                    Toast.setRef(ref);
                }}
            />

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
                <Text style={style.header}>{values.items.name}</Text>
                <TouchableOpacity
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
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddToCart')}
                    style={{
                        position: 'absolute',
                        top: 23,
                        right: 0,
                        left: 280,
                        padding: 5,
                        paddingRight: 12,
                    }}>
                    <CartIcon
                        name="shopping-cart"
                        size={22}
                        color={'#000000'}
                    />
                    <Text
                        style={{
                            position: 'absolute',
                            left: 15,
                            bottom: 22,
                            fontWeight: 'bold',
                        }}>
                        {cartProductArray.length}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    marginTop: 30,
                }}>
                <View
                    style={{
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
                        minHeight: 200,
                    }}>
                    {values.items.ImageUrl ? (
                        <>
                            <Image
                                style={{
                                    height: 200,
                                    borderRadius: 10,
                                    marginVertical: 0,
                                }}
                                source={{
                                    uri: values.items.ImageUrl,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Image
                                style={{
                                    height: 150,
                                    width: '80%',
                                    borderRadius: 10,
                                }}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                        </>
                    )}
                </View>
                <View
                    style={{
                        //alignItems: 'center',
                        //justifyContent: 'center',
                        margin: 10,
                        //backgroundColor: '#2d2d',
                    }}>
                    <Text style={style.productText}>
                        Name - {values.items.name}
                    </Text>
                    <Text style={style.productText}>
                        Price - {values.items.price}
                    </Text>
                    <Text style={style.productText}>
                        Quantity - {values.items.quantity}
                    </Text>
                    <Text style={style.productText}>
                        Category - {values.items.category}
                    </Text>
                    <Text style={[style.productText, {textAlign: 'justify'}]}>
                        Details - Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </Text>
                </View>

                {/* <View style={{flexDirection: 'row'}}>
                    {values.items.quantity == 0 ? null : (
                        <Button
                            //press={Payment}
                            btnStyle={{width: 70}}
                            btnText="-"
                        />
                    )}
                    {values.items.quantity == 0 ? null : (
                        <Text>{values.items.quantity}</Text>
                    )}
                    {values.items.quantity == 0 ? null : (
                        <Button
                            //press={Payment}
                            btnStyle={{width: 70}}
                            btnText="+"
                        />
                    )}
                </View> */}
                <Button press={AddProductToCart} btnText="Add To Cart" />
            </View>
        </View>
    );
}

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
        fontSize: 17,
        fontWeight: '500',
    },
    header: {marginTop: 20, fontWeight: 'bold', fontSize: 25},
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
        bottom: 30,
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
        flex: 1,
    },
});
