
var myMap = L.map("map", {
    center: [21.8781, -87.6298],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

var earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

var marker=[];
var geometry=[];
var popup=[];


d3.json(earthquake).then(function(data){
    console.log(data);

   

    for (var i = 0; i < data.length; i++) {
        //geometry= data[i].geometry;
        L.marker(geometry.coordinates[1], geometry.coordinates[0]).bindPopup(geometry.coordinates[2]).addTo(myMap);
        
        
      }
      
});