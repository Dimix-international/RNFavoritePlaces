const GOOGLE_API_KEY = 'AIddqdq2313mggrg';

export const getMapPreview = (lat, lng) => {
    //https://developers.google.com/maps/documentation/maps-static/overview
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

//для ковертации координат используем пакет геокодинг
//https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding

export const getAddress = async (lat, lng) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json
  ?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);

  if(!response.ok) {
      throw  new Error('Failed to fetch address!')
  }

  const data = await response.json();
  return data.results[0].formatted_address;
}