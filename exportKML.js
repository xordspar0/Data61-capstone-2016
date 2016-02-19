function exportkml(){
	var kmlns = 'http://www.opengis.net/kml/2.2'
	var kmlroot = document.implementation.createDocument (kmlns, 'kml', null);
	var Document = document.createElement('Document');
	kmlroot.documentElement.appendChild(Document);
	var Style = document.createElement('Style');
	Style.setAttribute('id', 'good-route');
	Document.appendChild(Style);
	var LineStyle = document.createElement('LineStyle');
	Style.appendChild(LineStyle);
	var Color = document.createElement('Color');
	LineStyle.appendChild(Color);
	var hexcode1 = document.createTextNode("ff0000ff");
	Color.appendChild(hexcode1);
	var Style = document.createElement('Style');
	Style.setAttribute('id', 'good-route');
	Document.appendChild(Style);
	var LineStyle = document.createElement('LineStyle');
	Style.appendChild(LineStyle);
	var Color = document.createElement('Color');
	LineStyle.appendChild(Color);
	var hexcode1 = document.createTextNode("ff0000ff");
	Color.appendChild(hexcode1);
	
	document.write(kmlroot);
	
}