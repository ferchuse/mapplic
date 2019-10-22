

<?php
  header('Content-Type: text/plain');
  // $data = utf8_encode($_POST['json']); 
  // $data = json_decode($test);
	
	try{
		$bytes = file_put_contents($_POST['filename'], $data);
		// $bytes = file_put_contents("{$_POST['filename']}", $data);
		if($bytes){
			
			echo "Archivo Guardado".$bytes;
		}
		else{
			
			echo "Ocurrio un error".$bytes;
		}
		
		
	}
	catch(Exception $e) {
		echo  'Excepción capturada: '. $e->getMessage(). "\n";
	} 
	
	// var data = {
	// test: $( "#test" ).val()
	// };
	// var options = {
	// url: "test.php",
	// dataType: "text",
	// type: "POST",
	// data: { test: JSON.stringify( data ) }, // Our valid JSON string
	// success: function( data, status, xhr ) {
	
	// },
	// error: function( xhr, status, error ) {
	
	// }
	// };
	// $.ajax( options );
	
	// And with PHP we have to take care of the string encoding before using it:
	
	
	
?>
