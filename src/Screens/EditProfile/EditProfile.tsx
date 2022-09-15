import React, {useContext} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({navigation}) => {
    const {user, signOut} = useContext<any>(UserContext);

    const onPress = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            signOut();
            Toast.show({
                type: 'success',
                text1: 'Logout Successfully',
                position: 'top',
            });
            console.log('Logout');
        } catch (error) {
            console.log('Logout error');
        }
    };
    return (
        <View style={style.main}>
            <View style={{}}>
                <Image
                    style={style.image}
                    source={require('../../Assets/avatar.jpeg')}
                />
                <Text style={style.textInputHeading}>Name</Text>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#1b94c4"
                    keyboardType="email-address"
                    placeholder="Name"
                />
                <Text style={style.textInputHeading}>Phone No</Text>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#1b94c4"
                    keyboardType="email-address"
                    placeholder="Phone No"
                />
                <TouchableOpacity
                    style={style.button}
                    onPress={() => navigation.navigate('Profile')}>
                    <Text style={style.buttonText}>Submit</Text>
                </TouchableOpacity>

                <View>
                    <Toast />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    main: {
        //alignItems: 'center',
        flex: 1,
        //justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        //width: '90%',
        marginTop: 50,
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
    image: {width: 200, height: 200, marginTop: 50, alignSelf: 'center'},
});

export default EditProfile;
