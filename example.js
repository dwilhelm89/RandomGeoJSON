var randomGeoJson = require('./index.js');

var features = randomGeoJson.generateGeoJSON({number: 10});
console.log(JSON.stringify(features));

var point = randomGeoJson.generateGeoJSON({featureTypes: ['Point']});

var line = randomGeoJson.generateGeoJSON({featureTypes: ['LineString'], bbox: [51,7, 52,8]});
