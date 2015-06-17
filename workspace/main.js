// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;

var userCoordinates;

function initialize() {
  var mapOptions = {
    zoom: 14
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Your location :)'
      });
      
      var userCoordinates = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
      
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

var coordinatesElement = document.getElementById('coordinates');
var userLatitude;
var userLongitude;
var foursquareData;
var client_id = 'E4FEFMGFDXKEP2NWZTAZEQ2BNLMUIUYPRSDTGDXUSL0XJCY0';
var client_secret = '0EP1NLCQMZLYDQDCOFTGJZUIFPPCFFLFUB2WHQNUJJZXUZKK';
var v = '20150617';
var m = 'foursquare';

function main(){
  //call the function to get user location and set userLatitude and user longitude
  navigator.geolocation.getCurrentPosition(logAndSetUserPosition);
  
  function logAndSetUserPosition(position) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    //make the request based on the data we have
    $.getJSON('https://api.foursquare.com/v2/venues/explore?ll=' + userLatitude + ',' + userLongitude + 
    '&section=food&&client_id='+ client_id + '&client_secret=' + client_secret + '&v=' + v + '&m=' + m, function(data){
      foursquareData = data;
      console.log(foursquareData.response.groups[0].items[0].venue.name);//.items[1].venue.name
    });
    console.log(userLatitude);
    console.log(userLongitude);
    
    //foursquareData.response.groups[1].0.
  };
  
};


