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
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const AddAddress = () => {
    const navigation = useNavigation();
    const [geometry, setGeometry] = useState<any>({});
    return (
        <View style={styles.main}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    paddingTop: 20,
                    alignSelf: 'center',
                }}>
                Add Address
            </Text>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{marginTop: 20}}>
                    <GooglePlacesAutocomplete
                        placeholder="Type a place"
                        onPress={(data, details = null) =>
                            //console.log('Selected Place Is', details?.geometry?.location)
                            setGeometry(details?.geometry?.location)
                        }
                        query={{
                            key: 'AIzaSyDWiQo9spq2PLzl5i4OR2oBEXRoaMcgwYQ',
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
                    <View style={{marginTop: 80}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={(data, details = null) =>
                                navigation.navigate('Map', {
                                    geometryData: geometry,
                                })
                            }>
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
                                    marginTop: 10,
                                }}>
                                - Or -
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Map')}>
                            <Text style={styles.buttonText}>
                                Choose From Map
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        marginTop: 0,
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
