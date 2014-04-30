/**
 * Possible options for the generator
 */
var options = {
  number: 1, //Number of features to be generated
  bbox: [-180, -90, 180, 90], //lat1, lon1, lat2, lon2
  featureTypes: ['Point', 'LineString', 'Polygon'],
  maxCoordCount: 20 //maximal number of coordinates for a Polygon or LineString
};

/**
 * Generate random GeoJSON features
 * @param  {Object} opts configuration for the generator
 * @return {Object}      FeatureCollection with the random features
 */
module.exports.generateGeoJSON = function(opts) {
  extendObject(options, opts);
  return generateFeatures();
};

/**
 * Generates a Point
 * @return {Object} GeoJSON Point
 */

function generatePoint() {
  return {
    type: 'Feature',
    geometry: {
      coordinates: generateLonLat(),
      type: 'Point'
    },
    properties: {}
  };
}

/**
 * Generates a Polygon
 * @return {Object} GeoJSON Polygon
 */

function generatePolygon() {
  var coordNumber = getRandomNumber(3, options.maxCoordCount);

  var feature = rawFeature();
  feature.geometry.type = 'Polygon';
  feature.geometry.coordinates = [
    []
  ];

  var firstCoordinate = generateLonLat();

  feature.geometry.coordinates[0].push(firstCoordinate);
  addCoordinates(feature.geometry.coordinates[0], coordNumber - 2);
  feature.geometry.coordinates[0].push(firstCoordinate);

  return feature;
}

/**
 * Generates a LineString
 * @return {Object} GeoJSON LineString
 */

function generateLineString() {
  var coordNumber = getRandomNumber(3, options.maxCoordCount);

  var feature = rawFeature();
  feature.geometry.type = 'LineString';

  addCoordinates(feature.geometry.coordinates, coordNumber);

  return feature;
}

/**
 * Helper function to combine two objects
 * @param  {Object} obj1 Original object
 * @param  {Object} obj2 Object which will be iterated on
 * @return {Object}      Combined object
 */

function extendObject(obj1, obj2) {
  for (var i in obj2) {
    obj1[i] = obj2[i];
  }
}

/**
 * Creates a random number between two values
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number} random number
 */

function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * Randomly selects one of the allowed GeoJSON feature types (Point, LineString, Polygon)
 * @return {String} Feature Type
 */

function randomType() {
  return options.featureTypes[Math.floor(getRandomNumber(0, options.featureTypes.length - 1))];
}


/**
 * Creates a FeatureCollection and adds features
 * @return {Object} GeoJSON FeatureCollection
 */

function generateFeatures() {
  var collection = {
    type: 'FeatureCollection',
    features: []
  };

  for (var i = 0; i < options.number; i++) {
    collection.features.push(generateFeature(randomType()));
  }
  return collection;
}

/**
 * Generates different features based on the given feature type
 * @param  {String} type the feature type
 * @return {Object}      Feature
 */

function generateFeature(type) {
  switch (type) {
    case "Point":
      return generatePoint();
    case "LineString":
      return generateLineString();
    case "Polygon":
      return generatePolygon();
  }
}

/**
 * Creates a longitude/latitude array within the configured bounding box
 * @return {Array} [Lon, Lat]
 */

function generateLonLat() {
  return [
    getRandomNumber(options.bbox[0], options.bbox[2]),
    getRandomNumber(options.bbox[1], options.bbox[3])
  ];
}


/**
 * Adds a random coordinate to an array
 * @param {Array} coordArray the coordinate array
 * @param {Number} number     amount of coordinates which should be added
 */

function addCoordinates(coordArray, number) {
  for (var i = 0; i < number; i++) {
    coordArray.push(generateLonLat());
  }
}

/**
 * GeoJSON Feature without a type or coordinates
 * @return {Object} raw GeoJSON feature (not valid!)
 */

function rawFeature() {
  return {
    type: 'Feature',
    geometry: {
      coordinates: [],
      type: undefined
    },
    properties: {}
  };
}
