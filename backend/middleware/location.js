require('dotenv').config();

const Geocodio = require('geocodio-library-node');
const geocoder = new Geocodio(process.env.GCD_API_KEY);
function locationCalculator(address) {
  return geocoder
    .geocode(address)
    .then((response) => {
      return {
        lat: response.results[0].location.lat,
        lng: response.results[0].location.lng,
      };
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports =locationCalculator;