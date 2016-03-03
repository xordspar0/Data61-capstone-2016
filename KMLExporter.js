var KMLExporter = function () {
	this.styleURLGood = "good-route";
	this.styleURLBad = "bad-route";
	this.xmlns = "http://www.opengis.net/kml/2.2";
	
	this.kmlroot = document.implementation.createDocument(this.xmlns, "kml", null);
	this.Document = document.createElementNS(this.xmlns, "Document");
		this.kmlroot.documentElement.appendChild(this.Document);
		var styleGoodRoute = document.createElementNS(this.xmlns, "Style");
			styleGoodRoute.setAttribute("id", this.styleURLGood);
			this.Document.appendChild(styleGoodRoute);
			var LineStyleGood = document.createElementNS(this.xmlns, "LineStyle");
			styleGoodRoute.appendChild(LineStyleGood);
			var colorGood = document.createElementNS(this.xmlns, "color");
			LineStyleGood.appendChild(colorGood);
			colorGood.appendChild(document.createTextNode("ff00ff00"));
		var styleBadRoute = document.createElementNS(this.xmlns, "Style");
			styleBadRoute.setAttribute("id", this.styleURLBad);
			this.Document.appendChild(styleBadRoute);
			var LineStyleBad = document.createElementNS(this.xmlns, "LineStyle");
			styleBadRoute.appendChild(LineStyleBad);
			var colorBad = document.createElementNS(this.xmlns, "color");
			LineStyleBad.appendChild(colorBad);
			colorBad.appendChild(document.createTextNode("ff0000ff"));
}

/**
 * Add a route to the document.
 * The route parameter has the format:
 * {coordinates: Array<{lng: number, lat: number}>, rating: string}
 * where the rating string is "good" or "bad".
 */
KMLExporter.prototype.addRoute = function (route) {
	console.log("entered addRoute");
	console.log(route);
	
	// Convert the list of coordinates to a KML-compliant string.
	var coordString = "";
	for (var i = 0; i < route.coordinates.length; i++) {
		coordString += route.coordinates[i].lng + "," + route.coordinates[i].lat + "," + 0 + " ";
	}
	
	var KMLRoute = document.createElementNS(this.xmlns, "Placemark");
		this.Document.appendChild(KMLRoute);
		var KMLRouteName = document.createElementNS(this.xmlns, "name");
		KMLRoute.appendChild(KMLRouteName);
		KMLRouteName.appendChild(document.createTextNode("mockup"));
		var KMLRouteStyle = document.createElementNS(this.xmlns, "styleUrl");
		KMLRoute.appendChild(KMLRouteStyle);
		var KMLRouteLineString = document.createElementNS(this.xmlns, "LineString");
			KMLRoute.appendChild(KMLRouteLineString);
			var KMLRouteCoords = document.createElementNS(this.xmlns, "coordinates");
			KMLRouteLineString.appendChild(KMLRouteCoords);
			KMLRouteCoords.appendChild(document.createTextNode(coordString));
			
	if (route.rating == "good") {
		KMLRouteStyle.appendChild(document.createTextNode(this.styleURLGood));
	} else if (route.rating == "bad") {
		KMLRouteStyle.appendChild(document.createTextNode(this.styleURLBad));
	}
	
	console.log(KMLRoute);
}

KMLExporter.prototype.getKML = function () {
	var s = new XMLSerializer();
	return s.serializeToString(this.kmlroot);
}