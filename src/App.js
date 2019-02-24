import React, { Component } from 'react';
import './App.css';

//import * as from './utils'
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


filterVenues(query) {
  this.markers.forEach(marker => {
  //toggle the marker's visibility
  marker.name.toLowerCase().includes(query.toLowerCase()) == true ?
  marker.setVisible(true) : marker.setVisible(false);
  console.log(marker);
  });

console.log(query);
this.setState({ query });
}







  render() {
    return (
      <div>
        <div id="map">
        </div>

        <div id="sidebar">
        <input placeholder="filter venues" value={this.state.query}
        onChange={(e) => {this.filteredVenues(e.target.value) }}
        />
        <br/>
        {/* will only run if there are venues in the state*/}
        { this.state.filteredVenues && this.state.filteredVenues.length > 0
          && this.state.filteredVenues.map((venue, index) => (
          <div key={index} className="venue-item">
          { venue.name }
          </div>
          ))

        }
        </div>
      </div>
    );
  }
}


export default App;
