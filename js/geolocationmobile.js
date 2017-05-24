// JavaScript Document

/* ============================================================
====================== FUNKCJE OBSŁUGI GPS ====================
============================================================= */
$(document).bind('pagecreate', function(){
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
			return false;
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
/* ======================== *** end *** ====================== */