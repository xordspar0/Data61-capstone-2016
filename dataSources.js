function importSocialMedia() {
	// Get the GeoJSON file.
	var socialMediaData;
	var demoXMLHttpRequest = new XMLHttpRequest();
	demoXMLHttpRequest.onreadystatechange = function() {
		if (demoXMLHttpRequest.readyState == 4 && demoXMLHttpRequest.status == 200) {
			// Parse the text of the response into a JS object.
			socialMediaData = JSON.parse(demoXMLHttpRequest.responseText);

			// Add each point to the KML document.
			var photoURL;
			var htmlstring;
			var contentString;
			var photoTitle;
			var latitude;
			var longitude;
			
			//Variable to be deleted once addPoint function accomodates separate latitude and longitude
			var pointCoords;
			
			for (var i = 0; i < socialMediaData.photo.length; i++) {
				photoURL = 'https://farm'+ socialMediaData.photo[i].farm + '.static.flickr.com/'+ socialMediaData.photo[i].server + '/' + socialMediaData.photo[i].id + '_' + socialMediaData.photo[i].secret + '_m.jpg';
				htmlstring = '<img src="' + photoURL + '">';
				contentString = '<div id="content">' + htmlstring + '</div>';
				photoTitle = socialMediaData.photo[i].title;
				latitude = socialMediaData.photo[i].latitude;
				longitude = socialMediaData.photo[i].longitude;

				//Change to support latitude and longitude separately
				demoKMLExporter.addPoint(photoTitle, contentString, pointCoords);
			}

			alert("Retrieving data was successful.");
		} else if (demoXMLHttpRequest.status != 0 && demoXMLHttpRequest.status != 200) {
			alert("Retrieving data failed with HTTP response: " + demoXMLHttpRequest.status);
		}
	};

	demoXMLHttpRequest.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8425bb55f2c56baebbde2f8c980189c5&tags=melbourne&has_geo=1&format=json&nojsoncallback=1", true);
	demoXMLHttpRequest.send();

	setTimeout(function () {
		var kmlDoc = demoKMLExporter.getKML();
	
		var downloadButton = document.getElementById("download-button");
		downloadButton.setAttribute("href", "data:application/vnd.google-earth.kml+xml;charset=utf-8,"
			+ encodeURIComponent(kmlDoc));
		downloadButton.setAttribute("style", "");
	}, 1000);
}
