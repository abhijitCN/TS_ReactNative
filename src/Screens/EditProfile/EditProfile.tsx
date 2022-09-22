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

interface editValue {
    name: string;
    phoneNo: string;
    email: string;
}
interface DescribableFunction {
    description: string;
    (someArg: number): boolean;
}
const EditProfile = () => {
    const navigation = useNavigation();

    const [editValue, setEditValue] = useState<editValue | any>({
        name: '',
        phoneNo: '',
        email: '',
    });

    const Route = useRoute();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = (fn: DescribableFunction) => {
        let data = Route.params;
        setEditValue(data.data[0]._data ? data.data[0]._data : null);
    };

    const onPress = async () => {
        await firestore()
            .collection('users')
            .doc('KGjjNYWQTUub9nkHqgWl')
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
                        value={editValue.name ? editValue.name : null}
                        onChangeText={e =>
                            setEditValue({...editValue, name: e})
                        }
                    />
                    <Text style={style.textInputHeading}>Phone No</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#1b94c4"
                        keyboardType="email-address"
                        placeholder="Phone No"
                        value={editValue.phoneNo ? editValue.phoneNo : null}
                        onChangeText={e =>
                            setEditValue({...editValue, phoneNo: e})
                        }
                    />
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
