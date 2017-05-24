<?php
require_once ('db_settings.php');
require_once ('db_connect.php');

if ($_POST['gps'] && $_POST['vehicle']){
	$insert = array (null, $_POST['gps'], $_POST['place'], $_POST['vehicle'], $_POST['year'], $_POST['price'], $_POST['board'], $_POST['description'], $_POST['telephone']);
				$db_array = array (HOST, DBNAME, USER, PASS, TABLE1);
				$base = new DB_actions($db_array);
				$base -> db_add($insert);
				
				$offers = $base->db_select_max_id();
				foreach ($offers as $row){
					$result = trim($row['id']);
				}
				$resp['add'] =  '<div class="statement"><p>POJAZD ZOSTAŁ DODANY DO BAZY</p><p><a data-role="button" id="govehicle" href="http://polmak.ayz.pl/?show=singleoffer&id='.$result.'">STRONA POJAZDU</a></p></div>';
				$resp['id'] = $result;
		}
		
		else {
			$resp['add'] = false;
			$resp['id'] = false;
		}

		



echo json_encode($resp);



?>