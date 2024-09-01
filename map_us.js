'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2l0Mzc3NSIsImEiOiJjbHlsc3Z0bHowYmNmMmtvamZjeG1xYzJjIn0.6DjxqtbCSE9iiq1Xwd3YRw'

var map_landing = new mapboxgl.Map({
    container: 'map_landing',
    style: 'mapbox://styles/kit3775/clym09mui01ws01qocfwh98ms',
    center: [-93.0, 35.5],
    scale: 0.0001,
    zoom: 3.5,
    minZoom: 3.5,
    maxZoom: 11.5,
    pitch: 0, 
    bearing: 0 
});

// Center
var cities = [
    { name: 'Albuquerque', center: [-106.651138, 35.0844], link: 'Albuquerque/albuquerque.html' },
    { name: 'Charlotte', center: [-80.8431, 35.2271], link: 'Charlotte/charlotte.html' },
    { name: 'Cleveland', center: [-81.681290, 41.505493], link: 'Cleveland/cleveland.html' },
//{ name: 'New Orleans', center: [-90.071533, 29.951065], link: 'New_Orleans/new_orleans.html' },
    { name: 'Newark&Jersey City', center: [-74.0776, 40.7282], link: 'Newark&Jersey_City/newark&jersey_city.html' },
    { name: 'Pittsburgh', center: [-79.9959, 40.4406], link: 'Pittsburgh/pittsburgh.html' },
    { name: 'San Francsico', center: [-122.431297, 37.773972], link: 'San_Francisco/san_francisco.html' },
    { name: 'Tucson', center: [-110.9265, 32.2226], link: 'Tucson/tucson.html' }
];

// 점의 스타일을 정의하는 함수
function createMarkerElement(city) {
    // Create a wrapper div for hover and click area
    var wrapper = document.createElement('div');
    wrapper.style.width = '36px'; // Expanded hover and click area size
    wrapper.style.height = '36px';
    wrapper.style.borderRadius = '50%'; // Make the wrapper circular
    wrapper.style.position = 'absolute'; // Important to position it correctly in mapbox
    wrapper.style.transform = 'translate(-50%, -50%)'; // Center the wrapper on map coordinates
    wrapper.style.cursor = 'pointer';

    // Create the actual marker element (smaller size)
    var marker = document.createElement('div');
    marker.style.width = '7px';
    marker.style.height = '7px';
    marker.style.borderRadius = '200%';
    marker.style.backgroundColor = '#FFFDE7'; // Yellow color
    marker.style.position = 'absolute';
    marker.style.top = '50%';
    marker.style.left = '50%';
    marker.style.transform = 'translate(-50%, -50%)'; // Center marker inside the wrapper

    // Create the label element
    var label = document.createElement('div');
    label.innerText = city.name;
    label.style.position = 'absolute';
    label.style.left = '1.5vw'; // Adjust the position to the right of the marker
    label.style.top = '0.8vh'; // Adjust the position to vertically center the label
    label.style.whiteSpace = 'nowrap'; // Prevent text wrapping
    label.style.padding = '2px 5px'; // Padding to ensure text is readable
    label.style.borderRadius = '3px'; // Slight rounding of the corners
    label.style.color = 'white'; // Font color
    label.style.fontSize = '0.8vw'; // Font size

    // Append marker and label to the wrapper
    wrapper.appendChild(marker);
    wrapper.appendChild(label);

    return wrapper;
}

var markers = [];

// 각 도시에 대해 마커 생성 및 이벤트 처리기 추가
cities.forEach(function(city) {
    var marker = new mapboxgl.Marker({
        element: createMarkerElement(city), // Use the new marker element with city label
        draggable: false
    })
    .setLngLat(city.center)
    .addTo(map_landing);

    // 클릭 이벤트 처리기 추가
    marker.getElement().addEventListener('click', function() {
        marker.getElement().firstChild.style.backgroundColor = '#FF0000'; // Change to red on click
        setTimeout(function() {
            window.location.href = city.link; // Navigate to city link
        }, 1000); // 1 second delay
    });

    // 마우스 hover 이벤트 처리기 추가
    marker.getElement().addEventListener('mouseenter', function() {
        var innerMarker = marker.getElement().firstChild;
        innerMarker.style.width = '13px'; // 1.5 times the original size (7px * 1.5)
        innerMarker.style.height = '13px';
        innerMarker.style.backgroundColor = '#FF0000'; // Change to red on hover
    });

    // 마우스 leave 이벤트 처리기 추가
    marker.getElement().addEventListener('mouseleave', function() {
        var innerMarker = marker.getElement().firstChild;
        innerMarker.style.width = '7px'; // Revert to original size
        innerMarker.style.height = '7px';
        innerMarker.style.backgroundColor = '#FFFDE7'; // Change back to yellow
    });

    // 마커를 markers 배열에 추가
    markers.push(marker);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('stories-link').addEventListener('click', function(event) {   
        event.preventDefault();   
        const popup = document.getElementById('popup_main');   
        popup.classList.remove('hidden_main');   
        popup.classList.add('visible_main');   
    });  

    document.getElementById('close-btn_main').addEventListener('click', function() {   
        const popup = document.getElementById('popup_main');   
        popup.classList.remove('visible_main');   
        popup.classList.add('hidden_main');   
    });
});