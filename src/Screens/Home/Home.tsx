import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    Button,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
    StatusBar,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
//import firestore from '@react-native-firebase/firestore';
//import {db} from '../../Constant/Firebase';
//import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
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
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [data, setData] = useState<itemType[]>([]);
    const [avatar, setAvatar] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const user: any = useSelector<any>((state: rootState) => state.user);
    const profile: any = useSelector<any>((state: rootState) => state.profile);
    const [userData, setUserData] = useState<any>({});

    console.log(' < user > ', profile);
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
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                // console.log('Total querySnapshot: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    var key = Object(documentSnapshot.data());
                    console.log('KEYS && ?? ', key.email);
                    //console.log('user.email **', user.email);
                    console.log('User Email ?? ', key.email === user.email);
                    if (key.email === user.email) {
                        //console.log('FIND', key);
                        setUserData(key);
                        setAvatar(key.ImageUrl);
                        //console.log('Unickly FIND **', avatar);
                    }
                });
            });
    };
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

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
                });
            });
        //setAvatar(userAvatar);
    };

    useEffect(() => {
        getUserAvatar();
        console.log('** avatar image now >> **', avatar);
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
            <View style={style.main}>
                <View style={style.container}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{
                            position: 'absolute',
                            top: 23,
                            right: 0,
                            left: 15,
                            padding: 5,
                            paddingRight: 12,
                        }}>
                        <Bars name="bars" size={22} color={'#000000'} />
                    </TouchableOpacity>
                    <Text style={style.header}>Home</Text>
                    <TouchableOpacity
                        onPress={
                            () => navigation.navigate('Profile')
                            //() => navigation.openDrawer()
                        }
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 0,
                            padding: 5,
                            paddingRight: 12,
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
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        //flex: 1,
                        //justifyContent: 'center',
                    }}>
                    <Text style={style.helloText}>Hello,{user?.email}</Text>
                </View>
                <ScrollView
                    contentContainerStyle={style.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={data}
                            renderItem={({item}) => {
                                return (
                                    <>
                                        <View
                                            style={{
                                                flex: 1,

                                                //backgroundColor: 'green',
                                            }}>
                                            <View
                                                style={{
                                                    //padding: 12,
                                                    margin: 12,
                                                    borderColor: 'gray',
                                                    //borderWidth: 0.7,
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
                                                    minHeight: 253,
                                                }}>
                                                {item.ImageUrl ? (
                                                    <>
                                                        <Image
                                                            style={{
                                                                height: 150,
                                                                width: '100%',
                                                                borderTopLeftRadius: 10,
                                                                borderTopRightRadius: 10,
                                                                marginVertical: 0,
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
                                                                height: 150,
                                                                width: '100%',
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
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        marginTop: 5,
                                                    }}>
                                                    <Text
                                                        style={
                                                            style.productText
                                                        }>
                                                        Name - {item.name}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            style.productText
                                                        }>
                                                        Price - {item.price}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            style.productText
                                                        }>
                                                        Quantity -{' '}
                                                        {item.quantity}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            style.productText
                                                        }>
                                                        Category -{' '}
                                                        {item.category}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={clickHandler}
                    style={style.touchableOpacityStyle}>
                    {/* <Image
                        source={{
                            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                        }}
                        style={style.floatingButtonStyle}
                    /> */}
                    <Icon name="plus" color={'#ffffff'} size={40} />
                </TouchableOpacity>
            </View>
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
    header: {marginTop: 10, fontWeight: 'bold', fontSize: 25},
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
export default Home;
