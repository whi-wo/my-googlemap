//utility function to load google maps directly for development ease
//credit to Ryan Waite-

export function getGoogleMaps() {
  return new Promise((resolve) => {
		// this defines the global callback that will run when the google map is loaded
    window.resolveGoogleMapsPromise = () => {
			// resolves the google map object
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    };
		// loads the google map API
    const script = document.createElement("script");
    const API = 'AIzaSyBMZL35VKnaKsxqu178j9gwlz1HPi_KFuM';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}



export function loadPlaces() {
  return new Promise(function(resolve, reject){
    getVenues()
    .then(venues => {
      if(venues.length > 0) {
        console.log('returning venues from idb');
        return resolve(venues) ;
      }
      console.log('fetching venues...');
      let city = 'Columbus, OH';
      let query = 'Shopping';
      var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=N1IAMKZUIK1AUHKRFGFBKPQ2YKDSBAKS4NTER5SYZN5CROR1&client_secret=4MKLXVLU2FGZQVRMAEDC15P0TFJGSCY3ZUYUZ0KHQQQLQ5R3&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
      fetch(apiURL)
      .then(resp => resp.json())
      .then(json => {
        let { venues } = json.response;
        console.log('storing venues...');
        storeVenues(venues)
        .then(res => {
          console.log('stored venues');
          return resolve(venues);
        })
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  });
}
