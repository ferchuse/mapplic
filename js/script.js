/* Landing page scripts
	
	
	let result = fruits.filter(fruit => fruit.length > 6);
	
*/


function findObjectByKey(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return array[i];
		}
	}
	return null;
}

function getCategories(categories) {
	let categorias = categories.filter(category => category.id );
	
	
	console.log();
}

function findIndexByKey(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return i;
		}
	}
	return null;
}



function equalsId(element) {
  return element == $("#id_location".val());
}


var source_json;

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
		source: $("#source").val(),
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
	
	
	$("#btn_borrar").click(function deleteLocation(){
		console.log("deleteLocation()");
		let id= $("#id_location").val();
		
		loadJsonData().done(function(response){
			
	
		console.log("locations", response.levels.locations);
		
		let findIndex = response.levels.findIndex(equalsId);
		console.log("findIndex", findIndex)
		
		var location_index = findIndexByKey(response.levels[0].locations, "id", $("#id_location").val())
		
		console.log("location_index", location_index);
		response.levels[0].locations[location_index].splice(location_index);
		
			
		})
	
	}
	);
	
	
	function loadJsonData(){
		
		return $.getJSON($("#source").val());
	}
	
	
	
	$("#form_locations").submit( function saveLocation(e){
		
		
		e.preventDefault();
		console.log("Guardar Ubicacion")
		
		$.getJSON($("#source").val(), function(data) {
			source_json = data;
			
			console.log("Data", self.o )
			console.log("source_json", source_json )
			
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
			else{	var location_index = findIndexByKey(source_json.levels[0].locations, "id", $("#id_location").val())
				
				console.log("location_index", location_index);
				source_json.levels[0].locations[location_index] =  new_location;
				
				//Actualiza la ubicacion
				// var obj = $.grep(objArray, function(obj){return obj.id === 3;})[0];	
				
			}
			
			
			console.log("New JSON", source_json);
			
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
				window.location.reload(true);
				
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
			
			console.log("x_coord", x_coord);
			console.log("y_coord", x_coord);
			
			
			// $("#x").val(x_coord.substring(0, x_coord.length - 5));
			// $("#y").val(y_coord.substring(0, y_coord.length - 5));
			
			
			$("#x").val(x_coord);
			$("#y").val(y_coord);
			
			
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