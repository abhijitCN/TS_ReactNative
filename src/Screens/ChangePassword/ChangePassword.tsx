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
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {passwordChange} from '../../Reducers/profileSlice';
import {useDispatch} from 'react-redux';

const ChangePassword = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    interface editValue {
        currentPassword: string;
        newPassword: string;
    }
    const [editValue, setEditValue] = useState<editValue | any>({
        currentPassword: '',
        newPassword: '',
    });

    const reauthenticate = () => {
        var user: any = firebase.auth().currentUser;
        console.log('reauthenticate function call', user?.email);
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email,
            editValue.currentPassword,
        );
        console.log('cred ?? ', cred);
        return user.reauthenticateWithCredential(cred);
    };

    const onChangePasswordPress = () => {
        reauthenticate()
            .then(() => {
                var user: any = firebase.auth().currentUser;
                user.updatePassword(editValue.newPassword)
                    .then(() => {
                        Alert.alert('Password was changed');
                        navigation.navigate('Home');
                    })
                    .catch((error: any) => {
                        console.log(error.message);
                    });
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    };

    const ChangePassword2 = () => {
        dispatch(passwordChange(editValue));
    };

    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={{alignSelf: 'center'}}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 25,
                            paddingTop: 20,
                        }}>
                        Change Password
                    </Text>
                </View>
                <View style={{marginTop: 50}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={text => {
                            setEditValue({...editValue, currentPassword: text});
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={text => {
                            setEditValue({...editValue, newPassword: text});
                        }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={ChangePassword2}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default ChangePassword;
