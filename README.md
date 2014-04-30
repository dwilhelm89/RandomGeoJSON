RandomGeoJSON
=============

Create random GeoJSON features. The features don't make any sense and are only used for load tests by me.

Install
-----
```
npm install randomgeojson
```


Usage
-----
```javascript
var randomGeoJson = require('randomgeojson');

var features = randomGeoJson.generateGeoJSON({number: 10});
````

Options
-----
```javascript
var options = {
  number: 1, //Number of features to be generated
  bbox: [-180, -90, 180, 90], //lon1, lat1, lon2, lat2
  featureTypes: ['Point', 'LineString', 'Polygon'],
  maxCoordCount: 20 //maximal number of coordinates for a Polygon or LineString
};
````


Author
-----
Dennis Wilhelm, 2014