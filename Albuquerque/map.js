mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongqianli/clo4nrj0n00gg01ozcart4qaf',
    zoom: 10.5,
    center: [-106.6442, 35.0933],
    pitch: 0, 
    bearing: 0 
});

map.on('load', function () {
    map.addLayer({
        'id': 'race_2020',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/race/race_2020.geojson'
        },
        'paint': {
            'fill-color': [
                'case',
                ['==', ['get', 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Hispanic or Latino'], null], 'transparent',
                ['step', ['get', 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Hispanic or Latino'],
                    '#ffffff',
                    0, '#b7bfc2',
                    20, '#b293ca',
                    40, '#ad67d1',
                    60, '#a83bd9',
                    80, '#a30fe0'
                ]
            ],
            'fill-opacity': 1
        }
    });
    
    map.addLayer({
        'id': 'lien_overall',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_overall/lien_overall.geojson'
        },
        'paint': {
            'circle-color': ['step', ['get', 'Amount'],
                '#ffffff',
                0, '#f0975b',
                35350, '#d17362',
                85000, '#b24e6a',
                164500, '#922a71',
                305500, '#730578'],
            'circle-radius': 3, 
        }
    });

    map.addLayer({
        'id': 'boundary_line',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/albuquerque_boundary/albuquerque_boundary.geojson'  
        },
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#fff',  
            'line-width': 1,   
        }
    });
});





Object.keys(layersConfig).forEach(layerName => {
    // Create the popup
    map.on('click', layerName, function (e) {
        let propertyValue = e.features[0].properties[layersConfig[layerName].property];

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<h4>' + layersConfig[layerName].label + ':</h4>' + propertyValue)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the layer
    map.on('mouseenter', layerName, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves
    map.on('mouseleave', layerName, function () {
        map.getCanvas().style.cursor = '';
    });
});



