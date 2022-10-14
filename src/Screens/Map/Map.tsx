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
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
const Map = () => {
    const navigation = useNavigation();
    const Route = useRoute();
    const geometryData = Route.params;
    const lat: any = geometryData;
    //console.log('geometryData ** ', lat.geometryData.lat);
    return (
        <View
        //style={styles.MainContainer}
        >
            <View style={{}}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        paddingTop: 20,
                        alignSelf: 'center',
                    }}>
                    Map
                </Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        paddingTop: 20,
                    }}>
                    Your Lat -{' '}
                    {lat?.geometryData?.lat ? lat?.geometryData?.lat : null}
                </Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        paddingTop: 20,
                    }}>
                    Your long -{' '}
                    {lat?.geometryData?.lng ? lat?.geometryData?.lng : null}
                </Text>
            </View>
            {/* <MapView
                style={styles.mapStyle}
                showsUserLocation={false}
                zoomEnabled={true}
                zoomControlEnabled={true}
                initialRegion={{
                    latitude: 28.57966,
                    longitude: 77.32111,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    coordinate={{
                        latitude: 28.57966,
                        longitude: 77.32111,
                    }}
                    title={'JavaPoint'}
                    description={'Java Training Institute'}
                />
            </MapView> */}
        </View>
        //     </ScrollView>
        // </View>
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
    MainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Map;
