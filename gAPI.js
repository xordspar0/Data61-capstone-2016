var gDirectionsService;
var gMap;

var currentRating = "good"; //temporary for demo

function initMap() {
	gDirectionsService = new google.maps.DirectionsService();
	gMap = new google.maps.Map(document.getElementById("map-canvas"), {
		zoom: 8,
		center: { lat: -37.811106, lng: 144.962160 }
	});
}

/*
 * Define some demo routes to display and call the Google API on each one.
 */
function requestRoutes() {
	var route1request = {
		origin: "Ballarat, VIC",
		provideRouteAlternatives: true,
		destination: "Melbourne, VIC",
		travelMode: google.maps.TravelMode.DRIVING
	};
	//var route2request = {
/* 		origin: "Ballarat, VIC",
		destination: "Melbourne, VIC",
		waypoints: [{location: "Geelong, VIC", stopover: false}],
		travelMode: google.maps.TravelMode.DRIVING
	}; */
	
	var route1Coords = calcRoute(route1request);
	//var route2Coords = calcRoute(route2request);
	
	// Delay before updating the download button so that the asyncronous calls
	// to the Google Directions Service have time to finish.
	setTimeout(function () {
		var kmlDoc = demoKMLExporter.getKML();
	
		var downloadButton = document.getElementById("download-button");
		downloadButton.setAttribute("href", "data:application/vnd.google-earth.kml+xml;charset=utf-8,"
			+ encodeURIComponent(kmlDoc));
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
				demoKMLExporter.addRoute({coordinates: coordPairs, rating: currentRating}, distanceRankings[j], numRoutes);
			}
			

			var gDirectionsDisplay = new google.maps.DirectionsRenderer();
			gDirectionsDisplay.setMap(gMap);
			gDirectionsDisplay.setDirections(result);
			
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

