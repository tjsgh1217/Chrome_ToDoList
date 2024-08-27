const weather = document.querySelector(".js-weather");
const API_KEY = "dd923dff235855026c0cc23320dc18e6";
const COORS = "coords";


function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}˚locate.${place}`;
        });
}





function saveCoords(coordsObj) {
    localStorage.setItem(COORS, JSON.stringify(coordsObj));
}




function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function handleGeoError() {

}



function askForCoords() {
    navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError);
}




function loadCoords() {
    const loadedCoords = localStorage.getItem(COORS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init () {
    loadCoords();

}


init();
