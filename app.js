/*
 * app.js
 *
 * These functions are things that relate directly to the  UI in our route
 * application.
 */

var routeKMLExporter = new KMLExporter();

function loadRoutes() {
	var isFlickrChecked = document.getElementById("check1").checked;
	requestRoutes(); // gAPI.js
	if(isFlickrChecked == true){
		importFlickr(); // dataSources.js
	}
}

/*
 * Update our map and download link. This must be called after the embedded map
 * has been initialized.
 */
function updateMap() {
	var kmlFileGeneratorUrl = "http://107.170.62.53/wsgi/kmlFileGenerator.py";
	var kmlDocUri = encodeURIComponent(routeKMLExporter.getKML());

	// Create a KML file with the given coordinates.
	var kmlFileRequest = new XMLHttpRequest();

	kmlFileRequest.open("POST", kmlFileGeneratorUrl, true);

	kmlFileRequest.onreadystatechange = function() {
		if (kmlFileRequest.readyState == 4 && kmlFileRequest.status == 200) {
			var kmlUrl = kmlFileRequest.responseText.replace(".com/", ".com/raw/");

			// Update the embedded map on our page.
			kmlLayer.setUrl(kmlUrl);

		} else if (kmlFileRequest.readyState == 4 && kmlFileRequest.status == 200) {
			alert("Retreiveing KML file failed with HTTP response: " + kmlFileRequest.status);
		}
	};

	kmlFileRequest.send(kmlDocUri);

	// Update the download button.
	var downloadButton = document.getElementById("download-button");
	downloadButton.setAttribute("href",
		"data:application/vnd.google-earth.kml+xml;charset=utf-8," +
		kmlDocUri);
	downloadButton.setAttribute("style", "");
}

