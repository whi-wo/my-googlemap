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
  let city = 'Columbus, OH';
  let query = 'gardens';
  let client_id = 'N011PAT2QBX14EUR3ZYVJCBVZCC5NGATAHCBHQAHUBQ0WUA1'
  let client_secret = 'I0CKMRCYV0M3FKYDCWB21I5GD4KEXNSHTRG4D4ANVFBTPD1L'
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id='+client_id+
	'&client_secret='+client_secret+'&v=20190210%20&limit=5&near=' + city + '&query=' + query + '';
  return fetch(apiURL).then(resp => resp.json())
}


  //     .then(json => {
  //       let { venues } = json.response;
  //       console.log('storing venues...');
  //       storeVenues(venues)
  //       .then(res => {
  //         console.log('stored venues');
  //         return resolve(venues);
  //       })
  //     })
  //     .catch(error => {
  //       reject(error);
  //     })
  //   })
  //   .catch(error => {
  //     reject(error);
  //   })
  // });
  // }
