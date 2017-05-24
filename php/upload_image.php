<?php
require_once('functions.php');

if(isset($_FILES['image'])){
	$resp['resp'] = $_FILES['image']['name'];
	if ($_FILES['image']['size'] < 6*1024*1024) {
		if ( ($_FILES[ 'image' ][ 'type'] == 'image/jpeg' || $_FILES[ 'image' ][ 'type'] == 'image/gif' || $_FILES[ 'image' ][ 'type'] == 'image/png')){
			$image_name =  explode ('.', $_FILES['image']['name']);
			$lastelement = count($image_name) - 1;
			$image_new = $_POST['imageid'].'.'.$image_name[$lastelement];
			if (move_uploaded_file($_FILES['image']['tmp_name'], '../images/'.$image_new.'')){
					ImageReducing(500, '../images/'.$image_new.'');
					$resp['resp'] = 1;
				} else  $resp['resp'] = 0;
		} else  $resp['resp'] = 0;
	} else $resp['resp'] = 0;
}
else $resp['resp'] = 0;

echo json_encode($resp);
?>