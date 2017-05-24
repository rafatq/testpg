<?php 
$db_array = array (HOST, DBNAME, USER, PASS, TABLE1);
$baza = new DB_actions($db_array);
$offers = $baza->db_select(0);
?>
	<div id="offers">
	<table>
    	<thead>
        	<tr><th>LP</th><th>GPS</th><th>MARKA / MODEL</th><th>ROCZNIK</th><th>CENA</th><th>LINK</th></tr>
        </thead>

<?

$autoincr = 1;

foreach ($offers as $row){
     
	 echo '<tr><td>'.$autoincr.'</td><td>'.$row['gps'].'</td><td class="vehicle-name">'.$row['nazwa'].'</td><td>'.$row['rocznik'].'</td><td>'.$row['cena'].' PLN</td><td><a data-role="button" href="http://polmak.ayz.pl/?show=singleoffer&id='.$row['id'].'">ZOBACZ</a></td></tr>';
     			
$autoincr++;
	}
?>

	</table>
	</div>