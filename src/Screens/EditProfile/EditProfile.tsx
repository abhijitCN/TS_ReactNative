import React, {useState, useEffect} from 'react';
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
    Modal,
    Pressable,
    ActivityIndicator,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
//import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {PickImageAndUpload} from '../../Reducers/profileSlice';
import {rootState} from '../../Reducers/store';
import {profileImage} from '../../Reducers/profileSlice';
import {toggleSpinner} from '../../Reducers/toggleSpinnerSlice';
import ArrowBack from 'react-native-vector-icons/Ionicons';

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
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const Route = useRoute();
    let data: any = Route.params;
    let Phone: any = data.data.docId;
    let AvaterUrl: any = data.data.ImageUrl;
    let userName: any = data.data.name;
    console.log('data.data.docId $>>>>>>', data.data.docId);
    //console.log('Global Route data phone', AvaterUrl);
    const userProfilePicture: any = useSelector<any>(
        (state: rootState) => state.profile,
    );
    //console.log('userProfilePicture <<<>>>  ', userProfilePicture);
    const SPINNER: any = useSelector<any>(
        (state: rootState) => state.toggleSpinner,
    );
    console.log('toggleSpinner in change password **', SPINNER);
    const [editValue, setEditValue] = useState<editValue | any>({
        name: '',
        phoneNo: '',
        email: '',
        Image: '',
    });
    const [image, setImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const profile: any = useSelector<any>((state: rootState) => state.profile);

    useEffect(() => {
        //console.log(' <useEffect SPINNER > ', SPINNER);
    }, [SPINNER.show]);

    useEffect(() => {
        getUserData(data);
        //console.log('userProfilePicture <<<>>>  ', userProfilePicture);
    }, []);

    const getUserData = (fn: DescribableFunction) => {
        let data: any = Route.params;
        //console.log('This page data', data.data);
        setEditValue(data.data ? data.data : null);
    };

    const pickImageAndUploadFromCamera = () => {
        //console.log('pick Image And Upload');
        setModalVisible(!modalVisible);
        launchCamera(
            {
                quality: 0.5,
                mediaType: 'photo',
            },
            (fileobj: any) => {
                const uploadTask = storage()
                    .ref()
                    .child(`/userprofile/${Date.now()}`)
                    .putFile(fileobj ? fileobj.assets[0].uri : null);
                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
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
                                console.log(
                                    'DOWNLOADED IMAGE  ?? ',
                                    downloadURL,
                                );
                                setImage(downloadURL);
                                dispatch(profileImage(downloadURL));
                            });
                    },
                );
            },
        );
    };

    const pickImageAndUploadFromGallery = () => {
        setModalVisible(!modalVisible);
        //console.log('pick Image And Upload');
        setModalVisible(!modalVisible);
        launchImageLibrary(
            {
                quality: 0.5,
                mediaType: 'photo',
            },
            (fileobj: any) => {
                const uploadTask = storage()
                    .ref()
                    .child(`/userprofile/${Date.now()}`)
                    .putFile(fileobj ? fileobj.assets[0].uri : null);
                uploadTask.on(
                    'state_changed',
                    snapshot => {
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
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
                                console.log(
                                    'DOWNLOADED IMAGE  ?? ',
                                    downloadURL,
                                );
                                setImage(downloadURL);
                                dispatch(profileImage(downloadURL));
                            });
                    },
                );
            },
        );
    };

    const pickImageAndUploadThunk = () => {
        dispatch(PickImageAndUpload());
    };

    const onPress = async () => {
        dispatch(toggleSpinner(true));
        console.log('SPINNER?.show == true ** ', SPINNER?.show);
        await firestore()
            .collection('People')
            .doc(Phone)
            .update({
                ImageUrl: image ? image : AvaterUrl,
                name: editValue.name ? editValue.name : null,
                phoneNo: editValue.phoneNo ? editValue.phoneNo : null,
            })

            .then(() => {
                dispatch(toggleSpinner(false));
                console.log('SPINNER?.show == false ** ', SPINNER?.show);
                navigation.navigate('Home');
                Alert.alert('Update Successfully.');
            });
    };

    return (
        <View style={style.main}>
            {SPINNER?.show === true ? (
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
                    <ScrollView>
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
                            <Text style={style.header}>Edit Profile</Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity
                                style={{marginTop: 20}}
                                onPress={() => setModalVisible(true)}>
                                {profile?.Image ? (
                                    <>
                                        <Image
                                            style={{
                                                width: 150,
                                                height: 150,
                                                backgroundColor: '#eafafc',
                                                alignSelf: 'center',
                                                borderRadius: 90,
                                            }}
                                            source={{
                                                uri: profile?.Image,
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
                                            }}
                                            source={{uri: AvaterUrl}}
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
                                    <Icon
                                        name="pencil"
                                        color={'#0a3749'}
                                        size={25}
                                    />
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
                            <TouchableOpacity
                                style={style.button}
                                onPress={onPress}>
                                <Text style={style.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
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
                        {/* <Pressable
                    style={[style.button2, style.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={style.textStyle}>Show Modal</Text>
                </Pressable> */}
                    </ScrollView>
                </>
            )}
        </View>
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

export default EditProfile;
