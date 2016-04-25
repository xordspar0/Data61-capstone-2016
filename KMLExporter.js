var KMLExporter = function () {
	this.styleURLGood = "good-route";
	this.styleURLBad = "bad-route";
	this.styleURLYelp = "yelp-point";
	this.styleURLTweet = "tweet-point";
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
		var styleYelp =  document.createElementNS(this.xmlns, "Style");
			styleYelp.setAttribute("id", this.styleURLYelp);
			this.Document.appendChild(styleYelp);
			var LabelStyleYelp =  document.createElementNS(this.xmlns, "LabelStyle");
			styleYelp.appendChild(LabelStyleYelp);
			var colorYelp = document.createElementNS(this.xmlns, "color")
			LabelStyleYelp.appendChild(colorYelp);
			var colorModeYelp = document.createElementNS(this.xmlns, "colorMode")
			LabelStyleYelp.appendChild(colorModeYelp);
			colorYelp.appendChild(document.createTextNode("ff00ffff"));
			colorModeYelp.appendChild(document.createTextNode("normal"));
		var styleTweet =  document.createElementNS(this.xmlns, "Style");
			styleTweet.setAttribute("id", this.styleURLTweet);
			this.Document.appendChild(styleTweet);
			var LabelStyleTweet =  document.createElementNS(this.xmlns, "LabelStyle");
			styleTweet.appendChild(LabelStyleTweet);
			var colorTweet = document.createElementNS(this.xmlns, "color")
			LabelStyleTweet.appendChild(colorTweet);
			var colorModeTweet = document.createElementNS(this.xmlns, "colorMode")
			LabelStyleTweet.appendChild(colorModeTweet);
			colorTweet.appendChild(document.createTextNode("ffff0000"));
			colorModeTweet.appendChild(document.createTextNode("normal"));
			
			
}

/**
 * Add a route to the document.
 * The route parameter has the format:
 * {coordinates: Array<{lng: number, lat: number}>, rating: string}
 * where the rating string is "good" or "bad".
 */
KMLExporter.prototype.addRoute = function (route, distanceRanking, numRoutes) {
	// Convert the list of coordinates to a KML-compliant string.
	var coordString = "";
	var maxWidth = 10;
	var isDistanceChecked = document.getElementById("check2").checked;
	for (var i = 0; i < route.coordinates.length; i++) {
		coordString += route.coordinates[i].lng + "," + route.coordinates[i].lat + "," + 0 + " ";
	}
		
	if(isDistanceChecked == true){
		var routeWidth = (Math.floor(maxWidth*((numRoutes - distanceRanking)/numRoutes))).toString();
	} else {
		var routeWidth = maxWidth;
	}
	console.log("KMLExporter ran with distanceRanking:" + distanceRanking + " routeWidth: " + routeWidth +" numRoutes: "+numRoutes)
	
	var distanceStyle = document.createElementNS(this.xmlns, "Style");
		this.Document.appendChild(distanceStyle);
		distanceStyle.setAttribute("id", "distance-"+distanceRanking);
		var distanceLineStyle = document.createElementNS(this.xmlns, "LineStyle");
		distanceStyle.appendChild(distanceLineStyle);
		var distanceColor = document.createElementNS(this.xmlns, "color");
		distanceLineStyle.appendChild(distanceColor);
		distanceColor.appendChild(document.createTextNode("ff0000ff"));
		var distanceWidth = document.createElementNS(this.xmlns, "width");
		distanceLineStyle.appendChild(distanceWidth);
		distanceWidth.appendChild(document.createTextNode(routeWidth));
		
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
		
		KMLRouteStyle.appendChild(document.createTextNode("distance-"+distanceRanking));
			/*
	if (route.rating == "good") {
		KMLRouteStyle.appendChild(document.createTextNode(this.styleURLGood));
	} else if (route.rating == "bad") {
		KMLRouteStyle.appendChild(document.createTextNode(this.styleURLBad));
	}
	*/
}

KMLExporter.prototype.addPoint =  function(name, descriptionText, longitude, latitude) {
	
	var KMLPoint = document.createElementNS(this.xmlns, "Placemark");
		this.Document.appendChild(KMLPoint);
		var KMLPointName = document.createElementNS(this.xmlns, "name");
		KMLPoint.appendChild(KMLPointName);
		KMLPointName.appendChild(document.createTextNode(name));
		var KMLPointStyle = document.createElementNS(this.xmlns, "styleUrl");
		KMLPoint.appendChild(KMLPointStyle);
		var point = document.createElementNS(this.xmlns, "Point");
		KMLPoint.appendChild(point);
		var KMLcoordinates = document.createElementNS(this.xmlns, "coordinates");
		point.appendChild(KMLcoordinates);
		KMLcoordinates.appendChild(document.createTextNode(longitude+","+latitude+",0 "));
		var KMLdescription = document.createElementNS(this.xmlns, "description");
		KMLPoint.appendChild(KMLdescription);
		KMLdescription.appendChild(document.createTextNode(descriptionText));
		
		if (name == "Yelp"){
			KMLPointStyle.appendChild(document.createTextNode(this.styleURLYelp));
		} else if (name == "Tweet") {
			KMLPointStyle.appendChild(document.createTextNode(this.styleURLTweet));
		}
		
}

KMLExporter.prototype.getKML = function () {
	var s = new XMLSerializer();
	return s.serializeToString(this.kmlroot);
}
