function exportKML(){
	var kmlns = "http://www.opengis.net/kml/2.2"
	var kmlroot = document.implementation.createDocument (kmlns, "kml", null);
	var Document = document.createElement("Document");
	kmlroot.documentElement.appendChild(Document);
	var styleGoodRoute = document.createElement("Style");
		styleGoodRoute.setAttribute("id", "good-route");
		Document.appendChild(styleGoodRoute);
		var LineStyle = document.createElement("LineStyle");
		styleGoodRoute.appendChild(LineStyle);
		var Color = document.createElement("Color");
		LineStyle.appendChild(Color);
		var hexcode1 = document.createTextNode("ff00ff00");
		Color.appendChild(hexcode1);
	var styleBadRoute = document.createElement("Style");
		styleBadRoute.setAttribute("id", "bad-route");
		Document.appendChild(styleBadRoute);
		var LineStyle = document.createElement("LineStyle");
		styleBadRoute.appendChild(LineStyle);
		var Color = document.createElement("Color");
		LineStyle.appendChild(Color);
		var hexcode1 = document.createTextNode("ff0000ff");
		Color.appendChild(hexcode1);
	var route1 = document.createElement("Placemark");
		Document.appendChild(route1);
		var route1Name = document.createElement("name")
		route1.appendChild(route1Name);
		var route1NameText = document.createTextNode("mockup");
		route1Name.appendChild(route1NameText);
		var route1Style = document.createElement("styleUrl");
		route1.appendChild(route1Style);
		var route1StyleURL = document.createTextNode("good-route");
		route1Style.appendChild(route1StyleURL);
		var route1LineString = document.createElement("LineString");
			route1.appendChild(route1LineString);
			route1Coords = document.createElement("coordinates");
			route1LineString.appendChild(route1Coords);
			route1CoordsValues = document.createTextNode("143.841,-37.553,0 144.951,-37.799,0");
			route1Coords.appendChild(route1CoordsValues);
	
	var s = new XMLSerializer();
	return s.serializeToString(kmlroot);
}
