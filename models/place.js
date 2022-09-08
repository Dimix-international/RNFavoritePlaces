export class Place {
    constructor(title, imageUri) { //удалил location,
        this.title = title;
        this.imageUri = imageUri;
       // this.address = location.address;
      //  this.location = {lat: location.lat, lng: location.lng}; //{lat: 0,124, lng: 123 }
        this.id = Math.random().toString();
    }
}