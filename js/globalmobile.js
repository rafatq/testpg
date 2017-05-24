// JavaScript Document

$(document).bind('pagecreate', function(){
	geoLocation ();
	$('div#reviews a').bind("click",function(){
		var idcontrol = $(this).attr('alt');
		
		
		if (idcontrol != ''){
			var valreviews = $(this).attr('id');
			var cookieName = idcontrol + "motolokalizator";
			
			if (showCookie(cookieName)){
				var issetCookie = showCookie(cookieName);
				
				if (valreviews == 'plus' && issetCookie == 0){ // Jeżeli jest ciastko i ma wartość zero
					deleteCookie(cookieName);
					setCookie(cookieName, 1, 7);
					ajaxConn (1, 1, idcontrol, 5);
				}
				else if (valreviews == 'plus' && issetCookie == 1){ // Jeżeli jest ciastko i ma wartość zero
					deleteCookie(cookieName);
					setCookie(cookieName, 1, 7);
					ajaxConn (1, 1, idcontrol, 2);
				}
				else if (valreviews == 'minus' && issetCookie == 0){ // Jeżeli jest ciastko i ma wartość zero
					deleteCookie(cookieName);
					setCookie(cookieName, 0, 7);
					ajaxConn (1, 1, idcontrol, 3);
				}
				else if (valreviews == 'minus' && issetCookie == 1){ // Jeżeli jest ciastko i ma wartość zero
					deleteCookie(cookieName);
					setCookie(cookieName, 0, 7);
					ajaxConn (1, 1, idcontrol, 4);
				}
			}else {
				if (valreviews == 'plus'){
					setCookie(cookieName, 1, 7);
					ajaxConn (1, 0, idcontrol, 1);	
				}
				else if (valreviews == 'minus'){
					setCookie(cookieName, 0, 7);
					ajaxConn (0, 1, idcontrol, 1);
					
				}
			}
		}
		return false;
	});

$('#submit').click(function(){
	$('div#error').hide(0, function(){
	$(this).text('')});
	
		var formall = new checkForm('gps', 'vehicle');
		if (formall.checkid()){
			ajaxConnX(formall.checkid())
		} else {
			$('div#error').slideDown(200, function(){
				$(this).text('WYPEŁNIJ WYMAGANE POLA (*gps, *nazwa)')});
		      }
		return false
	});
/* ======================== *** end *** ====================== */







/* ============================================================
========================= FORMULARZ ZDJĘĆ =====================
============================================================= */

		
	$('#form-2').submit(function() {
		var t = document.getElementById('uploadImage').value
		alert(t);
		$.ajax({
        	url: "php/upload_image.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
    	    cache: false,
			processData:false,
			dataType: 'json',
			beforeSend : function()
			{
				$("#load").fadeIn(100, function(){
					$(this).text('load...')});
			},
			success: function(json)
		    {
				var odp = json['resp'];
				if (odp == 1){
					$("#load").fadeOut(300, function(){
						$(this).text('');
							var govehicle = $('#govehicle').attr('href');
							setTimeout(function(){window.location.href = govehicle}, 1000)
						});
					
				} else alert('ERROR: LOAD MOBILE SCRIPT, IMAGE');
		    },
		  	error: function(e) 
	    	{
				alert('ERROR SERWER: LOAD MOBILE SCRIPT, IMAGE');
	    	} 	        
	   });
	   return false
	});

/* ======================== *** end *** ====================== */


// ==========================================================
// ================== OBSŁUGA SZABLONU ======================
//===========================================================
		$('#start-desc-button').click(function(){
			
			$('#start-desc').toggle()
			$('html, body').animate({scrollTop:1000}, 'slow');
			//return false
		});
});


