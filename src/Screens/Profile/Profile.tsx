import React, {useContext} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Container } from './styles';

const Profile = ({navigation}) => {
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
            {/* <View style={{alignItems: 'center'}}>
               
            </View> */}
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Image
                    style={{width: 200, height: 200}}
                    source={require('../../Assets/avatar.jpeg')}
                />
                <Text style={style.text}>Full Name</Text>
                <Text style={style.text}>Full Name</Text>
                <Text style={style.text}>Full Name</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        //alignItems: 'center',
                        //flexWrap: 'wrap',
                        //width: '100%',
                    }}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={style.buttonText}>Edit Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={onPress}>
                        <Text style={style.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
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
});
export default Profile;
