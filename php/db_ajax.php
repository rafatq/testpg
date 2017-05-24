<?php
	require_once ('db_settings.php');
	require_once ('db_connect.php');
	
		
		
		if ($_POST['id']){
			
			$id = (int) trim ($_POST['id']);
			
			$db_array = array (HOST, DBNAME, USER, PASS, TABLE1);
			$baza = new DB_actions($db_array);
			$offers = $baza->db_select($id);
			
			
			if ($_POST['control'] == 1){
			
				if ($_POST['plus'] == 1){
					foreach ($offers as $row){
						$rating = (int) $row['tak'];
						$rating ++;
						if ($rating){
							$baza->db_update($id, 'tak', $rating);
							result($rating, 0, 1);
						}
					}
				
				} else if ($_POST['plus'] == 0){
					foreach ($offers as $row){
						$rating = (int) $row['nie'];
						$rating ++;
						if ($rating){
							$baza->db_update($id, 'nie', $rating);
							result(0, $rating, 2);
						}
					}
				
				}
			
			
			} else  if ($_POST['control'] == 2){ /* cofnij ocenę pozytywną */
				foreach ($offers as $row){
					$rating = (int) $row['tak'];
					if ($rating >= 1){
						$rating--;
						$baza->db_update($id, 'tak', $rating);
						result($rating, 0, 3);
					}
					else result($rating, 0, 3);
					
				}
				
			} else  if ($_POST['control'] == 3){ /* cofnij ocenę pnegatywną */
				foreach ($offers as $row){
					$rating = (int) $row['nie'];
					if ($rating >= 1){
						$rating--;
						$baza->db_update($id, 'nie', $rating);
						result(0, $rating, 4);
					}
					else result(0, $rating, 4);	
				}
			}
			
			else  if ($_POST['control'] == 4){ /* cofnij ocenę pozytywną dodaj negatywną*/
				foreach ($offers as $row){
					$rating1 = (int) $row['tak'];
					$rating2 = (int) $row['nie'];
					if ($rating1 >= 1){
						$rating1--;
						$baza->db_update($id, 'tak', $rating1);
						$rating2++;
						$baza->db_update($id, 'nie', $rating2);
						result($rating1, $rating2, 5);
					} else {
						$baza->db_update($id, 'tak', $rating1);
						$rating2++;
						$baza->db_update($id, 'nie', $rating2);
						result($rating1, $rating2, 5);
					}	
				}
			}
			
			else  if ($_POST['control'] == 5){ /* cofnij ocenę negatywną dodaj pozytywną */
				foreach ($offers as $row){
					$rating1 = (int) $row['tak'];
					$rating2 = (int) $row['nie'];
					if ($rating2 >= 1){
						$rating2--;
						$baza->db_update($id, 'nie', $rating2);
						$rating1++;
						$baza->db_update($id, 'tak', $rating1);
						result($rating1, $rating2, 6);
					} else {
						$baza->db_update($id, 'nie', $rating2);
						$rating1++;
						$baza->db_update($id, 'tak', $rating1);
						result($rating1, $rating2, 6);
					}	
				}
			}	
		}
		
		
	function result($a, $b, $control){ /* control (1-6) */
		$result = array();
    	$result['rating-plus'] = $a;
		$result['rating-minus'] = $b;
		$result['control'] = $control;
    	echo json_encode($result);
	}
	


?>