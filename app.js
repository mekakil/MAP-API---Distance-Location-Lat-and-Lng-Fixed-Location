function initMap() {
  const myLatlng = { lat: -37.815338, lng: 144.963226 };
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    zoom: 13,
    center: myLatlng,
  });

  directionsService = new google.maps.DirectionsService();

  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng! </ br> or click on the <strong>marker</strong> for </ br>Handdii !</ br>",
    position: { lat: -37.8000, lng: 144.999999 },
  });
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });

  var marker = new google.maps.Marker({
    map: map,
    position: myLatlng
    
  });

  const infowindow = new google.maps.InfoWindow({
    content: "<p>Marker Location:" + marker.getPosition() + "</p>",
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });
  new AutocompleteDirectionsHandler(map);
}

function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.travelMode = 'DRIVING';
  var originInput = document.getElementById('origin-input');
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);
  this.directionsDisplay.setPanel(document.getElementById("right-panel"));
  


  var originAutocomplete = new google.maps.places.Autocomplete(
    originInput, {
      placeIdOnly: true
    });

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
}

// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    me.originPlaceId = place.place_id;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId) {
    return;
  }
  var me = this;
  this.directionsService.route({
    origin: {
      'placeId': this.originPlaceId
    },
    destination: new google.maps.LatLng(-37.815338, 144.963226),
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

  const start = originInput;
  const end = {lat:-37.815338, lng:144.963226};

  const route = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
}

  directionsService.route(route,
    function (response, status) { 
        if (status !== 'OK') {
            window.alert('Directions request failed due to ' + status);
            return;
        } else {
            directionsRenderer.setDirections(response); 
            var directionsData = response.routes[0].legs[0]; 
            if (!directionsData) {
                window.alert('Directions request failed');
                return;
            }
            else {
                document.getElementById('detailinfo').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
            }
        }
    });
};
