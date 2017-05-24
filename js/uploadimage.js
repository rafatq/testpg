

$(document).ready(function (e) {
	$("#form-2").on('submit',(function(e) {
		e.preventDefault();
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
				//$("#preview").fadeOut();
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
					
				} else alert('ERROR');
		    },
		  	error: function(e) 
	    	{
				alert(200);
	    	} 	        
	   });
	}));
});