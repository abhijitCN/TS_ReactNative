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
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Marker, Polyline} from 'react-native-maps';
import ArrowBack from 'react-native-vector-icons/Ionicons';

const Map = () => {
    const navigation = useNavigation();
    const Route = useRoute();
    const geometryData = Route.params;
    const lat: any = geometryData;
    console.log('2 geometryData ** ', lat);
    const [currentLocButton, setCurrentLocButton] = useState(1);
    //console.log('geometryData ** ', lat.geometryData.lat);
    return (
        <View style={styles.main}>
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
                <Text style={styles.header}>Map</Text>
            </View>
            <View style={{flex: 1}}>
                <MapView
                    style={[styles.mapStyle, {marginBottom: currentLocButton}]}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    onMapReady={() => {
                        setCurrentLocButton(0);
                    }}
                    initialRegion={{
                        latitude: lat?.geometryData?.lat,
                        longitude: lat?.geometryData?.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: lat?.geometryData?.lat,
                            longitude: lat?.geometryData?.lng,
                        }}
                        title={'Pointer'}
                        description={'Pointer'}
                        pinColor="#0a3749"
                    />
                    {/* <Polyline
                        coordinates={[{Point1}, Point2]}
                        strokeColor="#1b94c4"
                        strokeWidth={3}
                        lineDashPattern={[1]}
                    /> */}
                </MapView>
            </View>
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
        marginBottom: 20,
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;
