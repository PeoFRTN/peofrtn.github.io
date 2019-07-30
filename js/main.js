// the lat and lng is set to Montreal, but can be replaced easily with any other coordinates
var myLatLng = {lat: 45.505331312, lng: -73.55249779};
var mapOptions = {
    center: myLatLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Hide result box
document.getElementById("output").style.display = "none";

// Create/Init map
var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


// Define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("location-1").value,
        destination: document.getElementById("location-2").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    // Routing
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time            
            var dist = result.routes[0].legs[0].distance.text;
            var dura = result.routes[0].legs[0].duration.text;
            //Variables needed (distance and duration, the function makes sure its a float(1.11) and not an integer(1)) 
            var distint = parseFloat(dist);
            var duraint = parseFloat(dura);
            //Formula for the delivery fees  
            var fees = ( ((duraint + 5)/2) + (distint) );
            var feesceil = ceiling(fees, 2.5);
            //Output line. to display an extra variable
            // simpy add the info in this manner(just before the </div> tag )
            //  .<br />VARIABLE NAME(DISPLAY ON SCREEN): " + var + "      /// where var is replaced by your var name
            $("#output").html("<div class='result-table'> Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".<br />Fees: " + feesceil +"</div>");
            document.getElementById("output").style.display = "block";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //Show error message           
           
            alert("Can't find road! Please try again!");
            clearRoute();
        }
    });

}

// Clear results

function clearRoute(){
    document.getElementById("output").style.display = "none";
    document.getElementById("location-1").value = "";
    document.getElementById("location-2").value = "";
    directionsDisplay.setDirections({ routes: [] });
    
}

// Create autocomplete objects for all inputs
// Restrictions: CANADA ( can be replaced / added, ex: country: ['CA', 'US', 'PK'] )
var options = {
    types: ['address'],
    componentRestrictions: {
        country: ['CA'] }
}

// Input1 and Input2 receives the AUTOCOMPLETE function from the Google Places API
var input1 = document.getElementById("location-1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("location-2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


function ceiling(number, significance) {
    return Math.ceil(number / significance) * significance;
  }