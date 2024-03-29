import React, {useContext, useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    Button,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {passwordChange} from '../../Reducers/profileSlice';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../Reducers/store';
import {toggleSpinner} from '../../Reducers/toggleSpinnerSlice';
import ArrowBack from 'react-native-vector-icons/Ionicons';

interface editValue {
    currentPassword: string;
    newPassword: string;
}

const ChangePassword = () => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const SPINNER: any = useSelector<any>(
        (state: rootState) => state.toggleSpinner,
    );
    console.log('toggleSpinner in change password **', SPINNER);

    const globalSpinner: any = useSelector<any>(
        (state: rootState) => state.profile.IsLoading,
    );
    const [editValue, setEditValue] = useState<editValue | any>({
        currentPassword: '',
        newPassword: '',
    });
    const [validate, SetValiadate] = useState<boolean>(false);
    useEffect(() => {
        //console.log(' <useEffect SPINNER > ', SPINNER);
    }, [SPINNER.show]);

    const reauthenticate = () => {
        if (editValue.currentPassword) {
            var user: any = firebase.auth().currentUser;
            //console.log('reauthenticate function call', user?.email);
            var cred = firebase.auth.EmailAuthProvider.credential(
                user.email,
                editValue.currentPassword,
            );
            //console.log('cred ?? ', cred);
            return user.reauthenticateWithCredential(cred);
        } else {
            SetValiadate(true);
        }
    };

    const onChangePasswordPress = () => {
        if (editValue.newPassword) {
            dispatch(toggleSpinner(true));
            reauthenticate()
                .then(() => {
                    var user: any = firebase.auth().currentUser;
                    user.updatePassword(editValue.newPassword)
                        .then(() => {
                            dispatch(toggleSpinner(false));
                            Alert.alert('Password change Successfully');
                            navigation.navigate('Home');
                        })
                        .catch((error: any) => {
                            //console.log(error.message);
                        });
                })
                .catch((error: any) => {
                    //console.log(error.message);
                });
        } else {
            SetValiadate(true);
        }
    };

    const ChangePasswordAsync = () => {
        dispatch(toggleSpinner(true));
        console.log('SPINNER?.show == true ** ', SPINNER?.show);
        dispatch(passwordChange(editValue));
        dispatch(toggleSpinner(false));
        console.log('SPINNER?.show == false ** ', SPINNER?.show);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.main}>
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
                    <View style={styles.container}>
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
                        <Text style={styles.header}>Change Password</Text>
                    </View>
                    <ScrollView>
                        <View style={{marginTop: 50}}>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            validate &&
                                            editValue.currentPassword === ''
                                                ? 'red'
                                                : '#1b94c4',
                                    },
                                ]}
                                placeholder="Current Password"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={text => {
                                    setEditValue({
                                        ...editValue,
                                        currentPassword: text,
                                    });
                                }}
                            />
                            {validate && editValue.currentPassword === '' && (
                                <Text style={{marginLeft: 12, color: 'red'}}>
                                    Name required
                                </Text>
                            )}
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            validate &&
                                            editValue.newPassword === ''
                                                ? 'red'
                                                : '#1b94c4',
                                    },
                                ]}
                                placeholder="New Password"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={text => {
                                    setEditValue({
                                        ...editValue,
                                        newPassword: text,
                                    });
                                }}
                            />
                            {validate && editValue.newPassword === '' && (
                                <Text
                                    style={{
                                        marginLeft: 12,
                                        color: 'red',
                                    }}>
                                    Name required
                                </Text>
                            )}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={ChangePasswordAsync}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default ChangePassword;
