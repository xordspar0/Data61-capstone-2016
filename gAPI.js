var gDirectionsService;
var gMap;
var kmlLayer;

var currentRating = "good"; //temporary for demo

function initMap() {
	// Initialize the map.
	gDirectionsService = new google.maps.DirectionsService();
	gMap = new google.maps.Map(document.getElementById("map-canvas"), {
		center: { lat: -37.811106, lng: 144.962160 },
		zoom: 8
	});

	// Initialize the KmlLayer.
	var kmlOptions = {
		map: gMap
	}
	kmlLayer = new google.maps.KmlLayer(kmlOptions);
}

/*
 * Define some demo routes to display and call the Google API on each one.
 */
function requestRoutes() {
	var routeRequest = {
		origin: "Ballarat, VIC",
		provideRouteAlternatives: true,
		destination: "Melbourne, VIC",
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	var routeCoords = calcRoute(routeRequest);
	
	// Delay before updating the download button so that the asyncronous calls
	// to the Google Directions Service have time to finish.
	setTimeout(function () {
		var kmlDoc = routeKMLExporter.getKML();
		kmlUrl = "data:application/vnd.google-earth.kml+xml;charset=utf-8,"
			+ encodeURIComponent(kmlDoc);
	
		// Update the map.
		kmlLayer.setUrl("https://developers.google.com/maps/tutorials/kml/westcampus.kml");

		// Update the download button.
		var downloadButton = document.getElementById("download-button");
		downloadButton.setAttribute("href", kmlUrl);
		downloadButton.setAttribute("style", "");
	}, 1000);

}

function calcRoute(request) {
	gDirectionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var coordPairs;

			var numRoutes = result.routes.length;
			var distances = [];
			for(var j = 0; j < result.routes.length; j++){
				console.log(j);
				distances.push(result.routes[j].legs[0].distance.value)
			}
			sortedDistances = distances.slice();
			sortedDistances.sort(function(a, b){return a-b});
			distanceRankings = []
			for(var x = 0; x < distances.length; x++){
				for(var y = 0; y < sortedDistances.length; y++){
					if(distances[x] === sortedDistances[y]){
						distanceRankings.push(y);
					}
				}
			}
			console.log(distanceRankings);
			for(var j = 0; j < result.routes.length; j++){
				coordPairs = [];
				for (var i = 0; i < result.routes[j].overview_path.length; i++) {
					coordPairs.push(
						{ lng: result.routes[j].overview_path[i].lng(),
						  lat: result.routes[j].overview_path[i].lat()
						});
				}
				console.log("distanceRanking of route " + j + " is " + distanceRankings[j]);
				routeKMLExporter.addRoute({coordinates: coordPairs, rating: currentRating}, distanceRankings[j], numRoutes);
			}
			
			//TODO: Get the rating from some external source.
			if (currentRating == "good") {
				currentRating = "bad";
			}
			else if (currentRating == "bad") {
				currentRating = "good";
			}

			return coordPairs;
		}
		else {
			alert("Directions request failed with the error: " + status);
		}
	});
}

