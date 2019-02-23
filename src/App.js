import React, { Component } from 'react';
import './App.css';

import { getGoogleMaps } from './utils'
import { loadPlaces } from './utils'

class App extends Component {

  componentDidMount() {
    //getting all the things needed, google maps

    let googleMapPromise = getGoogleMaps();
    let placesPromise = loadPlaces();

    Promise.all([
      googleMapPromise
    ])
    .then(values => {
      let google = values[0];
      let venvues = values[1].response.venues;
      this.google = google;
      this.markers = [];
      console.log(values);
    })
  }


  render() {
    return (
      <div id="map">
      </div>
    );
  }
}

export default App;
