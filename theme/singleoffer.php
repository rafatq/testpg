<?php

$id_get = $_GET['id'];

	if ( (int) $id_get){
		
		$db_array = array (HOST, DBNAME, USER, PASS, TABLE1);
		$baza = new DB_actions($db_array);
		$offers = $baza->db_select($id_get);
		
		
		foreach ($offers as $row){
			$data = $row['data'];
			$nazwa = $row['nazwa'];
			$gps = $row['gps'];
			$rejestracja = $row['rejestracja'];
			$cena = $row['cena'];
			$rocznik = $row['rocznik'];
			$opis = $row['opis'];
			$telefon = $row['telefon'];
			$miejscowosc = $row['miejscowosc'];
			$tak = $row['tak'];
			$nie = $row['nie'];
			$id = $row['id'];
		}
		
		if ( file_exists ('images/'.$id_get.'.jpg')){
			
			$path_image = 'images/'.$id_get.'.jpg';
		}
		else if (file_exists ('images/'.$id_get.'.gif')){
			$path_image = 'images/'.$id_get.'.gif';
		}
		else if (file_exists ('images/'.$id_get.'.png')){
			$path_image = 'images/'.$id_get.'.png';
		}
		else {
			$path_image = 'images/image_not_exist.jpg';
		}
	}
	
	$gpsexpl = explode(' ', $gps);
	$google_maps_link = 'https://www.google.pl/search?q='.$gpsexpl[0].' '.$gpsexpl[1];
	?>	
<div id="single-offer">
		<section>
        	<header>
				<div id="date-offer"><p><?php echo $data; ?></p></div>
                <h2><?php echo $nazwa;?></h2>
            </header>
            <input type="hidden" value="<?php echo $id;?>" id="id-control"/>
            <section>
				<div id="image-container"><img src="<?php echo $path_image;?>" alt="<?php echo $nazwa;?>" /></div>
                <!-- BLOK OCEN -->
                <div id="reviews"><span id="reviews-up"><?php echo $tak;?></span><a href="#plus" id="plus" alt="<?php echo $id;?>">+</a><span id="reviews-down"><?php echo $nie;?></span><a href="#minus" id="minus" alt="<?php echo $id;?>">-</a></div>
                
                
                <div id="description-single-offer">
                	<div class="description-single-offer">
                    	<p>GPS: <a href="<?php echo $google_maps_link;?>" target="_blank" title="zobacz w google maps" data-role="button" data-icon="arrow-r"><b><?php echo $gps;?></b> </a></p>
                    </div>
                    <div class="description-single-offer">
                    	<p>MIEJSCOWOŚĆ: <b><?php echo $miejscowosc;?> </b></p>
                    </div>
                    <div class="description-single-offer">
                    	<p>ROK PRODUKCJI: <b><?php echo $rocznik;?> </b></p>
                    </div>
                    <div class="description-single-offer">
                    	<p>NR TABLIC: <span><b><?php echo $rejestracja;?></b></span></p>
                    </div>
                    <div class="description-single-offer">
                    	<p id="price-single-offer">CENA: <span><b><?php echo $cena;?> PLN</b></span></p>
                    </div>
                    <div class="description-single-offer">
                    	<p>TELEFON: <span><b><?php echo $telefon;?></b></span></p>
                    </div>
                     <div class="description-single-offer">
                    	<p>OPIS:</p>
                        <p id="desc-single-offer"><?php echo $opis;?></p>
                    </div>
                
                </div>
            </section>
        </section>
      </div>