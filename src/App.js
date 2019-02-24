import React, { Component } from 'react';
import './App.css';

import Sidebar from './components/sidebar'


import { getGoogleMaps, loadPlaces } from './utils'

class App extends Component {
  constructor(props)  {
    super(props);
    this.state ={
      query: ' '
    }
  }

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
      this.venues = values[1].response.venues;
      console.log(values);

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });

      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          //change the animation
          animation: google.maps.Animation.DROP
        });

      this.markers.push(marker);
      });

      this.setState({ filteredVenues: this.venues });
    })
}

listItemClick = (venue) => {
  let marker = this.markers.filter(m  => m.id === venue.id)[0];
  console.log(marker);
  this.infowindow.setContent(marker.name);
  this.map.setCenter(marker.position);
  this.infowindow.open(this.map, marker);
  this.map.panBy(0, -125);
}

filterVenues(query) {
  let results = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
  this.markers.forEach(marker => {
  //toggle the marker's visibility
  marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
  marker.setVisible(true) : marker.setVisible(false);
  console.log(marker);
  });

console.log(query);
this.setState({ filteredVenues: results, query });
}







  render() {
    return (
      <div>
        <div id="map">
        </div>

        <Sidebar />
      </div>
    );
  }
}


export default App;
