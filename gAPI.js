var gDirectionsService;
var gMap;
var kmlLayer;


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
	var originString = document.getElementById("originBox").value.toString();
	var destinationString = document.getElementById("destinationBox").value.toString();
	var routeRequest = {
		origin: originString,
		provideRouteAlternatives: true,
		destination: destinationString,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	calcRoute(routeRequest, function () {
			var isFlickrChecked = document.getElementById("check1").checked;
			if(isFlickrChecked==false)
				updateMap();
	});

}

function calcRoute(request, callback) {
	gDirectionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			
			var coordPairs;

			var numRoutes = result.routes.length;
			var distances = [];
			for(var j = 0; j < result.routes.length; j++){
				console.log(j);
				distances.push(result.routes[j].legs[0].distance.value)
			}
			distanceRankings = rankArrayByIndex(distances);  
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
				routeKMLExporter.addRoute(coordPairs, distanceRankings[j], numRoutes);
			}

			return callback();
		}
		else {
			alert("Directions request failed with the error: " + status);
		}
	});
}

function rankArrayByIndex(arrayToSort){
			sortedArray = arrayToSort.slice();
			sortedArray.sort(function(a, b){return a-b});
			arrayRankings = [];
			for(var x = 0; x < arrayToSort.length; x++){
				for(var y = 0; y < sortedArray.length; y++){
					if(arrayToSort[x] === sortedArray[y]){
						arrayRankings.push(y);
					}
				}
			}
			return (arrayRankings);
}
