<style type="text/css">
	html { height: 100% }
	body { height: 100%; margin: 0; padding: 0 }
	#map-canvas { height: 100% }
</style>

<script src="https://maps.googleapis.com/maps/api/js?sensor=false">
</script>

<?php
	print("var Latitude = " . $Latitude . ";\n");
	print("var Longitude = " . $Longitude . ";\n");
	print("</script>\n");
?>

<body>
	<?php
		include("ylp-data.php");
		$Latitude = 33.452945;
		$Longitude = -111.949678;
		$SearchTerm = "mexican";
		
		if(isset($_POST) && isset($_POST["search-term"])
		&& strlen($_POST["search-term"]))
			$SearchTerm = $_Post["search-term"];
		
		$SearchAreaText = "";
		
		if(isset($_POST) && isset($_POST["search-area"])
		&& strlen($_POST["search-area"]))
			$SearchAreaText = $_POST["search-area"];
		
		if($SearchAreaText != null && strlen($SearchAreaText)>0)
		{
			print("\t//GeoDataLookup For: " . $SearchAreaText . "\n");
			$SearchArea = array(array("street-address" => $SearchAreaText));
			$SearchArea = GetGeoData($SearchArea);
			$Latitude = $SearchArea[0]["lat-long"][0];
			$Longitude = $SearchArea[0]["lat-long"][1];
		}
		
		else
		{
			$SearchAreaText = "Phoenix Zoo";
		}
		
		print("\t//Search AreaText: " . $SearchAreaText . "\n");
		print("\tvar Latitude = " . $Latitude . ";\n");
		print("\tvar Longitude = " . $Longitude . ";\n");
		print("tvar SearchTerm = \"" . $SearchTerm . "\";\n");
	?>
	
	<div id="main-content">
		<div id="map-sidebar">
			<form action="content-aggregation-standalone-final.php"
			method="post">
				<fieldset>
					<legend>Search</legend>
					Find:
					<input type="text" name="search-term"
					value="<?php print($SearchTerm); ?>"/>
					Near:
					<input type="text" name="search-area"
					value="<?php print($SearchAreaText); ?>"/>
					<input type="submit" name="search"
					value="Go" />
				</fieldset>
			</form>
			<br/>
			<div id="powered-by">
				<a href="http://www.mapquest.com">
				<img src="../images/powered-by-google-on-white.png"
				alt="Google Maps Logo" width="100"
				height="30"></a>
				<br/>
				<a href="http://www.yelp.com">
				<img src="http://s3-media4.ak.yelpcdn.com/assets/2/www/img/7e704c57a423/developers/yelp_logo_75x38.png"
				alt="Yelp Logo" width="80" height="30"></a>
				<br/>
				<a href="http://www.mapquest.com">
				<img src="http://content.mqcdn.com/winston-312/cdn/dotcom3/images/logos/logo.png"
				alt="Map Quest Logo" width="100" height="50"></a>
			</div>
		</div>
		<div id = "map-canvas"/>
	</div>
</body>

<script type = "text/javascript">
google.maps.event.addDomListener(window, 'load', initialize);

function initialize()
{
	var ZoomLevel = 12;
	var LatLng = new google.maps.LatLng(Latitude, Longitude);
	var mapOptions = {
		center: LatLng,
		zoom: ZoomLevel,
		mapTypeID: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	var pinColor = "11FF11";
	var pinImage = new google.maps.MarkerImage(
		"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"
		+pinColor,
		new google.maps.Size(21,34),
		new google.maps.Point(0,0),
		new google.maps.Point(10,34));
	
	var marker = new google.maps.Marker(
		{
			position: LatLng,
			icon: pinImage,
			map: map,
			title: <?php print("\"" . $SearchAreaText . "\""); ?>
		});
	
	<?php
		$Data = GetEnhancedYelpData($Latitude, $Longitude, $SearchTerm);
		for($i=0; $i<count($Data); ++$i)
		{
			$Address = "";
			if(count($Data[$i]["location"]["address"])>0)
				$Address = $Data[$i]["location"]["address"][0];
			
			print("\t\t"new google.maps.Marker( {
				position: new google.maps.LatLng(" .
					$Data[$i]["lat-long"][1] . "),
					map: map,
					title: \"" . $Data[$i]["name"] . "\\n"
					. $Address . "\\n"
					. $Data[$i]["location"]["city"]. ", "
			. $Data[$i]["location"]["state_code"] . "\"
			});"\n");
		}
?>
}
</script>

