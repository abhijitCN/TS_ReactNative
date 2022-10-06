import React, {useContext, useState, useEffect} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {PickImageAndUpload} from '../../Reducers/profileSlice';
import {rootState} from '../../Reducers/store';

interface editValue {
    name: string;
    phoneNo: string;
    email: string;
    image: any;
}
interface DescribableFunction {
    description: string;
    (someArg: number): boolean;
}
const EditProfile = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userProfilePicture: any = useSelector<any>(
        (state: rootState) => state.profile,
    );
    console.log('userProfilePicture <<<>>>  ', userProfilePicture);
    const [editValue, setEditValue] = useState<editValue | any>({
        name: '',
        phoneNo: '',
        email: '',
        Image: '',
    });
    const [image, setImage] = useState('');

    const Route = useRoute();
    let data = Route.params;
    let Phone = data.data.phoneNo;
    console.log('Global Route data', Phone);

    useEffect(() => {
        getUserData();
        console.log('userProfilePicture <<<>>>  ', userProfilePicture);
    }, []);

    const getUserData = (fn: DescribableFunction) => {
        let data = Route.params;
        console.log('This page data', data.data);
        setEditValue(data.data ? data.data : null);
    };

    const pickImageAndUpload = () => {
        console.log('pick Image And Upload');
        launchCamera({quality: 0.5}, fileobj => {
            const uploadTask = storage()
                .ref()
                .child(`/userprofile/${Date.now()}`)
                .putFile(fileobj.assets[0].uri);
            uploadTask.on(
                'state_changed',
                snapshot => {
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100)
                        console.log('Image Uploaded Successfully');
                },
                error => {
                    console.log('error uploading image');
                },
                () => {
                    uploadTask.snapshot?.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            console.log('DOWNLOADED IMAGE  ?? ', downloadURL);
                            setImage(downloadURL);
                        });
                },
            );
        });
    };

    const pickImageAndUpload2 = () => {
        dispatch(PickImageAndUpload());
    };

    const onPress = async () => {
        await firestore()
            .collection('People')
            .doc(Phone)
            .update({
                name: editValue.name ? editValue.name : null,
                phoneNo: editValue.phoneNo ? editValue.phoneNo : null,
            })
            .then(() => {
                navigation.navigate('Home');
                console.log('User updated!');
            });
    };

    return (
        <View style={style.main}>
            <ScrollView>
                <View style={{alignSelf: 'center'}}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 25,
                            paddingVertical: 20,
                        }}>
                        Edit Profile
                    </Text>
                </View>
                <View style={{}}>
                    <TouchableOpacity
                        onPress={() =>
                            // uploadImageToStorage(
                            //     'data/user/0/com.tsreactnative/cache/rn_image_picker_lib_temp_0a9c0e6f-dcf9-4890-afd7-3c0345c25610.jpg',
                            //     'abhijit',
                            // )
                            pickImageAndUpload()
                        }
                        style={
                            {
                                //flex: 1,
                                //flexDirection: 'row',
                            }
                        }>
                        {image != '' ? (
                            <>
                                <Image
                                    style={{
                                        width: 150,
                                        height: 150,
                                        backgroundColor: '#eafafc',
                                        alignSelf: 'center',
                                        borderRadius: 90,
                                        //marginTop: 40,
                                    }}
                                    source={{
                                        uri: image,
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <Image
                                    style={{
                                        width: 150,
                                        height: 150,
                                        backgroundColor: '#eafafc',
                                        alignSelf: 'center',
                                        borderRadius: 90,
                                        //marginTop: 40,
                                    }}
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
                                left: 245,
                                backgroundColor: '#95d6f0',
                                borderRadius: 100,
                                padding: 5,
                                width: 40,
                                height: 40,
                            }}>
                            <Icon name="pencil" color={'#0a3749'} size={25} />
                        </View>
                    </TouchableOpacity>
                    <Text style={style.textInputHeading}>Name</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Name"
                        value={editValue.name ? editValue.name : null}
                        onChangeText={e =>
                            setEditValue({...editValue, name: e})
                        }
                    />
                    {/* <Text style={style.textInputHeading}>Phone No</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Phone No"
                        value={editValue.phoneNo ? editValue.phoneNo : null}
                        onChangeText={e =>
                            setEditValue({...editValue, phoneNo: e})
                        }
                    /> */}
                    <TouchableOpacity style={style.button} onPress={onPress}>
                        <Text style={style.buttonText}>Submit</Text>
                    </TouchableOpacity>

                    <View>
                        <Toast />
                    </View>
                </View>
            </ScrollView>
        </View>
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
        marginTop: 30,
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
        fontSize: 25,
        fontWeight: '600',
        marginHorizontal: 10,
    },
    textInputHeading: {
        marginHorizontal: 10,
        color: '#1b94c4',
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#eafafc',
        borderColor: '#1b94c4',
        borderRadius: 10,
    },
    image: {width: 200, height: 200, marginTop: 40, alignSelf: 'center'},
});

export default EditProfile;
