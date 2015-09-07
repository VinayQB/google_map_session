
var tripList;

$(document).ready(function(){
	tripList = $.grep(trip, function(element,index) {
			return element;
		});
    $('.sub_menu ul').hide();
	// $.getJSON("../assets/json/map.json",function(map){
	// 	$.each(map.keshavadasapuram_technopark,function(data){
	// 		var output='<tr class="break_event"><td>Break Events</td><td>'+this.breakevents.lattitude+'</td><td>'+this.breakevents.longitude+'</td></tr><tr class="crash_event"><td>Crash Events</td><td>'+this.crashevents.lattitude+'</td><td>'+this.crashevents.longitude+'</td></tr><tr class="sharp_turn" ><td>Sharp Turns</td><td>'+this.sharpturn.lattitude+'</td><td>'+this.sharpturn.longitude+'</td></tr><tr class="acceleration"><td>Acceleration</td><td>'+this.acceleration.lattitude+'</td><td>'+this.acceleration.longitude+'</td></tr>';
	// 		$(".event_details thead").append(output);
	//     });
	// });

		var driverNames = [];
		$.each(tripList, function(i, trips) {
			$.each(trips.drivers, function(id, driver) {
				driverNames.push(driver.name);
			});
		});
		driverNames = unique(driverNames);
		var driverMenu = "";
		$.each(driverNames, function(i, name) {
			var content = $('<li class="sub_menu">'+
				'<span>'+name+'</span>'+
				'<ul class="trip"></ul></li>');
			// var tripArray = "";
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
	    	console.log(driverIndex);
			$('.trip_info').show(1, function() {
				loadMap(tripIndex,driverIndex);
			});
			$('.home_wrap').hide();
	    });
});


function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

/* google api*/


function loadMap(tripIndex,driverIndex) {
	        var i=tripIndex;
	        var d=driverIndex;
	        tripList = $.grep(trip, function(pdfelement,index) {
			return pdfelement;
		});
			


		     
			 
		     var mapOptions = {
			  center: {lat: tripList[i].route_details[0].lat, lng: tripList[i].route_details[0].lng},
			  zoom: 14,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			 map = new google.maps.Map(document.getElementById("map"), mapOptions);





// function mapFunctions() {

			autoRefresh(map,tripList,tripIndex);

			var n = tripList[i].route_details.length - 1;

			var myLatlng1 = new google.maps.LatLng( tripList[i].route_details[0].lat ,tripList[i].route_details[0].lng);
			var myLatlng2 = new google.maps.LatLng( tripList[i].route_details[n].lat ,tripList[i].route_details[n].lng);
			var marker = new google.maps.Marker({
		      position: myLatlng1,
		      map: map,
		      icon:"http://maps.google.com/mapfiles/kml/paddle/S.png",
		      title: 'TripStart!'
            });

			 var marker = new google.maps.Marker({
		      position: myLatlng2,
		      map: map,
		      icon:"http://maps.google.com/mapfiles/kml/paddle/S.png",
		      title: 'TripStop!'
            });

			$.each(tripList[i].drivers[d].break_events,function(){
				console.log(this.lat);
				var breakEvents=new google.maps.LatLng( this.lat ,this.lng);
				var marker = new google.maps.Marker({
			        position: breakEvents,
			        map: map,
			        icon:"http://maps.google.com/mapfiles/kml/pal4/icon53.png",
			        title: 'breakevent!'
                });
			});
			$.each(tripList[i].drivers[d].sharp_turn,function(){
				console.log(this.lat);
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
		geodesic : true,
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
			// console.log(latlng);
			route.getPath().push(latlng);
			moveMarker(map, marker, latlng);
		}, 180 * i, tripList[tripIndex].route_details[i]);
	}
}
function highlight() {
    var brake = document.getElementsByClassName("break_event");
    var	crash = document.getElementsByClassName("crash_event");
    var	turn = document.getElementsByClassName("sharp_turn");
    var	acc = document.getElementsByClassName("acceleration");

    
    if (document.getElementById("check1").checked == true){
    	for (var i = 0; i <2; i++) {
    		brake[i].style.backgroundColor = "red";
    	}
    }
    	else{
    		for (var i = 0; i <2; i++) {
    		brake[i].style.backgroundColor = "rgb(252, 190, 138)";
    	}
	}
     if (document.getElementById("check2").checked == true){
    	for (var i = 0; i <2; i++) {
    		crash[i].style.backgroundColor = "white";
    	}
    }
    else{
    		for (var i = 0; i <2; i++) {
    		crash[i].style.backgroundColor = "rgb(252, 190, 138)";
    	}
	}
    if (document.getElementById("check3").checked == true){
    	for (var i = 0; i <2; i++) {
    		turn[i].style.backgroundColor = "yellow";
    	}
    }
    else{
    		for (var i = 0; i <2; i++) {
    		turn[i].style.backgroundColor = "rgb(252, 190, 138)";
    	}
	}
    if (document.getElementById("check4").checked == true){
    	for (var i = 0; i <2; i++) {
    		acc[i].style.backgroundColor = "blue";
    	}
    }
    else{
    		for (var i = 0; i <2; i++) {
    		acc[i].style.backgroundColor = "rgb(252, 190, 138)";
    	}
	}
  };
