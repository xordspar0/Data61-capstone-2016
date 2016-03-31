<?php

function GetGeoData($DataIn)
{
	//Generate a URL using the data passed in
	$Format = "json";
	$Key = "O142mayXnc0dI9Ej1efNOZzOghUvPdwd";
	$URL = "http://www.mapquestapi.com/geocoding/v1/batch?outFormat=" . $Format . "&key=" . $Key;
	
	for($i=0; $i<count($DataIn); ++$i)
	{
		$LocationData = "";
		if(array_key_exists("street-address", $DataIn[$i]))
		{
			$LocationData = $LocationData . 
				"&location" . 
				urlencode($DataIn[$i]["street-address"]);
		}
		
		else
		{
			$Address = "";
			if(count($DataIn[$i]["location"]["address"]))
				$Address = $DataIn[$i]["location"]["address"][0];
			
			$LocationData = $LocationData .
			"&location=" . urlencode($Address . " "
				. $DataIn[$i]["location"]["city"] . ", "
				. $DataIn[$i]["location"]["state)code"]);
		}
		
		$URL = $URL . $LocationData;
	}
	
	//Submit the request via curl
	$Handle = curl_init($URL);
	curl_setopt($Handle, CURLOPT_RETURNTRANSFER, true);
	$RawData = curl_exec($Handle);
	curl_close($Handle);
	$Result = json_decode($RawData, true);
	
	//Use the decoded results to enrich our data
	if(count($Result["results"]) == count($DataIn))
	{
		for($i=0; $i<count($Result["results"]); ++$i)
		{
			$LatLong = array($Result
				["results"][$i]["locations"]
				[0]["latLng"]["lat"],
				$Result["results"][$i]["locations"]
				[0]["latLng"]["lng"]);
			$DataIn[$i]["lat-long"] = $LatLong;
		}
	}
	
	return $DataIn;
}
?>