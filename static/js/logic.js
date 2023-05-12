
var myMap = L.map("map", {
    center: [41.87, 30.77],
    zoom: 2.2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

var earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";




// map style
d3.json(earthquake).then(function (data) {
  function mapStyle(feature) {
    return {
      opacity: 1,
      fillOpacity:1,
      fillColor: markerColor(feature.geometry.coordinates[2]),
      color: "black",
      radius: markerSize(feature.properties.mag),
       weight: 0.5
    };
  }

  // define marker size function
  function markerSize(magnitude) {
    if (magnitude== 0) {
      return 1;
    }
    return magnitude * 2.2;
  }

  // define marker color function
  function markerColor(depth) {
    switch (true) {
      case depth > 300:
        return "black";
      case depth > 200:
        return "brown";
      case depth > 100:
        return "red";
      case depth > 50:
        return "orange";
      case depth > 20:
        return "yellow";
      default:
        return "lightyellow";
    }
  }

  
    // earthquake map
    L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: mapStyle,

    // tags
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Longitude: " + feature.geometry.coordinates[0] +"<br>Latitude: " + feature.geometry.coordinates[1] +  "<br>Depth: " + feature.geometry.coordinates[2]);

    }
  }).addTo(myMap);

  
});


