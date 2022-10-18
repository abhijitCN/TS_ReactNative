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
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    paddingTop: 20,
                    paddingBottom: 20,
                    alignSelf: 'center',
                }}>
                Map
            </Text>
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
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;
