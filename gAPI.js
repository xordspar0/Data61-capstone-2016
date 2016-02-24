var gDirectionsService;
var gDirectionsDisplay;

function initMap() {
	gDirectionsService = new google.maps.DirectionsService();
	gDirectionsDisplay = new google.maps.DirectionsRenderer();
	var gMap = new google.maps.Map(document.getElementById("map-canvas"), {
		zoom: 8,
		center: { lat: -37.811106, lng: 144.962160 }
	});
	gDirectionsDisplay.setMap(gMap);
}

function calcRoute() {
	var request = {
		origin: "Ballarat, VIC",
		destination: "Melbourne, VIC",
		travelMode: google.maps.TravelMode.DRIVING
	};
	gDirectionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			// [0..311] lat: 123 lng: 123
			var coordPairs = [];
			for (var i = 0; i < result.routes[0].overview_path.length; i++) {
				coordPairs.push(
					{ lng: result.routes[0].overview_path[i].lng(),
					  lat: result.routes[0].overview_path[i].lat()
					});
			}
			var kmlDoc = exportKML(coordPairs);
			
			var downloadButton = document.getElementById("download-button");
			downloadButton.setAttribute("href", "data:application/vnd.google-earth.kml+xml;charset=utf-8,"
				+ encodeURIComponent(kmlDoc));
			downloadButton.setAttribute("style", "");
			
			gDirectionsDisplay.setDirections(result);
		}
		else {
			alert("Directions request failed with the error: " + status);
		}
	});
}
