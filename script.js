const iconMarker = L.Icon.extend({
    options: {
        iconUrl : "assets/iconeArrive.png",    
        iconSize:     [63, 75],
        iconAnchor:   [32, 55], 
        popupAnchor:  [-3, -76]
    }
})
const iconGoal = new iconMarker({iconUrl: "assets/iconeArrive.png", iconSize: [30, 50], iconAnchor: [20, 40]})
const iconResto = new iconMarker({iconUrl: 'assets/iconeRestaurent.png'})
const iconUser = new iconMarker({iconUrl: 'assets/iconUser.png'})



let usersLocation = [
    ["LOCATION_1", 48.8428, 2.2865],
    ["LOCATION_2", 48.8482, 2.394],
    ["LOCATION_3", 48.8877, 2.3542]   
]
let polylines = [];
let userLocation;
let restoLocation;
let goalLocation;
let markers = [];
let latLngs = [];


// Config map
var mapOptions = {
    center: [48.8601, 2.3472],
    zoom: 12
}
const map = new L.map('map', mapOptions);
const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

map.on("click", onMapClick);

//Ajout users
for (i=0; i < usersLocation.length; i++) {
    marker = new L.marker([usersLocation[i][1], usersLocation[i][2]], {icon: iconUser}).addTo(map);
    var from = [usersLocation[i][1], usersLocation[i][2]];
}

// Ajoute les marqueurs sur la carte et récupère leurs positions
function onMapClick(event) {

    /* userLocation = L.marker([event.latlng.lat , event.latlng.lng], {icon: iconUser}).addTo(map).bindPopup("<input type='button' onclick='onPopupOpen()' value='Delete this marker' class='marker-delete-button'/>");
    userLocation.on("popupopen", onPopupOpen);
    let from = userLocation.getLatLng(); */

    if(map.hasLayer(userLocation)){
        map.once('click', (event)=> {
            restoLocation = L.marker([event.latlng.lat , event.latlng.lng], {icon: iconResto}).addTo(map).bindPopup("<input type='button' onclick='onPopupOpen()' value='Delete this marker' class='marker-delete-button'/>");
            let by = restoLocation.getLatLng();
            let polyline = L.polyline([from, by], {color: "blue"});
            polyline.addTo(map);
            polylines.push(polyline);
            restoLocation.on("popupopen", onPopupOpen);

            if(map.hasLayer(restoLocation)){
                map.once('click', (event)=> {
                    goalLocation = L.marker([event.latlng.lat , event.latlng.lng],  {icon: iconGoal}).addTo(map).bindPopup("<input type='button' onclick='onPopupOpen()' value='Delete this marker' class='marker-delete-button'/>");  
                    goalLocation.on("popupopen", onPopupOpen);
                    let to = goalLocation.getLatLng();
                    polyline = L.polyline([from, by, to], {color: "blue"});
                    polyline.addTo(map);
                    polylines.push(polyline);
                    latLngs.push(to);
                    getDistance(from, to, by);
                })  
            }   
        }) 
    }     
}

// Supr les markers
function onPopupOpen() {
    let tempMarker = this;
    console.log(polylines);
    $(".marker-delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
        map.removeLayer(polylines[1]);
    });
}

function pinLocation() {
    console.log(markers);
}

// Calcule le temps de trajet entre les différents points
function getDistance(from,by,to){
    const container = document.getElementById('distance');
    let distance = (from.distanceTo(by) + by.distanceTo(to)).toFixed(0)/1000;
    const vitesse = 5;
    let temps = (distance / vitesse).toFixed(2);
    container.innerHTML = "Temps de trajet " + temps + ' h';
}

function itemWrap() {
    for(i=0;i<items.length;i++){
        var LamMarker = new L.marker([items[i].lat, items[i].lon]);
        marker.push(LamMarker);
        map.addLayer(marker[i]);
    }
}
    
/*Going through these marker-items again removing them*/
function markerDelAgain() {
for(i=0;i<markers.length;i++) {
    map.removeLayer(markers[i]);
    }  
}




