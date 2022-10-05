import {firebase} from '@react-native-firebase/auth';
import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    SafeAreaView,
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../../Reducers/authSlice';
import {useNavigation} from '@react-navigation/native';
//import {selectEmail} from '../../Reducers/authSlice';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../../Constant/Firebase';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';

interface textFields {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    isLoading: boolean;
}

function Registration() {
    const navigation = useNavigation();
    //const user = useSelector(state => state.user);
    //const myEmail = useSelector(selectEmail);

    const [data, setData] = useState<textFields>({
        name: '',
        email: '',
        phoneNo: '',
        password: '',
        isLoading: true,
    });
    const dispatch = useDispatch();

    const [validate, SetValiadate] = useState<boolean>(false);

    const onPress = async () => {
        // Alert.alert('All ok');
        if (data.password && data.email && data.name && data.phoneNo) {
            console.log(
                '??',
                data.email,
                data.password,
                data.name,
                data.phoneNo,
            );
            try {
                const {user} = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.email, data.password);
                if (user) {
                    //console.log('>>>>>', JSON.stringify(user.email));
                    firestore()
                        .collection('users')
                        .add({
                            name: data.name,
                            email: data.email,
                            phoneNo: data.phoneNo,
                        })
                        .then(() => {
                            //Alert.alert('Register Successfully');
                            Toast.show({
                                type: 'success',
                                text1: 'Register Successfully',
                                position: 'top',
                            });
                            navigation.navigate('Login');
                        });
                }
            } catch (error) {
                console.log('error', error);
            }
        } else {
            SetValiadate(true);
        }
    };
    // useEffect(() => {
    //     console.log('print', user);
    // }, [user]);

    const Authenticate = async () => {
        const myDoc = doc(db, 'User', 'UserData');

        const docData = {
            name: data.name,
            phoneNo: data.phoneNo,
        };

        if (data.password && data.email && data.name && data.phoneNo) {
            console.log(
                '??',
                data.email,
                data.password,
                data.name,
                data.phoneNo,
                data.isLoading,
            );
            try {
                const {user} = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.email, data.password);
                console.log('DATA', user.uid);
                //dispatch(signUpUser(data));
                if (user.uid) {
                    console.log('user.ID>>>>>');
                    // setDoc(myDoc, docData)
                    //     // Handling Promises
                    //     .then(() => {
                    //         // MARK: Success
                    //         Alert.alert('Document Created!');
                    //     })
                    //     .catch(error => {
                    //         // MARK: Failure
                    //         Alert.alert(error.message);
                    //     });
                    firestore()
                        .collection('People')
                        .doc(data.phoneNo)
                        .set({
                            name: data.name,
                            email: data.email,
                            phoneNo: data.phoneNo,
                        })
                        .then(() => {
                            Alert.alert('Register Successfully');
                            navigation.navigate('Login');
                        });
                }
            } catch (error) {
                console.log('error', error);
            }
        } else {
            SetValiadate(true);
        }
    };

    const Authenticate2 = () => {
        dispatch(signUpUser(data));
    };

    const signIn = async () => {
        if (data.name && data.email && data.Phone && data.password) {
            try {
                const user = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.email, data.password);
                if (user) {
                    Alert.alert(JSON.stringify(user));
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <View style={style.main}>
            <ScrollView style={{}}>
                <View
                    style={{
                        justifyContent: 'center',
                        flex: 1,
                        marginVertical: 25,
                    }}>
                    <Text style={style.loginText}>Registration</Text>
                    <Text style={style.sentence}>Enter your details</Text>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => console.log('IMAGE')}>
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    backgroundColor: '#eafafc',
                                    alignSelf: 'center',
                                    borderRadius: 90,
                                }}
                                source={require('../../Assets/avatar2.png')}
                            />
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
                        <Text style={style.textInputHeading}>Name</Text>
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
                            keyboardType="email-address"
                            onChangeText={e => setData({...data, name: e})}
                            placeholder="Name"
                            value={data.name}
                        />
                        {validate && data.name === '' && (
                            <Text style={{marginLeft: 12, color: 'red'}}>
                                Name required
                            </Text>
                        )}
                        <Text style={style.textInputHeading}>Email</Text>

                        <TextInput
                            style={[
                                style.input,
                                {
                                    borderColor:
                                        validate && data.email === ''
                                            ? 'red'
                                            : '#1b94c4',
                                },
                            ]}
                            placeholderTextColor="#1b94c4"
                            keyboardType="email-address"
                            placeholder="Email"
                            onChangeText={e => setData({...data, email: e})}
                        />
                        {validate && data.email === '' && (
                            <Text style={{marginLeft: 12, color: 'red'}}>
                                Email required
                            </Text>
                        )}

                        <Text style={style.textInputHeading}>Phone No</Text>

                        <TextInput
                            style={[
                                style.input,
                                {
                                    borderColor:
                                        validate && data.phoneNo === ''
                                            ? 'red'
                                            : '#1b94c4',
                                },
                            ]}
                            placeholderTextColor="#1b94c4"
                            keyboardType="phone-pad"
                            placeholder="Phone No"
                            onChangeText={e => setData({...data, phoneNo: e})}
                        />
                        {validate && data.phoneNo === '' && (
                            <Text style={{marginLeft: 12, color: 'red'}}>
                                Phone No required
                            </Text>
                        )}

                        <Text style={style.textInputHeading}>Password</Text>
                        <TextInput
                            style={[
                                style.input,
                                {
                                    borderColor:
                                        validate && data.password === ''
                                            ? 'red'
                                            : '#1b94c4',
                                },
                            ]}
                            placeholderTextColor="#1b94c4"
                            keyboardType="number-pad"
                            placeholder="password"
                            secureTextEntry={true}
                            onChangeText={e => setData({...data, password: e})}
                        />
                        {validate && data.password === '' && (
                            <Text style={{marginLeft: 12, color: 'red'}}>
                                Password required
                            </Text>
                        )}
                        <View>
                            <Toast />
                        </View>
                        <TouchableOpacity
                            style={style.button}
                            onPress={Authenticate2}>
                            <Text style={style.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}>
                            <Text
                                style={[
                                    style.buttonText,
                                    {alignSelf: 'center', marginTop: 12},
                                ]}>
                                Already Have Account? Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#ffffff',
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
        marginHorizontal: 10,
        borderRadius: 25,
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
});

/**
 * name
 * email
 * password
 * mobile
 *
 */

export default Registration;
