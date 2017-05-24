<?php
	
	if ($_POST['gps'] && $_POST['vehicle'] ){
		
		$check = 1;
		$contents = array();
		
		$gps = $_POST['gps'];
		$vehicle = $_POST['vehicle'];
		
			if ($_POST['year']){
				$year = trim ($_POST['year']);
				if ( (int) $year){
					if ($year <= (int) date ('Y') && $year > 1900 ){
							$check = 1;
						} else $check = 0;
					}
				else $check = 0;
			} else $year = '';
			
			if ($_POST['price']){
				$price = $_POST['price'];
				if ( (int) $price){
					if($price > 1){
						if ($check === 1){
							$check = 1;
						}
						else $check = 0;
					}  else $check = 0;
					
				} else $check = 0;
			} else $price = '';
			
			if ($_POST['board']){
				$board = $_POST['board'];
			} else $board = '';
			
			if ($_POST['telephone']){
				$telephone = $_POST['telephone'];
			} else $telephone = '';
			
			if ($_POST['place']){
				$place = $_POST['place'];
			} else $place = '';
			
			if ($_POST['description']){
				$description = $_POST['description'];
			} else $description = '';
			
			
			/* OBSŁUGA PRZESYŁANEGO PLIKU */
			if (is_uploaded_file($_FILES['image']['tmp_name'])) {
				if ($_FILES['image']['size'] > 4*1024*1024) {
					$check = 0;
					} else $check = 1;
				if ( ($_FILES[ 'image' ][ 'type'] == 'image/jpeg' || $_FILES[ 'image' ][ 'type'] == 'image/gif' || $_FILES[ 'image' ][ 'type'] == 'image/png') && $check === 1){
					$check = 1;
					} else $check = 0;
					if ($check === 1){
						$db_array = array (HOST, DBNAME, USER, PASS, TABLE1);
						$base = new DB_actions($db_array);
						$offers = $base->db_select_max_id();
						foreach ($offers as $row){
							$result = (int) trim($row['id']) + 1;
						}
						$image_name =  explode ('.', $_FILES['image']['name']);
						$image_new = $result.'.'.$image_name[1];
						move_uploaded_file($_FILES['image']['tmp_name'], 'images/'.$image_new.'');
					}
			} 
			
			
			if ($check === 1){
				$insert = array (null, $gps, $place, $vehicle, $year, $price, $board, $description, $telephone);
				$db_array = array (HOST, DBNAME, USER, PASS, TABLE1);
				$base = new DB_actions($db_array);
				$base -> db_add($insert);
				$contents[0] = 'Pojazd został dodany do bazy ofert:';
				
				$offers = $base->db_select_max_id();
				foreach ($offers as $row){
					$result = trim($row['id']);
				}
				echo '<div class="statement"><p>'.$contents[0].'</p><p><a data-role="button" href="http://polmak.ayz.pl/?show=singleoffer&id='.$result.'">STRONA POJAZDU</a></p></div>';
			}
			else if($check === 0){
				echo '<div class="statement"><p></p><p>POPRAW DANE FORMULARZA</p></div>';
				require_once ('theme/form.html');
			}
			
		
	}
	
	else {
		require_once ('theme/form.html');
	}

?>