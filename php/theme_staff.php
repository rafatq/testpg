<?php


class ThemeStaff {
	
	private $getid;
	
	public function __construct ($getid){
		
		$this -> getid = $getid;
		
		
		
	}
	
	
	public function AddSiteName (){
		if ($_GET[$this -> getid] == 'offers'){
				return 'oferty';
			}
		else if ($_GET[$this -> getid] == 'singleoffer'){
				return 'strona pojazdu';
			}
		else return 'baza pojazdów';
	}
	
	public function IncludeSite (){
		if ($_GET[$this -> getid] == 'offers'){
				require_once ('theme/header.php');
				require_once ('theme/offers.php');
				require_once ('theme/footer.php');
			}
		else if ($_GET[$this -> getid] == 'singleoffer'){
				require_once ('theme/header.php');
				require_once ('theme/singleoffer.php');
				require_once ('theme/footer.php');
			}
		else if ($_GET[$this -> getid] == 'start'){
				require_once ('theme/header.php');
				require_once ('theme/addoffer.php');
				require_once ('theme/footer.php');
			}	
	}
	
	public function IncludeStart (){
		if ($_GET[$this -> getid] == 'offers'){
				
			}
		else if ($_GET[$this -> getid] == 'singleoffer'){
				
			}
		else if ($_GET[$this -> getid] == 'start'){
				
			}
		else require_once ('theme/start.html');	
	}
	
}

?>