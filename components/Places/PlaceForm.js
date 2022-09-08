import {ScrollView, Text, TextInput, View, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import {Colors} from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import Button from "../UI/Button";
import {Place} from "../../models/place";


const PlaceForm = ({onCreatePlace}) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
/*    const [pickedLocation, setPickedLocation] = useState();*/

    const changedTitleHandler = (text) => {
        setEnteredTitle(text);
    }

    const savePlaceHandler = () => {
        const placeData = new Place(enteredTitle, selectedImage); //pickedLocation добавить
        onCreatePlace(placeData);
    }

    const onTakeImageHandler =  useCallback((imageUri) => {
        setSelectedImage(imageUri);
    }, []);

/*    const onPickLocationHandler =  useCallback((location) => {
        setPickedLocation(location);
    }, []);*/

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                    style={styles.input}
                    value={enteredTitle}
                    onChangeText={changedTitleHandler}
                     />
                </View>
                <ImagePicker onTakeImage={onTakeImageHandler} />
               {/* <LocationPicker onPickLocation={onPickLocationHandler} />*/}
                <Button onPress={savePlaceHandler}>Add Place</Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: '700',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})

export default PlaceForm;