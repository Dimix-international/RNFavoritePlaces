import {View, StyleSheet, Alert, Image, Text} from "react-native";
import OutlineButton from "../UI/OutlineButton";
import {Colors} from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import {useEffect, useState} from "react";
import {getAddress, getMapPreview} from "../../utils/location";
import {useNavigation, useRoute, useIsFocused} from "@react-navigation/native";


const LocationPicker = ({onPickLocation}) => {
    const [pickedLocation, setPickedLocation] = useState(undefined);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    //будет true если компонента является частью текущего экрана
    const isFocused = useIsFocused(); //необходимо, т.к. экраном является родит компонента,
    // а нам нужно чтобы перерисовалась текущая

    const navigation = useNavigation();
    const route = useRoute();

    const verifyPermissions = async () => {

        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse =  await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if(!hasPermission) return;

        const location =  await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    },[route, isFocused])

    useEffect(() => {

        const handleLocation = async () => {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng,
                )
                onPickLocation({...pickedLocation, address});
            }
        }

        handleLocation();

    },[pickedLocation, onPickLocation])


  return <View style={styles.container}>
      <View style={styles.mapPreview}>
          {
              pickedLocation
                  ? <Image
                      source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}
                      style={styles.mapPreviewImage}
                  />
                  : <Text>No location picked yet.</Text>
          }
      </View>
      <View style={styles.actions}>
          <OutlineButton icon={'location'} onPress={getLocationHandler}>Locate User</OutlineButton>
          <OutlineButton icon={'map'} onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
      </View>
  </View>
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden",
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%',
    }
})

export default LocationPicker;