import React, {useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {rootState} from '../../Reducers/store';
import firestore from '@react-native-firebase/firestore';

interface itemType {
    ImageUrl: any;
    name: string;
    price: string;
    quantity: string;
    category: string;
}

const MyProduct = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<itemType[]>([]);
    const [avatar, setAvatar] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const [userData, setUserData] = useState<any>({});
    const user: any = useSelector<any>((state: rootState) => state.user);

    useEffect(() => {
        sample();
    }, []);

    const sample = async () => {
        await firestore()
            .collection('People')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    var key = Object(documentSnapshot.data());
                    console.log('Keys Email ?? ', key.email);
                    console.log('user.email **', user.email);
                    console.log(
                        'User Email True ?? ',
                        key.email === user.email,
                    );
                    if (key.email === user.email) {
                        setUserData(key);
                        setAvatar(key.ImageUrl);
                    }
                });
            });
    };

    const getAllProducts = async () => {
        const Product: any = [];
        await firestore()
            .collection('AllProducts')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    const {name, price, docId, quantity, category, ImageUrl} =
                        documentSnapshot.data();
                    if (docId === user.email) {
                        Product.push({
                            name: name,
                            price: price,
                            docId: docId,
                            quantity: quantity,
                            category: category,
                            ImageUrl: ImageUrl,
                        });
                    } else null;
                });
            });
        setData(Product);
    };

    useEffect(() => {
        getAllProducts();
    }, [data]);

    return (
        <SafeAreaView style={style.main}>
            <View style={style.container}>
                <Text style={style.header}>My Products</Text>
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
            </View>
            <ScrollView contentContainerStyle={style.scrollView}>
                <View style={{flex: 1}}>
                    <FlatList
                        data={data}
                        renderItem={({item}) => {
                            return (
                                <>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}>
                                        <View
                                            style={{
                                                margin: 12,
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
                                                    justifyContent: 'center',
                                                    marginTop: 5,
                                                }}>
                                                <Text style={style.productText}>
                                                    Name - {item.name}
                                                </Text>
                                                <Text style={style.productText}>
                                                    Price - {item.price}
                                                </Text>
                                                <Text style={style.productText}>
                                                    Quantity - {item.quantity}
                                                </Text>
                                                <Text style={style.productText}>
                                                    Category - {item.category}
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
        </SafeAreaView>
    );
};

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
    },
    card_template: {
        overflow: 'hidden',
        shadowColor: '#2d2d',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    scrollView: {
        flex: 1,
        marginTop: 17,
    },
});

export default MyProduct;
