let test = document.getElementById('test');

const iconUser = L.icon({
    iconUrl: 'assets/iconUser.png',

    iconSize:     [63, 75], // size of the icon
    iconAnchor:   [32, 55], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const iconresto = L.icon ({
    iconUrl : "assets/icon_restaurent.png",

    iconSize:     [63, 75], // size of the icon
    iconAnchor:   [32, 55], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76]
})
var mapOptions = {
    center: [48.8601, 2.3472],
    zoom: 10
}

const map = new L.map('map', mapOptions);
const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

let userLocation = L.marker([48.8358, 2.3713], {icon: iconUser});

let restoLocation = L.circleMarker([48.861, 2.3171], {color: "red", radius: 10});

var latlngs = [
    [48.852, 2.3195],
    [48.871, 2.3161],
    [48.8358, 2.3713]
];

var markerFrom = L.circleMarker([48.852, 2.3195], { color: "#F00", radius: 10 });
var markerTo =  L.circleMarker([48.871, 2.3161], { color: "blue", radius: 10 });
var goalLocation = L.circleMarker([48.859, 2.3199], { color: "blue", radius: 5});

function createMarker()
{
     
     var from = userLocation.getLatLng();
     var by = restoLocations[0].getLatLng();
     var to = goalLocation.getLatLng();
     markerFrom.bindPopup('Delhi ' + (from).toString());
     markerTo.bindPopup('Mumbai ' + (to).toString());
     map.addLayer(markerTo);
     map.addLayer(markerFrom);
     map.addLayer(goalLocation)
     getDistance(from, to, by);
}

function getDistance(from,by,to)
{
    var container = document.getElementById('distance');
    container.innerHTML = ("Distance entre les trois points - " + (from.distanceTo(by) + by.distanceTo(to)).toFixed(0)/1000) + ' km';
}

// var polyline = L.polyline(latlngs, {color: 'blue'}).addTo(map);

map.addLayer(layer);


function toggleShow() {
    console.log("test")
}
let activeUser = false;

/* function toggleUser() {
    
    activeUser = !activeUser;
    console.log(activeUser);
    if (activeUser) {
        test.style.display = "block";
        let userPozition = new L.Marker;
        map.on('click', (event)=> {
            if(userPozition !== null){
                map.removeLayer(userPozition);
            }
            userPozition = L.marker([event.latlng.lat , event.latlng.lng], {icon: iconUser}).addTo(map);
        })
    } else {
        test.style.display = "none";
    }
} */



/* if (activeUser === false) {
    let destination = new L.Marker;
    map.on('click', (event)=> {
        if(destination !== null){
            map.removeLayer(destination);
        }
        destination = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map);
    })
} */

