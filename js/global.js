// JavaScript Document



$(document).ready(function(){
	$('#start-desc-button').click(function(){
		$('#start-desc').toggle(200);
		
		return false;
		});
	
	var idcontrol = document.getElementById('id-control').value
	var cookieName = idcontrol + "-motolokalizator"; // Każda strona przedmiotu ustawia swoje cookie
	
	
/* ============================================================
========================= OCENY ===============================
============================================================= */
	$('div#reviews a').click(function(){
		
		var valreviews = $(this).attr('id');
		var  valueattr = new Array (2);
		
		
	if (idcontrol != ''){
		
		if (showCookie(cookieName)){
			if (showCookie(cookieName) == 1 &&  valreviews == 'plus'){ //cofnij ocenę pozytywną
			
				ajaxConn (1, 1, idcontrol, 2);
				deleteCookie(cookieName);

			}
			else if (showCookie(cookieName) == 0 &&  valreviews == 'minus'){ //cofnij ocenę negatywną
				ajaxConn (1, 1, idcontrol, 3);
				deleteCookie(cookieName);

			}
			else if (showCookie(cookieName) == 1 &&  valreviews == 'minus'){ //cofnij ocenę pozytywną dodaj negatywną
				ajaxConn (1, 1, idcontrol, 4);
				deleteCookie(cookieName)
				setCookie(cookieName, 0, 7);
			}
			else if (showCookie(cookieName) == 0 &&  valreviews == 'plus'){ //cofnij ocenę negatywną dodaj pozytywną
				ajaxConn (1, 1, idcontrol, 5);
				deleteCookie(cookieName)
				setCookie(cookieName, 1, 7);
			}
			
		} else {
			if (valreviews == 'plus'){
				valueattr[0] = 1;
				valueattr[1] = 0;
			} else if (valreviews == 'minus'){
				valueattr[0] = 0;
				valueattr[1] = 1;
			}
			ajaxConn (valueattr[0], valueattr[1], idcontrol, 1);
			setCookie(cookieName, valueattr[0], 7)
		}
			
	} /* end ID */
		

			return false;
		
			});

	
});






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
	
	

	
	
	
