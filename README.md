Data61 Capstone Project 2016
============================

This is a Web application that enables the user to choose a route. See the full
description in the wiki: https://github.com/xordspar0/Data61-capstone-2016/wiki

Extensibility
-------------

The application was designed with extensibility in mind. There are a few ways
someone might want to extend the application, and we have done our best to
support this.

Currently, our application only has one external data source: Flickr. Ideally,
there should be others, such as Yelp and Foursquare. More data sources can be
added as functions in `dataSources.js`. New functions added there have two
responsibilities: 1) they should add features that need to go on the map using
the `routeKMLExporter` object, and 2) when all of the features have been added,
they should call `updateMap()`, which loads the new map into the Google map and
updates the download link.

The application is also designed to be able to support more route evaluation
criteria. Currently, we only evaluate routes based on distance, because this is
the only data we have about routes. To add criteria such as time or number of
popular attractions, a numerical evaluation of this data should be passed in an
array to `RankArrayByIndex()` in `gAPI.js`. More styles would also need to be
made in `KMLExporter.js` to visualize the criteria differently.

Issues
------

There are some issues to be aware of when working on this application.

1. To load a KML file into the Google map, you need to host the KML file on a
publicly accessible server, and it needs to end in ".kml".

2. Currently, we host our KML files on a pastebin service so that they are
accessible to Google. If we had known about the restrictions of Google Maps
earlier, we probably would have simply written some server-side code to
generate KML files and return a publically accessible URL.

3. Google Maps does not have complete support of KML. It disregards some style
information when loading KML files. You can load the same KML files in Google
Earth or National Map and the styles will work fine.

4. Our code for retrieving the latitude and longitude of pictures from Flickr
makes synchronous calls to the Flickr API. This is very slow. For a couple
hundred photos, it takes several minutes. During this time, the application is
unresponsive. This really should be done asynchronously and in parallel, but we
didn't have time to work that out.
