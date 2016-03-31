<?php

require_once ('OAuth.php');
function GetYelpData($Lat, $Long, $Term)
{
	$URL = "http://api.yelp.com/v2/search?ll=" .
	$Lat . "," . $Long . "&term=" . $Term;
	$ConsumerKey = "T2DjgHUDfXqCVXFdzQuEyg";
	$ConsumerSecret = "gC0W0kYmTKq9mrkN2CR1QmWAXuE";
	$Token = "lIaB6UdYdJaUkCYxuQQN7hmmd0fh2ZsF";
	$TokenSecret = "xOB7z9te3dltNHjPIeZ4si3oPjs";
	
	$AuthToken = new OAuthToken($Token, $TokenSecret);
	$Consumer = new OAuthConsumer($ConsumerKey, $ConsumerSecret);
	
	//Build OAuth Request
	$AuthRequest = OAuthRequest::
	from_consumer_and_token($Consumer, $AuthToken, 'GET', $URL);
	
	//Sign the request
	$AuthRequest->sign_request(new OAuthSignatureMethod_HMAC_SHA1(),
		$Consumer, $AuthToken);
	
	//Send Yelp API Call via Curl
	$Handle = curl_init($AuthRequest->to_url());
	curl_setopt($Handle, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($Handle, CURLOPT_HEADER, 0);
	
	//Yelp Response
	$YelpResponse = curl_exec($Handle);
	curl_close($Handle);
	
	//Decode the response and return
	return json_decode($YelpResponse, true);
}

include('mq-data.php');
function GetEnhancedYelpData($Lat, $Long, $Term)
{
	$Data = GetYelpData($Lat, $Long, $Term);
return GetGeoData($Data["businesses"]);
}

?>