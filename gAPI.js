var gDirectionsService;
var gDirectionsDisplay;

function initMap() {
	gDirectionsService = new google.maps.DirectionsService();
	gDirectionsDisplay = new google.maps.DirectionsRenderer();
	var gMap = new google.maps.Map(document.getElementById('map-canvas'), {
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
			//console.log(response.routes[0].overview_path[0].lat());
			exportkml();
			alert("success");
			gDirectionsDisplay.setDirections(result);
		}
		else {
			alert("Directions request failed with the error: " + status);
		}
	});
}
