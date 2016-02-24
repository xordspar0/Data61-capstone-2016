function exportKML(coordPairs) {
	// Build the string to put as a text node in the LineString.
	var routeCoordString = "";
	for (var i = 0; i < coordPairs.length; i++) {
		routeCoordString += coordPairs[i].lng + "," + coordPairs[i].lat + "," + 0 + " ";
	}
	
	var kmlns = "http://www.opengis.net/kml/2.2"
	var kmlroot = document.implementation.createDocument(kmlns, "kml", null);
	var Document = document.createElementNS(kmlns, "Document");
	kmlroot.documentElement.appendChild(Document);
	var styleGoodRoute = document.createElementNS(kmlns, "Style");
		styleGoodRoute.setAttribute("id", "good-route");
		Document.appendChild(styleGoodRoute);
		var LineStyle = document.createElementNS(kmlns, "LineStyle");
		styleGoodRoute.appendChild(LineStyle);
		var Color = document.createElementNS(kmlns, "Color");
		LineStyle.appendChild(Color);
		Color.appendChild(document.createTextNode("ff00ff00"));
	var styleBadRoute = document.createElementNS(kmlns, "Style");
		styleBadRoute.setAttribute("id", "bad-route");
		Document.appendChild(styleBadRoute);
		var LineStyle = document.createElementNS(kmlns, "LineStyle");
		styleBadRoute.appendChild(LineStyle);
		var Color = document.createElementNS(kmlns, "Color");
		LineStyle.appendChild(Color);
		Color.appendChild(document.createTextNode("ff0000ff"));
	var route1 = document.createElementNS(kmlns, "Placemark");
		Document.appendChild(route1);
		var route1Name = document.createElementNS(kmlns, "name")
		route1.appendChild(route1Name);
		route1Name.appendChild(document.createTextNode("mockup"));
		var route1Style = document.createElementNS(kmlns, "styleUrl");
		route1.appendChild(route1Style);
		route1Style.appendChild(document.createTextNode("good-route"));
		var route1LineString = document.createElementNS(kmlns, "LineString");
			route1.appendChild(route1LineString);
			route1Coords = document.createElementNS(kmlns, "coordinates");
			route1LineString.appendChild(route1Coords);
			route1Coords.appendChild(document.createTextNode(routeCoordString));
	
	var s = new XMLSerializer();
	return s.serializeToString(kmlroot);
}
