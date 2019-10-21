<!DOCTYPE html>
<html>
	<head>
		<!-- Meta -->
		<meta charset="utf-8">
		<title></title>
		
		<!-- Viewport for Responsivity -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
		
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<!-- Favicon -->
		<link rel="shortcut icon" type="image/png" href="favicon.png"/>
		
		<meta name="description" content="Image map of an apartment, an example of using Mapplic, a premium custom interactive map plugin to display custom image or vector (SVG) maps.">
		
		<!-- Stylesheets -->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/magnific-popup.css">
		<link rel="stylesheet" type="text/css" href="mapplic/mapplic.css">
	</head>
	<body>
		<div id="wrap">
			
			
			<input type="hidden" id="source" value="locations/<?php echo basename(__FILE__,".php");?>.json">
			
			<!-- Site header -->
			<header id="header">
				
				
			</header>
			
			<!-- Site content -->
			<div id="content">
				
				<section id="map-section" class="inner over">
					
					<div class="map-container">
						<div id="mapplic"></div> <!-- Map -->
					</div>
					
					
				</section>
				
				
				
			</div>
			
			<!-- Site footer -->
			<footer id="footer" class="dark">
				
				
			</footer>
		</div>
		
		
		
		<div class="pin_form">
			<form id="form_locations" autocomplete="off">
				<input class="form-control input-sm" id="action" name="action" readonly hidden>
				<div class="">
					<label >ID	</label >
					<input class="form-control input-sm" id="id_location" name="id">
				</div>
				
				<div class="form-groups">
					<label >Titulo	</label >
					<input class="form-control " id="title" name="title">
				</div>
				
				<div class="form-groups">
					<label >Subtítulo	</label >
					<input class="form-control" id="about" name="about">
				</div>
				
				<div class="form-groups">
					<label >Descripción	</label >
					<input class="form-control" id="description" name="description">
				</div>
				
				<div class="form-groups">
					<label >Pin	(Clase CSS)</label >
					<input class="form-control" id="pin" name="pin">
				</div>
				
				<div class="form-groups">
					<label >Categoria	</label >
					<select id="category" name="category" class="form-control">
						<option value="locations">Servicios</option>
						<option value="sanitarios">Sanitarios</option>
						<option value="estacionamientos">Estacionamientos</option>
						<option value="Palapas">Palapas</option>
					</select>
				</div>
				
				<div class="form-groups">
					<label >X	</label >
					<input class="form-control" id="x" name="x">
					</div>
				
				<div class="form-groups">
					<label >Y	</label >
					<input class="form-control" id="y" name="y">
				</div>
				
				<button id="btn_borrar" class="btn btn-danger" type="button">
					Borrar
				</button>
				<button id="" class="btn btn-success">
					Guardar
				</button>
				
			</form>
		</div>
		
		<style>
			.pin_form{
			display: none;
			position :fixed;
			left :0px;
			top : 60px;
			width: 200px;
			background-color: #e0e0e0;
			}
		</style>
		
		<!-- Scripts -->
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
		<script type="text/javascript" src="mapplic/mapplic.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
		<script type="text/javascript" src="js/magnific-popup.js"></script>
		
	</body>
</html>		