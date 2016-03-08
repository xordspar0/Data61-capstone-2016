function importSocialMedia() {
	// Get the GeoJSON file.
	var socialMediaData;
	var demoXMLHttpRequest = new XMLHttpRequest();
	demoXMLHttpRequest.onreadystatechange = function() {
		if (demoXMLHttpRequest.readyState == 4 && demoXMLHttpRequest.status == 200) {
			// Parse the text of the response into a JS object.
			socialMediaData = JSON.parse(demoXMLHttpRequest.responseText);

			// Add each point to the KML document.
			var pointName;
			var pointText;
			var pointCoords;
			for (var i = 0; i < socialMediaData.features.length; i++) {
				pointName = socialMediaData.features[i].properties.NAME;
				pointText = socialMediaData.features[i].properties.TEXT;
				pointCoords = socialMediaData.features[i].geometry.coordinates;

				demoKMLExporter.addPoint(pointName, pointText, pointCoords);
			}
		}
	};

	demoXMLHttpRequest.open("GET", "mockupTweets.geojson", true);
	demoXMLHttpRequest.send();

	setTimeout(function () {
		var kmlDoc = demoKMLExporter.getKML();
	
		var downloadButton = document.getElementById("download-button");
		downloadButton.setAttribute("href", "data:application/vnd.google-earth.kml+xml;charset=utf-8,"
			+ encodeURIComponent(kmlDoc));
		downloadButton.setAttribute("style", "");
	}, 1000);
}
