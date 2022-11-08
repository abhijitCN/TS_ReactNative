import React from 'react';
import {TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Pressable} from 'react-native';
import {Alert} from 'react-native';
import {Modal} from 'react-native';
import Dropdown from '../../Components/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, addProductImage} from '../../Reducers/ProductSlice';
import {rootState} from '../../Reducers/store';
import {useFocusEffect} from '@react-navigation/native';
import ArrowBack from 'react-native-vector-icons/Ionicons';

interface textFields {
    name: string;
    price: string;
    quantity: string;
    //category: string;
    imageUrl: any;
    userMail: string;
}
interface categoryType {
    name: string;
}

const AddProduct: React.FC = () => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const globalSpinner: any = useSelector<any>(
        (state: rootState) => state.product.isLoading,
    );
    const user: any = useSelector<any>((state: rootState) => state.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState<textFields>({
        name: '',
        price: '',
        quantity: '',
        //category: '',
        imageUrl: '',
        userMail: user.email,
    });
    const Categorys = [
        {id: 1, name: 'fruits'},
        ,
        {id: 2, name: 'vegetables'},
        {id: 3, name: 'animal'},
    ];
    const [validate, SetValiadate] = useState<boolean>(false);

    useFocusEffect(React.useCallback(() => {}, []));

    const pickImageAndUploadFromCamera = () => {
        console.log('pick Image');
        setModalVisible(!modalVisible);
        launchCamera(
            {
                quality: 0.5,
                mediaType: 'photo',
            },
            (fileobj: any) => {
                console.log('ROW fileobj', fileobj);
                setData({...data, imageUrl: fileobj.assets[0].uri});
                console.log('fileobj.assets[0].uri', data.imageUrl);
            },
        );
    };

    const pickImageAndUploadFromGallery = () => {
        console.log('pick Image');
        setModalVisible(!modalVisible);
        launchImageLibrary(
            {
                quality: 0.5,
                mediaType: 'photo',
            },
            (fileobj: any) => {
                setData({...data, imageUrl: fileobj.assets[0].uri});
                console.log('fileobj.assets[0].uri', data.imageUrl);
            },
        );
    };
    const [selectItem, setSelectItem] = useState<any>(null);
    const onSelect = (item: any) => {
        setSelectItem(item);
    };
    //console.log('category value which have to send ?? ', selectItem.name);
    const productSubmit = () => {
        const categoryName = selectItem?.name;
        let reqData = {...data, categoryName: categoryName};
        console.log('All data before submit ?? ', reqData);
        //console.log('Main value', selectItem.name);
        if (
            data.name != '' &&
            data.price != '' &&
            data.quantity != '' &&
            categoryName != '' &&
            data.imageUrl != ''
        ) {
            dispatch(addProduct(reqData));
            Alert.alert('Product Added Successfully');
            navigation.navigate('Home');
        } else {
            Alert.alert('Please Fill All Fields');
        }
    };

    return (
        <>
            {globalSpinner ? (
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
                <>
                    <View style={style.main}>
                        <ScrollView style={{marginVertical: 0}}>
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
                                <Text style={style.header}>Add Product</Text>
                            </View>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}>
                                    {data?.imageUrl ? (
                                        <>
                                            <Image
                                                style={[
                                                    {
                                                        width: 90,
                                                        height: 90,
                                                        backgroundColor:
                                                            '#eafafc',
                                                        alignSelf: 'center',
                                                        //borderRadius: 90,
                                                        marginTop: 10,
                                                    },
                                                    {
                                                        borderColor:
                                                            validate &&
                                                            data.imageUrl === ''
                                                                ? 'red'
                                                                : '#1b94c4',
                                                    },
                                                    {
                                                        borderWidth:
                                                            validate &&
                                                            data.imageUrl === ''
                                                                ? 1
                                                                : 0,
                                                    },
                                                ]}
                                                source={{
                                                    uri: data?.imageUrl,
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Image
                                                style={[
                                                    {
                                                        width: 90,
                                                        height: 90,
                                                        backgroundColor:
                                                            '#eafafc',
                                                        alignSelf: 'center',
                                                        //borderRadius: 90,
                                                        marginTop: 10,
                                                    },
                                                    {
                                                        borderColor:
                                                            validate &&
                                                            data.imageUrl === ''
                                                                ? 'red'
                                                                : '#1b94c4',
                                                    },
                                                    {
                                                        borderWidth:
                                                            validate &&
                                                            data.imageUrl === ''
                                                                ? 1
                                                                : 0,
                                                    },
                                                ]}
                                                source={require('../../Assets/avatar2.png')}
                                            />
                                        </>
                                    )}

                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            left: 225,
                                            backgroundColor: '#95d6f0',
                                            borderRadius: 100,
                                            padding: 5,
                                            width: 30,
                                            height: 30,
                                        }}>
                                        <Icon
                                            name="pencil"
                                            color={'#0a3749'}
                                            size={17}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {validate && data.imageUrl === '' && (
                                    <Text
                                        style={{
                                            marginLeft: 12,
                                            color: 'red',
                                            alignSelf: 'center',
                                            marginTop: 5,
                                        }}>
                                        Product Image Required
                                    </Text>
                                )}
                                <Text style={style.textInputHeading}>
                                    Product Name
                                </Text>
                                <TextInput
                                    style={[
                                        style.input,
                                        {
                                            borderColor:
                                                validate && data.name === ''
                                                    ? 'red'
                                                    : '#1b94c4',
                                        },
                                    ]}
                                    placeholderTextColor="#1b94c4"
                                    onChangeText={e =>
                                        setData({...data, name: e})
                                    }
                                    placeholder="Product Name"
                                    value={data.name}
                                />
                                {validate && data.name === '' && (
                                    <Text
                                        style={{marginLeft: 12, color: 'red'}}>
                                        Product Name required
                                    </Text>
                                )}
                                <Text style={style.textInputHeading}>
                                    Product price
                                </Text>

                                <TextInput
                                    style={[
                                        style.input,
                                        {
                                            borderColor:
                                                validate && data.price === ''
                                                    ? 'red'
                                                    : '#1b94c4',
                                        },
                                    ]}
                                    placeholderTextColor="#1b94c4"
                                    placeholder="Product price"
                                    onChangeText={e =>
                                        setData({...data, price: e})
                                    }
                                />
                                {validate && data.price === '' && (
                                    <Text
                                        style={{marginLeft: 12, color: 'red'}}>
                                        product price required
                                    </Text>
                                )}

                                <Text style={style.textInputHeading}>
                                    Product Quantity
                                </Text>

                                <TextInput
                                    style={[
                                        style.input,
                                        {
                                            borderColor:
                                                validate && data.quantity === ''
                                                    ? 'red'
                                                    : '#1b94c4',
                                        },
                                    ]}
                                    placeholderTextColor="#1b94c4"
                                    keyboardType="phone-pad"
                                    placeholder="Product Quantity"
                                    onChangeText={e =>
                                        setData({...data, quantity: e})
                                    }
                                />
                                {validate && data.quantity === '' && (
                                    <Text
                                        style={{marginLeft: 12, color: 'red'}}>
                                        Product Quantity required
                                    </Text>
                                )}

                                <Text style={style.textInputHeading}>
                                    Product Category
                                </Text>
                                <Dropdown
                                    value={selectItem}
                                    data={Categorys}
                                    onSelect={onSelect}
                                />
                                {/* {validate && data.category === '' && (
                        <Text
                            style={{
                                marginLeft: 12,
                                color: 'red',
                                marginBottom: 5,
                            }}>
                            Product Category required
                        </Text>
                    )} */}
                                <View></View>
                                <TouchableOpacity
                                    style={style.button}
                                    onPress={productSubmit}>
                                    <Text style={style.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    //Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={style.centeredView}>
                                    <View style={style.modalView}>
                                        <Text style={style.modalText}>
                                            Choose From
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                            }}>
                                            <Pressable
                                                style={[
                                                    style.button2,
                                                    style.buttonClose,
                                                ]}
                                                onPress={() =>
                                                    pickImageAndUploadFromCamera()
                                                }>
                                                <Text style={style.textStyle}>
                                                    Camera
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                style={[
                                                    style.button2,
                                                    style.buttonClose,
                                                ]}
                                                onPress={() =>
                                                    pickImageAndUploadFromGallery()
                                                }>
                                                <Text style={style.textStyle}>
                                                    Gallery
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                    </View>
                </>
            )}
        </>
    );
};
const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {marginTop: 16, fontWeight: 'bold', fontSize: 25},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#eafafc',
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginTop: 17,
        borderRadius: 25,
        marginHorizontal: 12,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0a3749',
    },
    loginText: {
        marginLeft: 12,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#1b94c4',
    },
    sentence: {
        marginLeft: 12,
        marginBottom: 5,
        fontSize: 20,
        color: '#1b94c4',
    },
    textInputHeading: {
        marginHorizontal: 10,
        color: '#1b94c4',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
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
        marginHorizontal: 3,
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
    },
    modalText: {
        marginBottom: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default AddProduct;
