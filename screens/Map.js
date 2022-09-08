import {Animated, Alert, StyleSheet} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {useCallback, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";

const Map = ({navigation}) => {

    const [selectedLocation, setSelectedLocation] = useState(null);

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922, //сколько контента будет видно от центра (ZOOM)
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({latitude, longitude})
    }

    const savePickedLocationHandler = useCallback( () => {
        if (!selectedLocation) {
            Alert.alert(
                'No location picked!',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.latitude,
            pickedLng: selectedLocation.longitude
        });
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        //добавим кнопку в header
        navigation.setOptions({
            headerRight: ({tintColor}) => <IconButton
                icon={'save'}
                size={24}
                color={tintColor}
                onPress={savePickedLocationHandler}
            />
        })
    },[navigation, savePickedLocationHandler])

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}

        >
            {selectedLocation && <Marker
                title={'Picked Location'}
                coordinate={selectedLocation}
            />
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})

export default Map;