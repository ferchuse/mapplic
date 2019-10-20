/* Landing page scripts */
$(document).ready(function() {
	$('.usage').click(function(e) {
		e.preventDefault();
		$('.editor-window').slideToggle(200);
	});
	
	$(document).on('mousemove', '.mapplic-layer', function(e) {
		var map = $('.mapplic-map'),
		x = (e.pageX - map.offset().left) / map.width(),
		y = (e.pageY - map.offset().top) / map.height();
		$('.mapplic-coordinates-x').text(parseFloat(x).toFixed(4));
		$('.mapplic-coordinates-y').text(parseFloat(y).toFixed(4));
	});
	
	$('.editor-window .window-mockup').click(function() {
		$('.editor-window').slideUp(200);
	});
});



$(document).ready(function() {
	
	
	var map = $('#mapplic').mapplic({
		source: 'locations/diospadre.json',
		height: 560,
		hovertip: true,
		mapfill: true,
		lightbox: true,
		thumbholder: true,
		developer: true,
		fillcolor: '#495360',
		closezoomout: true,
		minimap: false,
		fullscreen: true,
		zoomMargin: 0,
		maxscale: 2
	});
	
	
	var self = map.data('mapplic');
	
	
	$("#form_locations").submit( function saveLocation(e){
		
		var source_json;
		e.preventDefault();
		console.log("Guardar Ubicacion")
		
		$.getJSON(self.o.source, function(data) {
			source_json = data;
			
			console.log("Data", self.o )
			
			new_location = 
			{
				"id": $("#id_location").val(),
				"title": $("#title").val(),
				"about": $("#about").val(),
				"description": $("#description").val(),
				"category": $("#category").val(),
				"x": $("#x").val(),
				"y": $("#y").val(),
				"zoom": "2",
				"pin": $("#pin").val()
			};
			
			if($("#action").val() == "new"){
				//Inserta una nueva ubicacion
				source_json.levels[0].locations.push(new_location);
				
			}
			else{
					//Actualiza la ubicacion
				source_json.levels[0].locations.[new_location.id] =  new_location;
				
			}
			
			
			console.log("New data", source_json);
			
			$.ajax({
				url: "update_json.php",
				method: "POST",
				data: {
					"json": JSON.stringify(source_json),
					"filename": self.o.source
					
				}
				
				}).done(function(respuesta){
				
				alert(respuesta);
				console.log(respuesta);
				
			})
			
			}).fail(function() { // Failure: couldn't load JSON file or it is invalid.
			console.error('Couldn\'t load map data. (Make sure to run the script through web server)');
			
		});
		
		
		
		<!-- $(this).find("input").each(function(index, item){ -->
			<!-- new_locations =  -->
			
		<!-- }) -->
	});
	
	
	// EVENTS
	// Map ready
	map.on('mapready', function(e, self) {
		// console.log('Map is ready!')
		// console.log('self', self);
		// console.log('map', map);
		// console.log('self.lat', self.lat);
		// console.log('location.lat', self.lat);
		
		$(".mapplic-layer :not(a)").click( function newLocation(e){
			console.log("newLocation()")
			$("#form_locations")[0].reset();
			
			let x_coord = $('.mapplic-coordinates-x').text();
			let y_coord = $('.mapplic-coordinates-y').text();
			
			
			
			$("#x").val(x_coord.substring(0, x_coord.length - 5));
			$("#y").val(y_coord.substring(0, y_coord.length - 5));
			
			
			$(".pin_form").show();
			$("#action").val("new");
			$("#form_locations").show();
			
			
		})
		// self grants direct access to the map object
		// The map will be focused on the washing machine by default
		//self.moveTo(0.67, 0.62, 3, 0);
		
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var location = self.l['pos'];
				location.lat = position.coords.latitude;
				location.lng = position.coords.longitude;
				self.updateLocation('pos');
			});
		}
		else console.log('Geolocation is disabled.');
	});
	
	
	// Location opened
	map.on('locationopened', function locationopened(e, location) {
		// location grants full access to the location
		// console.log(location.title + ' opened.');
		console.log("locationopened" , location);
		
		
		$("#action").val("update");
		$("#id_location").val(location.id) 
		$("#title").val(location.title) 
		$("#about").val(location.about) 
		$("#description").val(location.description) 
		$("#category").val(location.category) 
		$("#x").val(location.x) 
		$("#y").val(location.y) 
		$("#pin").val(location.pin) 
		
		$(".pin_form").show();
		
		$("#form_locations").show();
	});
	
	// Location closed
	map.on('locationclosed', function(e) {
		console.log('Location closed.');
	});
	
	
	$('.mapplic-layer').on('click', function(e) {
		var x = (e.pageX - self.map.offset().left) / self.map.width(),
		y = (e.pageY - self.map.offset().top) / self.map.height();
		<!-- $('.mapplic-coordinates-x').text(parseFloat(x).toFixed(4)); -->
		<!-- $('.mapplic-coordinates-y').text(parseFloat(y).toFixed(4)); -->
		
		console.log("X coordinate", x );
		console.log("y coordinate", y );
	});
	
	// Level switched
	map.on('levelswitched', function(e, level) {
		console.log('Switched to ' + level + ' level.');
	});
	
	// Position changed
	map.on('positionchanged', function(e, self) {
		// self grants direct access to the map object
		//console.log('Pan or zoom performed, current scale: ' + self.scale);
	});
	
	// METHODS
	// Getting mapplic object
	
	
	
});


//https://dev.to/deinsoftware/how-to-make-crud-operations-in-json-12he