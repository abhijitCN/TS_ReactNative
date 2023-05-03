import React, {useEffect, useState, useRef} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
    Modal,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Filter from 'react-native-vector-icons/AntDesign';
import RupeeSign from 'react-native-vector-icons/FontAwesome5';

//import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveHeight, responsiveWidth} from '../../Utils/ScreenDimention';
import {useDispatch, useSelector} from 'react-redux';
//import firestore from '@react-native-firebase/firestore';
//import {db} from '../../Constant/Firebase';
//import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {rootState} from '../../Reducers/store';
import {toggleSpinner} from '../../Reducers/toggleSpinnerSlice';
import {
    getStorage,
    ref,
    uploadBytes,
    getMetadata,
    getDownloadURL,
} from 'firebase/storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Bars from 'react-native-vector-icons/FontAwesome5';
import CartIcon from 'react-native-vector-icons/Feather';

import {TextInputs} from '../../Components';

interface textFields {
    email: string;
    password: string;
}
interface itemType {
    ImageUrl: any;
    name: string;
    price: string;
    quantity: string;
    category: string;
}

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

function Home() {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();

    const [data, setData] = useState<itemType[]>([]);
    const [oldData, setOldData] = useState<itemType[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const searchRef: any = useRef();
    const scrollIndexRef: any = useRef();
    const cartProductArray: any = useSelector<any>(state => state.cart);

    const [avatar, setAvatar] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const user: any = useSelector<any>((state: rootState) => state.user);
    const profile: any = useSelector<any>((state: rootState) => state.profile);
    const [userData, setUserData] = useState<any>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [scrollIndex, setscrollIndex] = useState<number>(0);
    //search Function
    const onSearch = (text: string) => {
        if (text == '') {
            setData(oldData);
        } else {
            const tempList = data.filter(item => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            console.log('Temples', tempList);
            setData(tempList);
        }
    };
    //console.log(' < user > ', profile);
    // const SPINNER: any = useSelector<any>(
    //     (state: rootState) => state.toggleSpinner,
    // );
    // console.log(' < SPINNER > ', SPINNER);
    // //console.log('YOU USER', user);
    // //console.log(' < globalLoading > ', user.globalLoading);
    // useEffect(() => {
    //     setTimeout(() => {
    //         //setAnimate(false);
    //         dispatch(toggleSpinner(false));
    //     }, 2000);
    // }, [SPINNER.show]);
    useEffect(() => {
        sample();
    }, []);
    const sample = async () => {
        //console.log('called sample');
        const emailArray: any = [];
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                // console.log('Total querySnapshot: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    var {email, ImageUrl} = Object(documentSnapshot.data());
                    //console.log('Keys Email ?? ', key.email);
                    console.log('user.email **', user.email);
                    // console.log(
                    //     'User Email True ?? ',
                    //     key.email === user.email,
                    // );
                    emailArray.push({
                        email: email,
                        ImageUrl: ImageUrl,
                    });
                    emailArray.filter((item: any) => {
                        if (item.email === user.email) {
                            //console.log('FIND', key);
                            //setUserData(key);
                            //setAvatar(key.ImageUrl);
                            console.log(
                                'Unickly FIND **',
                                item.email === user.email,
                            );
                            console.log('Unickly FIND Image**', item.ImageUrl);
                            setAvatar(item.ImageUrl);
                        }
                    });
                    console.log('email Array', emailArray);
                    // if (key.email === user.email) {
                    //     //console.log('FIND', key);
                    //     setUserData(key);
                    //     setAvatar(key.ImageUrl);
                    //     //console.log('Unickly FIND **', avatar);
                    // }
                });
            });
    };

    const callImageFromStorage = async () => {
        // const pathReference = await storage()
        //     .ref(
        //         'gs://ts-reactnative-fec8b.appspot.com/userprofile/1665567833748',
        //     )
        //     .getDownloadURL();
        // console.log('pathReference', pathReference);
        const storage = getStorage();
        getDownloadURL(ref(storage, 'images/stars.jpg'))
            .then(url => {
                // `url` is the download URL for 'images/stars.jpg'
                console.log('pathReference', url);
            })
            .catch(error => {
                // Handle any errors
            });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllProducts();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const clickHandler = () => {
        navigation.navigate('AddProduct');
    };

    const getUserAvatar = async () => {
        const userAvatar: any = [];
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                console.log('Total users data: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    console.log('Total data =>> ', documentSnapshot.data());
                    const {ImageUrl} = documentSnapshot.data();
                    userAvatar.push({
                        avatarUrl: ImageUrl,
                    });
                    // documentData.filter((item: any) => {
                    //     console.log('item.email', item.email);
                    // });
                });
            });
        //setAvatar(userAvatar);
    };

    useEffect(() => {
        //getUserAvatar();
        //console.log('** avatar image now >> **', avatar);
    }, []);

    const getAllProducts = async () => {
        const Product: any = [];
        await firestore()
            .collection('AllProducts')
            .get()
            .then(querySnapshot => {
                //console.log('Total Products: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    //console.log('Total data =>> ', documentSnapshot.data());
                    const {name, price, docId, quantity, category, ImageUrl} =
                        documentSnapshot.data();
                    Product.push({
                        name: name,
                        price: price,
                        docId: docId,
                        quantity: quantity,
                        category: category,
                        ImageUrl: ImageUrl,
                    });
                });
            });
        setOldData(Product);
        setData(Product);
    };

    useEffect(() => {
        getAllProducts();
        //console.log('**HOLE DATA**', data);
    }, []);

    return (
        <>
            {/* {SPINNER.show === false ? (
                <>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                        <ActivityIndicator color="#0a3749" size="large" />
                    </View>
                </>
            ) : (
                <> */}
            <SafeAreaView style={style.main}>
                <View style={style.container}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{
                            position: 'absolute',
                            //top: 23,
                            //right: 0,
                            left: responsiveWidth(25),
                            //padding: 5,
                            //paddingRight: 12,
                        }}>
                        <Bars name="bars" size={22} color={'#000000'} />
                    </TouchableOpacity>
                    <Text style={style.header}>Home</Text>
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
                    {/* <TouchableOpacity
                        onPress={
                            () => navigation.navigate('Profile')
                            //() => navigation.openDrawer()
                        }
                        style={{
                            position: 'absolute',
                            //top: 1,
                            right: 0,
                            //padding: 5,
                            paddingRight: responsiveWidth(50),
                        }}>
                        {
                            //profile?.Image ?
                            //    condition1
                            //   ? result1
                            //   : condition2 ? result3 : result4
                            avatar ? (
                                <>
                                    <Image
                                        style={style.image}
                                        source={{
                                            uri: avatar,
                                            //uri: profile[0]?.Image,
                                            //uri: avatar[0]?.avatarUrl,
                                        }}
                                    />
                                </>
                            ) : (
                                // : profile?.Image === '' ? (
                                //     <>
                                //         <Image
                                //             style={style.image}
                                //             source={require('../../Assets/avatar2.png')}
                                //         />
                                //     </>
                                // )
                                <>
                                    <Image
                                        style={style.image}
                                        source={require('../../Assets/avatar2.png')}
                                    />
                                </>
                            )
                        }
                    </TouchableOpacity> */}
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        //flex: 1,
                        //justifyContent: 'center',
                    }}>
                    {/* <Text style={style.helloText}>Hello,{user?.email}</Text> */}
                </View>
                {/* <TextInputs
                    placeholder="Search"
                    placeholderTextColor="#1b94c4"
                    // btnStyle={{
                    //     width: '90%',
                    // }}
                    onChangeText={text => {
                        onSearch(text);
                        setSearch(text);
                    }}
                /> */}
                <View style={style.searchSection}>
                    <Filter
                        style={style.searchIcon}
                        name="search1"
                        size={20}
                        color="#000"
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Search"
                        onChangeText={text => {
                            onSearch(text);
                            setSearch(text);
                        }}
                        underlineColorAndroid="transparent"
                    />
                    {search == '' ? null : (
                        <TouchableOpacity
                            onPress={() => {
                                searchRef.current.clear();
                                onSearch('');
                                setSearch('');
                            }}>
                            <Icon
                                style={style.searchIcon}
                                name="circle-with-cross"
                                size={responsiveWidth(20)}
                                color="#000"
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {/* <ScrollView
                    contentContainerStyle={style.scrollView}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={onRefresh}
                    //     />
                    // }
                > */}
                <View style={{flex: 1}}>
                    <FlatList
                        initialScrollIndex={scrollIndex}
                        ref={scrollIndexRef}
                        data={data}
                        renderItem={({item, index}) => {
                            return (
                                <>
                                    <Animatable.View
                                        animation={'fadeInUp'}
                                        duration={500}
                                        delay={index * 300}
                                        style={{
                                            flex: 1,
                                        }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'ProductDetails',
                                                    {items: item},
                                                )
                                            }
                                            style={{
                                                flexDirection: 'row',
                                                marginHorizontal: 12,
                                                borderColor: 'gray',
                                                borderRadius: 10,
                                                marginTop: 10,
                                                backgroundColor: '#bff0f7',
                                                shadowColor: '#000',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 4,
                                                elevation: 5,
                                                //minHeight: 150,
                                            }}>
                                            <View>
                                                {item.ImageUrl ? (
                                                    <>
                                                        <Image
                                                            style={{
                                                                height: 100,
                                                                width: '100%',
                                                                minWidth: 150,
                                                                borderTopLeftRadius: 10,
                                                                marginVertical: 0,
                                                                resizeMode:
                                                                    'center',
                                                                borderBottomLeftRadius: 10,
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
                                            </View>
                                            <View
                                                style={{
                                                    justifyContent: 'center',
                                                    marginLeft: 10,
                                                }}>
                                                <Text style={style.productText}>
                                                    {item.name}
                                                </Text>
                                                {/* <Text style={style.productText}>
                                                    Description -{' '}
                                                    {item?.quantity}
                                                </Text> */}
                                                <Text style={style.productText}>
                                                    {item.category}
                                                </Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                    }}>
                                                    {/* <Text
                                                        style={[
                                                            style.productText,
                                                            {},
                                                        ]}>
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
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
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
                                                                    fontWeight:
                                                                        '600',
                                                                },
                                                            ]}>
                                                            {item.price}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        numColumns={1}
                    />
                </View>
                {/* </ScrollView> */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal closed');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalText}>Choose Option</Text>
                            <View
                                style={{
                                    //flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    //marginVertical: 10,
                                }}>
                                <Pressable
                                    style={[style.button2, style.buttonClose]}
                                    onPress={() => {
                                        const tempList = data.sort((a, b) =>
                                            a.name > b.name ? 1 : -1,
                                        );
                                        setData(tempList);
                                        scrollIndexRef.current.scrollToIndex({
                                            animated: true,
                                            index: 0,
                                        });
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={style.textStyle}>
                                        Sort By Name
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[style.button2, style.buttonClose]}
                                    onPress={() => {
                                        const tempList = data.sort(
                                            (a: any, b: any) =>
                                                a.price - b.price,
                                        );
                                        setData(tempList);
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={style.textStyle}>
                                        Price Low To High
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[style.button2, style.buttonClose]}
                                    onPress={() => {
                                        const tempList = data.sort(
                                            (a: any, b: any) =>
                                                b.price - a.price,
                                        );
                                        setData(tempList);
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={style.textStyle}>
                                        Price High To Low
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[style.button2, style.buttonClose]}
                                    onPress={() => {
                                        const tempList = data.sort(
                                            (a: any, b: any) =>
                                                b.price - a.price,
                                        );
                                        setData(tempList);
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={style.textStyle}>
                                        Sort By Rating
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(true)}
                    style={style.touchableOpacityStyle2}>
                    <Filter name="filter" color={'#ffffff'} size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={clickHandler}
                    style={style.touchableOpacityStyle}>
                    <Icon name="plus" color={'#ffffff'} size={40} />
                </TouchableOpacity>
            </SafeAreaView>
            {/* </>
            )} */}
        </>
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
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        fontWeight: 'bold',
        fontSize: responsiveHeight(25),
        marginBottom: 5,
    },
    helloText: {fontSize: 20, fontWeight: 'bold'},
    image: {width: 50, height: 50, borderRadius: 25},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(12),
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
        flex: 1,
    },
    centeredView: {
        flex: 1,
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
        height: 45,
        marginHorizontal: 12,
        marginTop: 5,
        borderWidth: 1,
        padding: 2,
        borderColor: '#1b94c4',
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});
export default Home;
