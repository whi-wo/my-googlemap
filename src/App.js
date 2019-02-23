import React, { Component } from 'react';
import './App.css';

//import * as from './utils'
import { getGoogleMaps, loadPlaces } from './utils'

class App extends Component {
  componentDidMount() {
  // getting all the things needed, google maps
    let googleMapPromise = getGoogleMaps();
    let placesPromise = loadPlaces();

    Promise.all([
      googleMapPromise,
      placesPromise
    ])
    .then(values => {
      let google = values[0];
      let venues = values[1].response.venues;
      console.log(values);

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        scrollwheel: true,
        center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
      });

      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          //change the animation
          animation: google.maps.Animation.DROP
        });
      this.markers.push(this.markers);
      });




    })
}


// filterVenues(query){
//
// }







  render() {
    return (
      <div>
        <div id="map">
        </div>

        <div id="sidebar">
        </div>
      </div>
    );
  }
}


export default App;
