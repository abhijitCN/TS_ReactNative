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
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const AddAddress = () => {
    const navigation = useNavigation();

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
                        Add Address
                    </Text>
                </View>
                <View style={{marginTop: 50}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Your Address"
                            autoCapitalize="none"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Map')}
                            style={{
                                backgroundColor: '#9999',
                                height: '70%',
                                width: '10%',
                            }}></TouchableOpacity>
                        {/* <View>
                            <Icon name="rocket" size={30} color="#900" />;
                        </View> */}
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
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
        width: '80%',
    },
    image: {width: 200, height: 200, marginTop: 40, alignSelf: 'center'},
});

export default AddAddress;
