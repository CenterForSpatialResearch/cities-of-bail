mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongqianli/clkz0gnx000lw01p7375xf0qf',
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
                    0, '#2d653b',
                    20, '#55895d',
                    40, '#7dad7e',
                    60, '#a5d1a0',
                    80, '#cdf5c1'
                ]
            ],
            'fill-opacity': 1
        }
    });

    map.addLayer({
        'id': 'poverty_2020',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/poverty/poverty_2020.geojson'
        },
        'paint': {
            'fill-color': [
                'case',
                ['==', ['get', 'ACSST5Y2020.S1701-Data-Reformatted_Estimate!!Percent below poverty level!!Population for whom poverty status is determined'], null], 'transparent',
                ['step', ['get', 'ACSST5Y2020.S1701-Data-Reformatted_Estimate!!Percent below poverty level!!Population for whom poverty status is determined'],
                    '#ffffff',
                    0, '#653c8a',
                    12, '#8764a7',
                    24, '#a98bc4',
                    36, '#cbb3e2',
                    48, '#eddaff'
                ]
            ],
            'fill-opacity': 1
        }
    });

    map.addLayer({
        'id': 'housing_2020',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/housing/housing_2020.geojson'
        },
        'paint': {
            'fill-color': [
                'case',
                ['==', ['get', 'ACSDT5Y2020.B25077-Data_Estimate!!Median value (dollars)'], null], 'transparent',
                ['step', ['get', 'ACSDT5Y2020.B25077-Data_Estimate!!Median value (dollars)'],
                    '#ffffff',
                    0, '#22336b',
                    160000, '#4a5a8a',
                    320000, '#7282aa',
                    480000, '#9ba9c9',
                    640000, '#c3d0e8'
                ]
            ],
            'fill-opacity': 1
        }
    });

    map.addLayer({
        'id': 'race_2020_stroke',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/race/race_2020.geojson'
        },
        'layout': {},
        'paint': {
            'line-color': '#676767', 
            'line-width': 0.2,
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
                0, '#ffa463',
                35350, '#ff8363',
                85000, '#ff6263',
                164500, '#ff4062',
                305500, '#ff1f62'],
            'circle-radius': 3, 
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

document.addEventListener('DOMContentLoaded', function() {
    var legends = document.querySelectorAll('.legend');
    legends.forEach(function(legend) {
        var colors = legend.getAttribute('data-colors').split(',');
        var gradient = 'linear-gradient(to right, ' + colors.join(', ') + ')';
        legend.style.backgroundImage = gradient;
    });
});

document.getElementById('race2020').addEventListener('change', function(e) {
    map.setLayoutProperty('race_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('poverty2020').addEventListener('change', function(e) {
    map.setLayoutProperty('poverty_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('housing2020').addEventListener('change', function(e) {
    map.setLayoutProperty('housing_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.querySelectorAll('.year').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelectorAll('.year').forEach(function(btn) {
            btn.classList.remove('active'); // 移除所有按钮的激活状态
        });
        this.classList.add('active'); // 为当前点击的按钮添加激活状态
        
        var selectedYear = this.getAttribute('data-year');
        // 这里添加代码，用于显示对应年份的数据
        console.log('Selected Year: ', selectedYear);
        // 比如更新地图或图表数据
        updateDataForYear(selectedYear);
    });
});

function updateDataForYear(year) {
    // 在这里添加更新网页上数据显示的函数
    // 比如根据所选年份更新地图或者图表
    // 这可能涉及到从服务器获取数据，或者更新页面上的DOM元素
}
