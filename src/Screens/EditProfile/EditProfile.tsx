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
import {UserContext} from '../../Context/AuthContext';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
const EditProfile = ({navigation}) => {
    const {user, signOut} = useContext<any>(UserContext);
    const [validate, SetValiadate] = useState<boolean>(false);
    const [Value, setValue] = useState<any>({Name: '', PhoneNo: ''});
    const [editValue, setEditValue] = useState({
        name: '',
        phoneNo: '',
        email: '',
    });
    const Route = useRoute();
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        let data = Route.params;
        console.log('editable value doc data>>>>>>>>>', data.data[0]);
        setEditValue(data.data[0]._data);
    };
    const [data, setData] = useState<any>({email: '', password: ''});

    const onPress = async () => {
        await firestore()
            .collection('users')
            .doc('users')
            .update({
                name: Value.Name,
            })
            .then(() => {
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
                            paddingTop: 20,
                        }}>
                        Edit Profile
                    </Text>
                </View>
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
                        //value={editValue.name}
                        onChangeText={e => setValue({...Value, Name: e})}
                    />
                    <Text style={style.textInputHeading}>Phone No</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Phone No"
                        //value={editValue.phoneNo}
                        onChangeText={e => setValue({...Value, PhoneNo: e})}
                    />
                    <TouchableOpacity
                        style={style.button}
                        onPress={
                            onPress
                            //() => navigation.navigate('Profile')
                        }>
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
    image: {width: 200, height: 200, marginTop: 40, alignSelf: 'center'},
});

export default EditProfile;
