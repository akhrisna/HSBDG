
// ready, set, go
$(document).ready(function(){

	// init on all page
	// activate menu
	$('.toggle-menu').jPushMenu();

	/* hide head */
	$('header').ingestHead({
		className: 'stuck',
		top: 50
	});

	/* parallax
	$('.splash').parallax("50%", 0.2);*/

	// homepage
	if(isPage("home-pg")) {

		// init map 
		initMap();
	}   
});

// google map
var initMap = function(){

	// components
	var map, image, marker, infoWindow;

	// settings
	var	mapOptions = {
			id : "map",
			latitude : -6.897949,
			longitude : 107.613766,
			zoom : 15,
			scrollwheel: false,
  			disableDoubleClickZoom: true,
  			disableDefaultUI: true
		},
		markerOptions = {
			url : 'img/ui/ic-marker.png',
			width : 60,
			height: 60,
			centerWidth : 30,
			centerHeight: 30
		},
		infoWindowOptions = {
			content : $('#info-window').html(),
			offsetX : 230,
			offsetY : 135
		};
	
	// creating a LatLng object containing the coordinate for the center of the map
	// also adding the map style
	var latlng = new google.maps.LatLng(mapOptions.latitude, mapOptions.longitude),
		myOptions = {
		    zoom: mapOptions.zoom,
		    center: latlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    scrollwheel: mapOptions.scrollwheel,
  			disableDoubleClickZoom: mapOptions.disableDoubleClickZoom,
  			disableDefaultUI: mapOptions.disableDefaultUI,
		    styles: [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}]
		};
	
	// initialize map
	map = new google.maps.Map(document.getElementById(mapOptions.id), myOptions);
	
	// initialize the image of marker
	image = new google.maps.MarkerImage(markerOptions.url,
		new google.maps.Size(markerOptions.width, markerOptions.height), // This marker is 60 pixels wide by 60 pixels tall.
		new google.maps.Point(0,0), // The origin for this image is 0,0.
		new google.maps.Point(markerOptions.centerWidth, markerOptions.centerHeight) // The anchor for this image is the base of the flagpole at 30, 30
	);
	
	// initialize the marker itself
	marker = new google.maps.Marker({
		position: latlng, 
		map: map,		
		icon: image
	});
	
	// initialize info window
	infoWindow = new google.maps.InfoWindow({  
		content:  infoWindowOptions.content,
		pixelOffset: new google.maps.Size(infoWindowOptions.offsetX,infoWindowOptions.offsetY)
	}); 

	// open map by default
    infoWindow.open(map, marker);
    
    // event listener
    // on marker click
    google.maps.event.addListener(marker, 'click', function() {

    	// open infoWindow if close and pan the map to the center
    	infoWindow.open(map, marker);
    	map.panTo(latlng);
    });

    // on infoWindow dom ready
    google.maps.event.addListener(infoWindow, 'domready', function () {
    	
    	// ingest css class to style the info window
    	var $boxParent = $('.gm-style-iw').parent();
    	$boxParent.addClass('gw-style-box');

    	// find the bottom arrow & hide them (the ones which has style border-top: 24px)
    	$boxParent.find('div').each(function(){
    		if($(this).attr('style') !== undefined) {
    			if($(this).attr('style').indexOf("24px") > -1) {

    				// hide them
	    			$(this).css({ 'display': 'none'});
	    		}
    		}
    	});
    });
};

// check page
var isPage = function(pageName){
	if($('.'+pageName).length !== -1) { return true; } else { return false; }
};