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
	var i = 0;
	
	
	
	// Request the photo URL and metadata.
	photoRequest.onreadystatechange = function() {
		if (photoRequest.readyState == 4 && photoRequest.status == 200) {
			// Parse the GeoJSON into a JS object.
			var requestData = JSON.parse(photoRequest.responseText);
			var photoResults = requestData.photos.photo;

			// Store the metadata about each photo for later.
			for (i; i < photoResults.length; i++) {
				console.log("In photorequest " + i);
				photos.push({});
				photos[i].id = photoResults[i].id;
				photos[i].photoURL = 'https://farm'+ photoResults[i].farm + '.static.flickr.com/'+ photoResults[i].server + '/' + photoResults[i].id + '_' + photoResults[i].secret + '_m.jpg';
				photos[i].htmlstring = '<img src="' + photos[i].photoURL + '">';
				photos[i].contentString = '<div id="content">' + photos[i].htmlstring + '</div>';
				photos[i].photoTitle = photoResults[i].title;
				
				var coordRequest = new XMLHttpRequest();
				
				coordRequest.onreadystatechange = function() {
					if (coordRequest.readyState == 4 && coordRequest.status == 200) {
						// Parse the GeoJSON into a JS object.
						console.log("In coordrequest " + i);
						var coordinateData = JSON.parse(coordRequest.responseText);
			
						// Store the coordinates of each photo for later.
						photos[i].latitude = coordinateData.photo.location.latitude;
						photos[i].longitude = coordinateData.photo.location.longitude;
						
					} else if (photoRequest.status != 0 && photoRequest.status != 200) {
						alert("Retrieving Flickr photo coordinates failed with HTTP response: " + photoRequest.status);
					}
				};
				
						// Make the location API request for each photo.
						coordRequest.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation" +
							"&api_key=" + flickrAPIKey +
							"&photo_id=" + photos[i].id +
							"&format=json&nojsoncallback=1", false);
						coordRequest.send();
						
						routeKMLExporter.addPoint(photos[i].photoTitle, photos[i].contentString, photos[i].longitude, photos[i].latitude);
						console.log("Point added " + photos[i].photoTitle);
			}
			
		} else if (photoRequest.status == 4 && photoRequest.status != 200) {
			alert("Retrieving Flickr photos failed with HTTP response: " + photoRequest.status);
		}
	};
			
	photoRequest.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
		"&api_key=" + flickrAPIKey +
		"&tags=melbourne&has_geo=1&format=json&nojsoncallback=1", false);
	photoRequest.send();
			
			updateMap();
	
}
