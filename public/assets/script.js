$(document).ready(() => {
  getLocation();
});

function getLocation() {
  var zipcode;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log(err)
    }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA0y58q6vvoOb1bhsjvoPh_B3QwZjw-SWg`)
    .then((response )=> {
    zipcode = response.data.results[0].address_components[8].long_name;
      getPet();
    })
    .catch((err) => {
      console.log(err);
    });
  }

function getPet(){
  axios.get('/pet')
  .then((response )=> {
    $('.loading-image').hide();
    let data = response.data.name;
    let media = data.media.photos.photo[2].$t;
    let description = data.description.$t;

    $('.name').html(data.name.$t);
    $('.animal').html(data.animal.$t);
    $('.description').html(description);
    $('.media').attr('src', media);
    $('.sex').html(data.sex.$t);
    $('.size').html(data.size.$t);
    $('.email').html(data.contact.email.$t);
    $('.phone').html(data.contact.phone.$t);
    console.log(data)
    })
    .catch((err) => {
      console.log(err);
    });
};

function getInfo(){
  $('.content-container').toggle();
  $('.name, .description').toggle();

}
