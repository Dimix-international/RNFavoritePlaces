import {Alert, Button, Image, View, StyleSheet, Text} from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

const ImagePicker = ({onTakeImage}) => {

    const [pickedImage, setPickedImage] = useState('');

    //для ios
   const [cameraPermissionInformation, requestPermission] =  useCameraPermissions();
    //для ios
   const verifyPermissions = async () => {
       if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
          const permissionResponse =  await requestPermission();

          return permissionResponse.granted;
       }

       if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
           Alert.alert(
               'Insufficient Permissions!',
               'You need to grant camera permissions to use this app.'
           );
           return false;
       }

       return true;
   }

    const takeImageHandler = async () => {
        //для ios
      const hasPermission = await verifyPermissions();

      if (!hasPermission) return;

        //для android
     const image =  await launchCameraAsync({
         allowsEditing: true,
         aspect: [16, 9],
         quality: 0.5,
     });

     setPickedImage(image.uri);
     onTakeImage(image.uri);
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {
                    pickedImage
                        ?
                        <Image
                            source={{uri: pickedImage}}
                            style={styles.image}
                        />
                        : <Text>No image taken yet.</Text>
                }
            </View>
            <OutlineButton
                icon={'camera'}
                onPress={takeImageHandler}
            >
                Take image
            </OutlineButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImagePicker;