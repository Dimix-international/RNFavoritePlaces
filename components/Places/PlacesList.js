import {FlatList, StyleSheet, Text, View} from "react-native";
import PlaceItem from "./PlaceItem";
import {Colors} from "../../constants/colors";


const PlacesList = ({ places }) => {

    if (!places || !places.length) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No places added yet - start adding some!
                </Text>
            </View>
        )
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            renderItem={({item}) => <PlaceItem place={item}/>}
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})


export default PlacesList;