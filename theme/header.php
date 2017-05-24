<?php $template = new ThemeStaff('show'); ?>
<div id="main"  data-role="page" data-title="Moto Lokaziator">
	<div id="content">
    	<header>
        	<h1 class="title-h1"><a data-role="button" data-icon="home" href="http://polmak.ayz.pl/">MotoLokalizator</a></h1>
            <h2 class="tagline"><?php echo $template->AddSiteName(); ?></h2>
         </header>
         
         <section>
        	<nav data-role="navbar">
            	<div id="navigation">
            	<ul class="menu" data-role="controlgroup" data-type="horizontal">
                	<li data-role="button"><a  href="http://polmak.ayz.pl?show=start">START</a></li>
            		<li data-role="button"><a  href="http://polmak.ayz.pl/?show=offers">OFERTY</a></li>
                </ul>
                </div>
            </nav>
        </section>
        
        <section>
        	<div data-role="content">