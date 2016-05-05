/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*            Itinerary Visualization on Australia's National Map
*  			
*                                Data61                     
*                                                                       
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*   
*              Name: app.js
*     Creation Date: 4/28/2016
*            Author: J.Christiansen, J.Osborne, R.Clayton, S.Warne
*  
*     Description: This file contains functions that relate directly to
*                  the UI in our route application.
* 
*	  Code Review:	Code reviewed 5/02/2016 J.Christiansen, J.Osborne, 
*                                           R.Clayton, S.Warne
*  
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var routeKMLExporter = new KMLExporter();

function loadRoutes() {
	document.getElementById("download-button").style.visibility = "hidden";
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
	var kmlDoc = routeKMLExporter.getKML();
	var kmlDocUri = encodeURIComponent(kmlDoc);

	// Create a KML file with the given coordinates.
	var kmlFileRequest = new XMLHttpRequest();

	kmlFileRequest.open("POST", kmlFileGeneratorUrl, true);

	kmlFileRequest.onreadystatechange = function() {
		if (kmlFileRequest.readyState == 4 && kmlFileRequest.status == 200) {
			var kmlUrl = kmlFileRequest.responseText;

			// Update the embedded map on our page.
			kmlLayer.setUrl(kmlUrl);

		} else if (kmlFileRequest.readyState == 4 && kmlFileRequest.status == 200) {
			alert("Retreiveing KML file failed with HTTP response: " + kmlFileRequest.status);
		}
	};

	kmlFileRequest.send(kmlDoc);

	// Update the download button.
	var downloadButton = document.getElementById("download-button");
	downloadButton.setAttribute("href",
		"data:application/vnd.google-earth.kml+xml;charset=utf-8," +
		kmlDocUri);
	downloadButton.setAttribute("style", "");
}

