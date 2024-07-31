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
    { name: 'Jersey City', center: [-74.0776, 40.7282], link: 'Jersey_city/jersey_city.html' },
    { name: 'Oakland', center: [-122.2711, 37.8044], link: 'Oakland/oakland.html' },
    { name: 'Pittsburgh', center: [-79.9959, 40.4406], link: 'Pittsburgh/pittsburgh.html' },
    { name: 'Tucson', center: [-110.9265, 32.2226], link: 'Tucson/tucson.html' }
];

var markers = [];
var hoverRadius = 36; // 픽셀 단위
// 점의 스타일을 정의하는 함수
function createMarkerElement() {
    var el = document.createElement('div');
    el.style.width = '7px';
    el.style.height = '7px';
    el.style.borderRadius = '200%';
    el.style.backgroundColor = '#FFFDE7'; // 노란색
    el.style.cursor = 'pointer';
    return el;
}

// 각 도시에 대해 마커 생성 및 이벤트 처리기 추가
// 클릭할 마커들의 배열
var markers = [];

// 각 도시에 대해 마커 생성 및 이벤트 처리기 추가
cities.forEach(function(city) {
    var marker = new mapboxgl.Marker({
        color: '#FFFDE7', // 노란색
        draggable: false,
        element: createMarkerElement() // 점 크기 설정
    })
    .setLngLat(city.center)
    .addTo(map_landing);
    
    // 클릭 이벤트 처리기 추가
    
    
    // 마우스 이벤트 처리기 추가 (점 주변 지나갈 때)
    marker.getElement().addEventListener('mouseenter', function() {
        marker.getElement().style.backgroundColor = '#FF0000'; // 빨간색
    });

    // 마우스 이벤트 처리기 추가 (점 주변 떠날 때)
    marker.getElement().addEventListener('mouseleave', function() {
        marker.getElement().style.backgroundColor = '#FFFDE7'; // 노란색
    });
    
    marker.getElement().addEventListener('click', function() {
        marker.getElement().style.backgroundColor = '#FF0000'; // 빨간색
        
        setTimeout(function() {
            window.location.href = city.link; // 해당 도시의 링크로 페이지 전환
        }, 1000); // 500밀리초 = 0.5초 딜레이
    });

    // 마커를 markers 배열에 추가
    markers.push(marker);
});



