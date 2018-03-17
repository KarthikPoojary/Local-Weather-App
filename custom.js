var url='';
var long;
var lat;
var celsius;
var farhen;
var lastUpdate;
var click=0;
//Get Latitude and Longitude
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadnShowPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Display and Store Latitude and Longitude
function loadnShowPosition(position) {
  long = position.coords.longitude;
  lat = position.coords.latitude;
  $('#lat').html("Latitude : " + lat);
  $('#long').html("Longitude : " + long);
  url = "https://api.apixu.com/v1/current.json?key=77e3ffd4ee724808966110441170906&q=" + lat + "," + long;
  getWeather();

}

function getWeather(){  
  $.ajax( {
      url: url,
      success: function(data) {
        console.log(url);
        celsius = data.current.temp_c;
        farhen = data.current.temp_f;
        $('#temp').html(celsius + " &#8451");
        $('#weather').html(data.current.condition.text);
        lastUpdate=(data.current.last_updated).split(' ');
        lastUpdate[0]=lastUpdate[0].split("-").reverse().join("-");
        $('#lastUpdate').html("(Last updated on " + lastUpdate[0] + " at " + lastUpdate[1] + ")");
        $("#icon").attr("src",data.current.condition.icon);
        var cel='<a class = "tempUnit" onclick="getCelsius()">&#8451</a>'
        var fah='<a class = "tempUnit" onclick="getFahren()">&#8457</a>'
        if(click==0){
          $('#celsius').prepend(cel);
          $('#fahren').prepend(fah);
          click++;
        }
        
      },
      cache: false
    });
}

function getFahren(){
  $('#temp').html(farhen + " &#8457");
}
function getCelsius(){
  $('#temp').html(celsius + " &#8451");
}