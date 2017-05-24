// JavaScript Document
$(document).ready(function(e) {
    geoLocation ();
});

function geoLocation (){
	if (navigator.geolocation){
		var options = {
			enableHeighAccuaracy: true
		}
		return navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}
		else {
			return 777;
		}
}

function onSuccess(position){
	var gps = document.getElementById('gps');
	var message = '';
	var lat = position.coords.latitude;
	var lang = position.coords.longitude;
	gps.value = lat + ' ' + lang;
	gps.disabled = "dislabed";
}

function onError (){
	
}