/* ============================================================
========================= FORMULARZ DANYCH =====================
============================================================= */
$(document).bind('pagecreate', function(){
    
$('#submit').click(function(){
	$('div#error').hide(0, function(){
	$(this).text('')});
	
		var formall = new checkForm('gps', 'vehicle');
		if (formall.checkid()){
			ajaxConnx (formall.checkid())
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
});
/* ======================== *** end *** ====================== */






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
					alert('ERROR');
				} else {
					$('#form-1').hide();
					$('div#error').slideDown(200, function(){
						$(this).html(result)});
					$('div#addphoto').fadeIn(100, function(){
						$('#image-id').val(json['id']);
						});
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