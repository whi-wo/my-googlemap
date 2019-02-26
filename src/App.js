import React, { Component } from 'react';
import './App.css';

import Sidebar from './components/sidebar'


import { getGoogleMaps, loadPlaces } from './utils'

class App extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      query: '',
      filteredVenues: []
    }
  }

  componentDidMount() {
  // getting all the things needed, google maps
    let googleMapPromise = getGoogleMaps();
    let placesPromise = loadPlaces();


    Promise.all([
      googleMapPromise,
      placesPromise,
    ])
    .then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;
      console.log(values);


      this.google = google;
      this.markers = [];

      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });
      //creating a marker for each venue
      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          title: venue.name,
          address: venue.location.formattedAddress,
          animation: google.maps.Animation.DROP
        });
        //when the marker is clicked open the infowindow
        google.maps.event.addListener(marker, 'click', () => {
  			   this.infowindow.setContent(`<h3 id="title">${marker.name}</h3>`+
           // eslint-disable-next-line
            `<span id="addy">Address:</span>`+`<br>`+
           	marker.address.join(', ')+`<br>`
            );
				   this.map.setZoom(13);
				   this.map.setCenter(marker.position);
				   this.infowindow.open(this.map, marker);
			  });

      this.markers.push(marker);
      });

      this.setState({ filteredVenues: this.venues });
    })
  .catch(error => {
    console.log(error);
    alert('there was an error loading the page, please refresh.');
  })
}



//when a button in the sidebar is clicked, an info window will appear and the marker will bounce.
listItemClick = (venue) => {
  let marker = this.markers.filter(m  => m.id === venue.id)[0];
  console.log(marker);
  this.infowindow.setContent(marker.name);
  this.map.setCenter(marker.position);
  this.infowindow.open(this.map, marker);

  if(marker) {
      if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);
    }

}

filterVenues = (query) => {
  let results = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
  this.markers.forEach(marker => {
  //toggle the marker's visibility
  marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
  marker.setVisible(true) : marker.setVisible(false);
  });

console.log(query);
this.setState({ filteredVenues: results, query });
}


  render() {
    return (
      <div>
        <h1>The Arts in Columbus</h1>
        <div id="map" role="application" aria-label="map">
        </div>
        <Sidebar
          filterVenues={(this.filterVenues)}
          filteredVenues={(this.state.filteredVenues)}
          listItemClick={(this.listItemClick)}
          />
      </div>
    );
  }
}


export default App;
