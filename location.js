function geocode(e){
    
    var location = //input from form
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        address:location,
        key:'' // this should be an google maps api key
      }
    })
    .then(function(response){
      
      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      
    })
    .catch(function(error){
      console.log(error);
    });
  }