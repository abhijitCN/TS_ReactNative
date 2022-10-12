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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
///import {apiKey} from './config'; // your google cloud api key
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
                <View style={{marginTop: 20}}>
                    <View style={{}}>
                        <View>
                            <GooglePlacesAutocomplete
                                placeholder="Type a place"
                                onPress={(data, details = null) =>
                                    console.log(
                                        'Selected Place Is',
                                        data,
                                        details,
                                    )
                                }
                                query={{
                                    key: '',
                                }}
                                fetchDetails={true}
                                onFail={error => console.log(error)}
                                onNotFound={() => console.log('no results')}
                                listEmptyComponent={() => (
                                    <View style={{}}>
                                        <Text>No results were found</Text>
                                    </View>
                                )}
                                styles={{
                                    container: {
                                        marginHorizontal: 12,

                                        width: '95%',
                                    },
                                    description: {
                                        color: '#000',
                                        fontSize: 16,
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#3caf50',
                                    },
                                }}
                            />
                        </View>
                        {/* <TouchableOpacity
                            onPress={() => navigation.navigate('Map')}
                            style={{
                                backgroundColor: '#95d6f0',
                                height: '90%',
                                width: '10%',
                                borderRadius: 10,
                                marginRight: 12,
                                marginLeft: 5,
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Icon
                                    name="map-marker"
                                    color={'#0a3749'}
                                    size={30}
                                />
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <View>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '500',
                                color: '#0a3749',
                                textAlign: 'center',
                                margin: 10,
                                marginTop: 40,
                            }}>
                            Or
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Map')}>
                        <Text style={styles.buttonText}>Choose From Map</Text>
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
        fontWeight: '900',
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