// ==========================================================
// ================== AJAX ==================================
//===========================================================
function ajaxConn (a, b, c, d) {
	$.ajax({
   	 		type: "POST",   //typ połączenia na post
    		url: "php/db_ajax.php",
    		dataType : 'json', //ustawiamy typ danych na json
   		 		data: {
        			plus: a,
					minus: b,
					id: c,
					control: d // 1 - brak cookie, 2 - cookie z oceną na tak, 3 - cookie z oceną na nie;
    				},
    		success: function(json) {
        		jQuery.each(json, function(i, ob) {
            	console.log(i, ob);
				
				var ratingplus = json['rating-plus'];
				var ratingminus = json['rating-minus'];
				var control = json['control'];
				
					if (control == 1){
						document.getElementById('reviews-up').innerHTML = ratingplus;
						
					} else if (control == 2){
						document.getElementById('reviews-down').innerHTML = ratingminus;
					
					} else if (control == 3){
						document.getElementById('reviews-up').innerHTML = ratingplus;
					
					} else if (control == 4){
						document.getElementById('reviews-down').innerHTML = ratingminus;
					
					} else if (control == 5){
						document.getElementById('reviews-up').innerHTML = ratingplus;
						document.getElementById('reviews-down').innerHTML = ratingminus;
					
					} else if (control == 6){
						document.getElementById('reviews-up').innerHTML = ratingplus;
						document.getElementById('reviews-down').innerHTML = ratingminus;
					}
	
        		});
    		},
    		complete: function() {
        
    			},
    		error: function() {
       			 console.log( "Wystąpił błąd w połączeniu :(");
    		}
		});
}


// ==========================================================
// ================== COOKIE FUNCTIONS ======================
//===========================================================

function setCookie(name, val, days) {
    if (days) {
        var data = new Date();
        data.setTime(data.getTime() + (days * 24*60*60*1000));
        var expires = "; expires="+data.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + val + expires + "; path=/";
}

function showCookie(name) {
    if (document.cookie!="") { //jeżeli document.cookie w ogóle istnieje
        var cookies=document.cookie.split("; ");  //tworzymy z niego tablicę ciastek
        for (var i=0; i<cookies.length; i++) { //i robimy po niej pętlę
            var cookieName=cookies[i].split("=")[0]; //nazwa ciastka
            var cookieVal=cookies[i].split("=")[1]; //wartość ciastka
            if (cookieName===name) {
                return decodeURI(cookieVal) //jeżeli znaleźliśmy ciastko o danej nazwie, wtedy zwracamy jego wartość
            }
        }
    }
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/* ============================================================
============ FUNKCJE OBSŁUGI DANYCH FORMULARZA ================
============================================================= */

// |||||||||||||||||| FUNKCJA WALIDACJI FORMULARZA ||||||||||

function checkForm(a,b){
	this.oneid = document.getElementById(a).value
	this.twoid = document.getElementById(b).value
	this.checkid = function(){
		if (this.oneid !='' && this.twoid !=''){
			var out = new Array (this.oneid, document.getElementById('place').value, this.twoid, document.getElementById('year').value, document.getElementById('price').value, document.getElementById('board').value, document.getElementById('telephone').value, document.getElementById('description').value);
			return out;
		}
		return false
	}
}


function ajaxConnX (a) {
	$.ajax({
   	 		type: "POST",  
    		url: "php/db_form.php",
    		dataType : 'json', 
   		 		data: {
        			gps: a[0],
					place: a[1],
					vehicle: a[2],
					year: a[3],
					price: a[4],
					board: a[5],
					telephone: a[6],
					description: a[7]
    				},
    		success: function(json) {
        		jQuery.each(json, function(i, ob) {
            	console.log(i, ob);
				
				var result = json['add'];
				if (result === false){
					alert('ERROR FORM VALIDATE');
				} else {
					$('#form-1').hide();
					$('div#error').slideDown(200, function(){
						$(this).html(result)});
					$('div#addphoto').fadeIn(100, function(){
						$('#image-id').val(json['id']);
						});
					$('html, body').animate({scrollTop: 100}, 'slow');
					}
        		});
    		},
    		complete: function() {
        
    			},
    		error: function() {
       			 console.log( "Wystąpił błąd w połączeniu :(");
    		}
		});
}
/* ======================== *** end *** ====================== */

/* ============================================================
====================== FUNKCJE OBSŁUGI GPS ====================
============================================================= */


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