import PlacesList from "../components/Places/PlacesList";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";


const AllPlaces = ({route}) => {
   const [loadedPlaces, setLoadedPlaces] = useState([]);
   const isFocused =  useIsFocused()

    useEffect(() => {
        if (isFocused && route.params) {
            setLoadedPlaces(prev => [route.params.place, ...prev])
        }
    },[isFocused])

    return <PlacesList places={loadedPlaces}/>
}

export default AllPlaces;