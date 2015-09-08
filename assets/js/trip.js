
var tripList;

$(document).ready(function(){
	tripList = $.grep(trip, function(element,index) {
		return element;
	});
	$('.sub_menu ul').hide();


	var driverNames = [];
	$.each(tripList, function(i, trips) {
		$.each(trips.drivers, function(id, driver) {
			driverNames.push(driver.name);
		});
	});
	var driverMenu = "";
	$.each(driverNames, function(i, name) {
		var content = $('<li class="sub_menu">'+
			'<span>'+name+'</span>'+
			'<ul class="trip"></ul></li>');
			$.each(tripList, function(i, elm){
				$.each(elm.drivers, function(j, driver){
					if (driver.name === name) {
						tripArray = "<li class='trip_details' data-index="+i+" data-driver="+j+" >"+elm.name+"</li>";
						content.find(".trip").append(tripArray);
					}
				});
			});
			$('.drivers').append(content);
		});	

	$('.sub_menu > span').on('click',function() {
		$(this).parent('.sub_menu').find(' > ul').slideToggle();
	});
	$('.trip_details').on('click',function(){
		var tripIndex=$(this).data("index");
		var driverIndex=$(this).data("driver");
		$('.trip_info').show(1, function() {
			loadMap(tripIndex,driverIndex);
		});
		$('.home_wrap').hide();
	});
});


function loadMap(tripIndex,driverIndex) {
	var greyscale =[{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
	var neutralblue=[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}];
    var avocado=[{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#aee2e0"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#abce83"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]}];
    var lystoire=[{"featureType":"all","elementType":"geometry","stylers":[{"color":"#7897c1"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"saturation":"27"},{"lightness":"29"},{"gamma":"4.23"},{"hue":"#ff0000"},{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.icon","stylers":[{"hue":"#ff2f00"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"lightness":"0"}]}];
	var i=tripIndex;
	var d=driverIndex;
	var greyScaleSkin = new google.maps.StyledMapType( greyscale, {
	            name: "Greyscale"
	        });
	var neutralBlue = new google.maps.StyledMapType( neutralblue, {
	            name: "NeutralBlue"
	        });
	var avocadoWorld = new google.maps.StyledMapType( avocado, {
	            name: "Avocado World"
	        });
	var Lystoire = new google.maps.StyledMapType( lystoire, {
	            name: "Lystoire"
	        });


	var mapOptions = {
		center: {lat: tripList[i].route_details[0].lat, lng: tripList[i].route_details[0].lng},
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			  		style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			  		position: google.maps.ControlPosition.TOP_RIGHT,
				  	mapTypeIds: [
					  	google.maps.MapTypeId.ROADMAP, 
					  	google.maps.MapTypeId.SATELLITE,
					  	'greyScaleSkin',
					  	'neutralblueskin',
					  	'avocadoskin',
					  	'lystoireSkin'
				  	]
				}

	};
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	map.mapTypes.set( 'greyScaleSkin', greyScaleSkin );
	map.mapTypes.set( 'neutralblueskin', neutralBlue );
	map.mapTypes.set( 'avocadoskin', avocadoWorld );
	map.mapTypes.set( 'lystoireSkin', Lystoire );

	


	autoRefresh(map,tripList,tripIndex);


	var n = tripList[i].route_details.length - 1;

	var myLatlng1 = new google.maps.LatLng( tripList[i].route_details[0].lat ,tripList[i].route_details[0].lng);
	var myLatlng2 = new google.maps.LatLng( tripList[i].route_details[n].lat ,tripList[i].route_details[n].lng);
	var marker = new google.maps.Marker({
		position: myLatlng1,
		map: map,
		animation:google.maps.Animation.BOUNCE,
		icon:"http://maps.google.com/mapfiles/kml/paddle/S.png",
		title: 'TripStart!'
	});

	var marker = new google.maps.Marker({
		position: myLatlng2,
		map: map,
		animation:google.maps.Animation.BOUNCE,
		icon:"http://maps.google.com/mapfiles/kml/paddle/S.png",
		title: 'TripStop!'

	});

	$.each(tripList[i].drivers[d].break_events,function(){
		var breakEvents=new google.maps.LatLng( this.lat ,this.lng);
		var marker = new google.maps.Marker({
			position: breakEvents,
			map: map,
			icon:"http://maps.google.com/mapfiles/kml/pal4/icon53.png",
			title: 'breakevent!'
		});
	});
	$.each(tripList[i].drivers[d].sharp_turn,function(){
		var sharpTurn=new google.maps.LatLng( this.lat ,this.lng);
		var marker = new google.maps.Marker({
			position: sharpTurn,
			map: map,
			icon:"http://maps.google.com/mapfiles/kml/pal3/icon51.png",
			title: 'sharpturn!'
		});
	});


}


	

function moveMarker(map, marker, latlng) {
	marker.setPosition(latlng);
	map.panTo(latlng);
}

function autoRefresh(map,tripList,tripIndex) {
	var i, route, marker;
	route = new google.maps.Polyline({
		path: [],
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 5,
		editable: false,
		map:map
	});


	marker=new google.maps.Marker({map:map,icon:"http://maps.google.com/mapfiles/kml/pal4/icon7.png"});
	for (i = 0; i < tripList[tripIndex].route_details.length; i++) {
		setTimeout(function (coords) {
			var latlng = new google.maps.LatLng(coords.lat, coords.lng);
			route.getPath().push(latlng);
			moveMarker(map, marker, latlng);
		}, 100 * i, tripList[tripIndex].route_details[i]);
	}
}

