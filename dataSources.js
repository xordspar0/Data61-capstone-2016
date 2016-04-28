/*
 * importFlicker(): Import photos from Flickr that are relevant to our map and
 * put them into the KML document.
 * 
 * The Flickr API requires one call for the photos themselves and a separate one
 * for the coordinates, so there are two API calls here. After retrieving and
 * parsing both of the responses, make a point in the KML document for each
 * photo.
 */
function importFlickr() {
	var flickrAPIKey = "507f246fac5f95dfdedde2c2b939de5e";
	var photos = [];
	
	// Make the two API requests.
	
	var photoRequest = new XMLHttpRequest();
	var coordRequest = new XMLHttpRequest();
	
	// Request the photo URL and metadata.
	photoRequest.onreadystatechange = function() {
		if (photoRequest.readyState == 4 && photoRequest.status == 200) {
			// Parse the GeoJSON into a JS object.
			var requestData = JSON.parse(photoRequest.responseText);
			var photoResults = requestData.photos.photo;

			// Store the metadata about each photo for later.
			for (var i = 0; i < photoResults.length; i++) {
				photos.push({});
				photos[i].id = photoResults[i].id;
				photos[i].photoURL = 'https://farm'+ photoResults[i].farm + '.static.flickr.com/'+ photoResults[i].server + '/' + photoResults[i].id + '_' + photoResults[i].secret + '_m.jpg';
				photos[i].htmlstring = '<img src="' + photos[i].photoURL + '">';
				photos[i].contentString = '<div id="content">' + photos[i].htmlstring + '</div>';
				photos[i].photoTitle = photoResults[i].title;
			}
		} else if (photoRequest.status == 4 && photoRequest.status != 200) {
			alert("Retrieving Flickr photos failed with HTTP response: " + photoRequest.status);
		}
	};
	
	// Request the coordinates of a photo.
	var currentPhotoIndex = 0; // Used to keep track of which photo to add the coordinates to.
	coordRequest.onreadystatechange = function() {
		if (coordRequest.readyState == 4 && coordRequest.status == 200) {
			// Parse the GeoJSON into a JS object.
			var requestData = JSON.parse(coordRequest.responseText);
			
			// Store the coordinates of each photo for later.
			// (currentPhotoIndex is defined outside this function and will be
			// referenced using closure.)
			photos[currentPhotoIndex].latitude = requestData.photo.location.latitude;
			photos[currentPhotoIndex].longitude = requestData.photo.location.longitude;
			currentPhotoIndex++;
		} else if (photoRequest.status != 0 && photoRequest.status != 200) {
			alert("Retrieving Flickr photo coordinates failed with HTTP response: " + photoRequest.status);
		}
	};

	photoRequest.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
		"&api_key=" + flickrAPIKey +
		"&tags=melbourne&has_geo=1&format=json&nojsoncallback=1", true);
	photoRequest.send();
	
	setTimeout(function () {
		// Make the location API request for each photo.
		for (var i = 0; i < photos.length; i++) {
			coordRequest.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation" +
				"&api_key=" + flickrAPIKey +
				"&photo_id=" + photos[i].id +
				"&format=json&nojsoncallback=1");
			coordRequest.send();
		}
	}, 1000);

	setTimeout(function () {
		// Add a point for each photo to the KML document.
		for (var i = 0; i < photos.length; i++) {
			routeKMLExporter.addPoint(photos[i].photoTitle, photos[i].contentString, photos[i].longitude, photos[i].latitude);
		}
		
		// (Re)load the "Download KML" button.
		var kmlDoc = routeKMLExporter.getKML();
	
		var downloadButton = document.getElementById("download-button");
		downloadButton.setAttribute("href", "data:application/vnd.google-earth.kml+xml;charset=utf-8,"
			+ encodeURIComponent(kmlDoc));
		downloadButton.setAttribute("style", "");
	}, 20000);
}
