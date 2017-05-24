<?php
class DB_actions {
	
	private $dbh; // uchwyt bazy
	private $rec; // pobranbe rekordy
	
	private $host;
	private $db_name;
	private $user;
	private $pass;
	private $table;
	
	public function __construct ($array){
		
			$this -> host = $array[0];
			$this -> db_name = $array[1];
			$this -> user = $array[2];
			$this -> pass = $array[3];
			$this -> table = $array[4];
		
		try {
   				$this -> dbh = new PDO('mysql:host='.$this -> host.';dbname='.$this -> db_name, $this -> user, $this -> pass);
  			 	
			}   catch (PDOException $e) {
				$this -> dbh = null;
   				print "Error!: " . $e->getMessage() . "<br/>";
   			    die();
		   }
	 }
	 
	 
	
	
	public function db_select ($id){
		
		if ($id){
			return $this -> rec = $this -> dbh->query('SELECT * FROM '.$this -> table.' WHERE id='.$id.''); 
		}
		else{
			$date = date('Ymd', strtotime('-7 days'));
			return $this -> rec = $this -> dbh->query('SELECT * FROM '.$this -> table.' WHERE data >= '.$date.'  ORDER BY id DESC'); 	
			}
	}
	
	
	
	public function db_select_max_id (){
	
		 return $this -> rec = $this -> dbh->query('SELECT * FROM '.$this -> table.' WHERE ID IN (SELECT MAX(ID) FROM '.$this -> table.')');
	}
	
	
	
	
	public function db_add($array){
		
		$in = $this -> dbh -> prepare('INSERT INTO '.$this -> table.' (gps, miejscowosc, nazwa, rocznik, cena, rejestracja, opis, data, telefon) VALUES (:gps, :miejscowosc, :nazwa, :rocznik, :cena, :rejestracja, :opis, :data, :telefon)');  
		$in -> execute(array(':gps' => $array[1], ':miejscowosc' => $array[2], ':nazwa' => $array[3], ':rocznik' => $array[4], ':cena' => $array[5], ':rejestracja' => $array[6], ':opis' => $array[7], ':data' => date('Y-m-d'), ':telefon' => $array[8])); 
	}
	
	public function db_update($id, $rating, $val){ /* 1 zmienna to nr ID DB, 2 zmienna to nazwa kolumny oceny -> "tak "nie", 3 - oceny wtrażone w liczbie */
		
		$in = $this -> dbh -> prepare('UPDATE  '.$this -> table.' SET '.$rating.' =:'.$rating.' WHERE id=:id');  
		$in -> execute(array(':'.$rating.'' => $val, 'id' => $id)); 
	}
	
	
	
	
	public function __destruct(){
		$this -> dbh = null;
	}
}
?>