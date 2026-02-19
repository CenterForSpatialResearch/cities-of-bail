mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongqianli/cluh62aew033f01qqcszb71kp',
    zoom: 11,
    minZoom: 10.5, 
    maxZoom: 15,
    center: [-106.6945, 35.0833],
    pitch: 0, 
    bearing: 0 
});

const yearsList = ["2000","2001","2002","2003","2004","2005","2006","2007",
                   "2008","2009","2010","2011","2012","2013","2014","2015",
                   "2016","2017","2018","2019","2020"];

// Top-level so it's accessible by both map.on('load') and bond-select handler
function updateMapLayer(selectedOption) {
    let colorExpression;

    if (selectedOption === 'option1') {
        // Amount — purple scale, Albuquerque ranges
        colorExpression = [
            'case',
            ['==', ['typeof', ['get', 'Amount']], 'number'],
            ['step', ['get', 'Amount'],
                '#d4aaff',         // $0 - $35k
                35001, '#a855f7',  // $35k - $80k
                80001, '#7e22ce',  // $80k - $150k
                150001, '#581c87', // $150k - $350k
                350001, '#2e0057'  // $350k+
            ],
            '#949494'
        ];
    } else if (selectedOption === 'option2') {
        // Duration — purple scale (Albuquerque uses days already)
        colorExpression = [
            'case',
            ['==', ['typeof', ['get', 'Lien Duration']], 'number'],
            ['step', ['get', 'Lien Duration'],
                '#d4aaff',
                1825,  '#a855f7',
                3650,  '#7e22ce',
                5475,  '#581c87',
                7300,  '#2e0057'
            ],
            '#949494'
        ];
    } else if (selectedOption === 'option3') {
        // Company — match by bonding company name
        colorExpression = [
            'match', ['get', 'Bonding Company'],
            'AAA Bail Bonds',       '#fcf467',
            'Pacheco Bonding',      '#ea8972',
            'A Bail Bond Co.',      '#0B8A7C',
            'ASAP Bail Bond',       '#5fcad2',
            'Aardvark Bail Bond',   '#4ca48a',
            'Affordable Bail Bonds','#FF7733',
            'Martinez Bail Bonds',  '#f2c947',
            'Help Bail Bonds',      '#F48A28',
            'ABC Bail Bonds',       '#80BB47',
            'Gonzales Bail Bonds',  '#FEBA2A',
            '#949494'
        ];
    } else {
        // Select... or option4 (Case Outcome handled separately) — default black
        colorExpression = '#2b2b2b';
    }

    if (map.getLayer('lien_overall')) {
        map.setPaintProperty('lien_overall', 'icon-color', colorExpression);
    }
    yearsList.forEach(function(year) {
        if (map.getLayer('lien_' + year)) {
            map.setPaintProperty('lien_' + year, 'icon-color', colorExpression);
        }
    });
}

var selectedYear = "all";

// --- Legend filter state ---
// Tracks which legend buckets are active. null = no filter active (all shown).
const legendFilterState = {
    active: false,
    type: null,       // 'amount' | 'duration' | 'company'
    activeKeys: new Set()
};

// Called whenever a legend item is clicked or legend mode changes
function applyLegendFilter() {
    if (legendFilterState.type === 'outcome') {
        // Outcome filtering is handled by applyCaseOutcomeFilter directly
        applyCaseOutcomeFilter();
        return;
    }

    if (!legendFilterState.active || legendFilterState.activeKeys.size === 0) {
        if (map.getLayer('lien_overall')) map.setFilter('lien_overall', null);
        yearsList.forEach(y => {
            if (map.getLayer('lien_' + y)) map.setFilter('lien_' + y, null);
        });
        return;
    }

    let filterExpr;
    const keys = Array.from(legendFilterState.activeKeys);

    if (legendFilterState.type === 'amount') {
        const orClauses = keys.map(k => {
            const [mn, mx] = k.split(':').map(Number);
            return ['all', ['>=', ['get', 'Amount'], mn], ['<=', ['get', 'Amount'], mx]];
        });
        filterExpr = orClauses.length === 1 ? orClauses[0] : ['any', ...orClauses];
    } else if (legendFilterState.type === 'duration') {
        const orClauses = keys.map(k => {
            const [mn, mx] = k.split(':').map(Number);
            return ['all', ['>=', ['get', 'Lien Duration'], mn], ['<=', ['get', 'Lien Duration'], mx]];
        });
        filterExpr = orClauses.length === 1 ? orClauses[0] : ['any', ...orClauses];
    } else if (legendFilterState.type === 'company') {
        filterExpr = ['in', ['get', 'Bonding Company'], ['literal', keys]];
    }

    if (map.getLayer('lien_overall')) map.setFilter('lien_overall', filterExpr);
    yearsList.forEach(y => {
        if (map.getLayer('lien_' + y)) map.setFilter('lien_' + y, filterExpr);
    });
}

// Clear legend filter state and visual highlights
function clearLegendFilter() {
    legendFilterState.active = false;
    legendFilterState.type = null;
    legendFilterState.activeKeys.clear();
    document.querySelectorAll('.legend-filter-item').forEach(el => {
        el.classList.remove('lf-active', 'lf-inactive');
    });
    applyLegendFilter();
    // Also clear any outcome filter
    if (map.getLayer('caseOutcome')) map.setFilter('caseOutcome', null);
    if (map.getLayer('caseOutcome_overlay')) map.setFilter('caseOutcome_overlay', null);
}

// Wire up clicks on static legend items (amount/duration/outcome)
document.addEventListener('click', function(e) {
    const item = e.target.closest('.legend-filter-item');
    if (!item) return;

    const filterType = item.dataset.filter;
    let itemKey;
    if (filterType === 'amount' || filterType === 'duration') {
        itemKey = item.dataset.min + ':' + item.dataset.max;
    } else if (filterType === 'company') {
        itemKey = item.dataset.company;
    } else if (filterType === 'outcome') {
        itemKey = item.dataset.outcome;
    }

    // If switching to a different legend type, reset first
    if (legendFilterState.type && legendFilterState.type !== filterType) {
        legendFilterState.activeKeys.clear();
    }

    legendFilterState.active = true;
    legendFilterState.type = filterType;

    if (legendFilterState.activeKeys.has(itemKey)) {
        legendFilterState.activeKeys.delete(itemKey);
        if (legendFilterState.activeKeys.size === 0) {
            legendFilterState.active = false;
        }
    } else {
        legendFilterState.activeKeys.add(itemKey);
    }

    // Update visual state on all items of this filter type
    const allItems = document.querySelectorAll(`.legend-filter-item[data-filter="${filterType}"]`);
    if (!legendFilterState.active) {
        allItems.forEach(el => el.classList.remove('lf-active', 'lf-inactive'));
    } else {
        allItems.forEach(el => {
            let key;
            if (filterType === 'amount' || filterType === 'duration') {
                key = el.dataset.min + ':' + el.dataset.max;
            } else if (filterType === 'company') {
                key = el.dataset.company;
            } else if (filterType === 'outcome') {
                key = el.dataset.outcome;
            }
            if (legendFilterState.activeKeys.has(key)) {
                el.classList.add('lf-active');
                el.classList.remove('lf-inactive');
            } else {
                el.classList.add('lf-inactive');
                el.classList.remove('lf-active');
            }
        });
    }

    applyLegendFilter();
});

map.on('load', function () {

    // Update water layer appearance
    const waterLayer = map.getStyle().layers.find(layer => layer.id === 'water');
    if (waterLayer) {
        map.setPaintProperty('water', 'fill-color', '#9e9e9e');
        map.setPaintProperty('water', 'fill-opacity', 1.0);
    }

    // --- City mask ---
    // Two-layer approach: a dim fill over outside areas, plus a heavily blurred
    // line along the boundary edge to create a soft vignette transition.
    map.addSource('city-mask', {
        type: 'geojson',
        data: 'data/binarymap/albuquerque_mask.geojson'
    });
    // Outer fill: dims everything outside the target area
    map.addLayer({
        id: 'city-mask-layer',
        type: 'fill',
        source: 'city-mask',
        paint: {
            'fill-color': '#cdd6da',
            'fill-opacity': 0.5
        }
    });
    // Blurred edge: a wide soft line traced along the mask boundary.
    // line-blur creates a genuine feathered edge in Mapbox.
    map.addLayer({
        id: 'city-mask-edge-layer',
        type: 'line',
        source: 'city-mask',
        paint: {
            'line-color': '#cdd6da',
            'line-width': 600,
            'line-blur': 40,
            'line-opacity': 0.6
        }
    });
    // --- End city mask ---

    // --- Race layer (default: Hispanic or Latino) ---
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
                    '#f5f0c8',
                    20, '#ede78a',
                    40, '#e6de60',
                    60, '#ddd43a',
                    80, '#d4ca1a'
                ]
            ],
            'fill-opacity': 1
        }
    });

    // --- Poverty layer (coral scale) ---
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
                    '#f5c4a8',
                    12, '#e89060',
                    24, '#d96030',
                    36, '#c94a1a',
                    48, '#8a2e08'
                ]
            ],
            'fill-opacity': 1
        }
    });
    map.setLayoutProperty('poverty_2020', 'visibility', 'none');

    // --- Housing / Property Value layer (teal scale) ---
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
                    '#9dd4d4',
                    160000, '#4eaaaa',
                    320000, '#1a8080',
                    480000, '#0a6b6b',
                    640000, '#054040'
                ]
            ],
            'fill-opacity': 1
        }
    });
    map.setLayoutProperty('housing_2020', 'visibility', 'none');

    // --- Bivariate: Race (Hispanic/Latino, yellow) + Poverty (coral) ---
    map.addLayer({
        'id': 'race+poverty',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/binarymap/binarymap.geojson'
        },
        'paint': {
            'fill-color': [
                'match',
                ['get', 'BI_H-R_H'],
                'E1', '#E4C761','E2', '#DEAD3D','E3', '#D69525','E4', '#CE8A1A','E5', '#AF7C11',
                'D1', '#E9CC71','D2', '#E2B24D','D3', '#DB9A35','D4', '#D38F2A','D5', '#B38121',
                'C1', '#EDD184','C2', '#E7B760','C3', '#DF9F48','C4', '#D7943D','C5', '#B88634',
                'B1', '#F1D599','B2', '#EABB75','B3', '#E3A35D','B4', '#DB9852','B5', '#BB8A49',
                'A1', '#F5DAB8','A2', '#EEC094','A3', '#E7A87C','A4', '#DF9D71','A5', '#BF8F68',
                '#000000'
            ]
        }
    });
    map.setLayoutProperty('race+poverty', 'visibility', 'none');

    // --- Bivariate: Poverty (coral) + Property (teal) ---
    map.addLayer({
        'id': 'poverty+property',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/binarymap/binarymap_Poverty_Property.geojson'
        },
        'paint': {
            'fill-color': [
                'match',
                ['get', 'Bi2_class'],
                'E1', '#93816E','E2', '#6C6C59','E3', '#525744','E4', '#4A4C39','E5', '#473724',
                'D1', '#B38F77','D2', '#8B7A62','D3', '#71654D','D4', '#695A42','D5', '#67452D',
                'C1', '#BB9A82','C2', '#93856D','C3', '#797058','C4', '#71654D','C5', '#6F5038',
                'B1', '#C2B29A','B2', '#9B9D85','B3', '#818870','B4', '#797D65','B5', '#766850',
                'A1', '#C9CCBE','A2', '#A1B7A9','A3', '#87A294','A4', '#7F9789','A5', '#7D8274',
                '#000000'
            ]
        }
    });
    map.setLayoutProperty('poverty+property', 'visibility', 'none');

    // --- Bivariate: Race (yellow) + Property (teal) ---
    map.addLayer({
        'id': 'race+property',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/binarymap/binarymap_Race_Property.geojson'
        },
        'paint': {
            'fill-color': [
                'match',
                ['get', 'Bi3_class'],
                'E1', '#B8CF77','E2', '#91BA62','E3', '#77A54D','E4', '#6F9A42','E5', '#6C852D',
                'D1', '#BDD487','D2', '#95BF72','D3', '#7BAA5D','D4', '#739F52','D5', '#718A3D',
                'C1', '#C1D99A','C2', '#9AC485','C3', '#80AF70','C4', '#78A465','C5', '#758F50',
                'B1', '#C5DDAF','B2', '#9DC89A','B3', '#83B385','B4', '#7BA97A','B5', '#799365',
                'A1', '#C9E2CE','A2', '#A1CDB9','A3', '#87B8A4','A4', '#7FAD99','A5', '#7D9884',
                '#000000'
            ]
        }
    });
    map.setLayoutProperty('race+property', 'visibility', 'none');

    // --- Census tract stroke ---
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

    // Generate year list
    function provideYears(startYear, endYear) {
        let yearsArray = [];
        for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
            yearsArray.push(year.toString());
        }
        return yearsArray;
    }
    let innerYearsList = provideYears("2000", "2020");

    // --- Load SDF pin images, then add all lien layers as symbol layers ---
    loadPinImage(map, function() {

        // Year layers
        innerYearsList.forEach(function(year) {
            let lienYear = 'lien_' + year;
            map.addLayer({
                'id': lienYear,
                'type': 'symbol',
                'source': {
                    'type': 'geojson',
                    'data': 'data/lien_byyear/' + year + '_accumulate.geojson'
                },
                'layout': {
                    'icon-image': 'bail-pin',
                    'icon-size': 0.35,
                    'icon-anchor': 'bottom',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                },
                'paint': {
                    'icon-color': '#2b2b2b',
                    'icon-opacity': 0.9
                }
            });

            map.addLayer({
                'id': lienYear + '_overlay',
                'type': 'symbol',
                'source': lienYear,
                'layout': {
                    'icon-image': 'bail-pin-overlay',
                    'icon-size': 0.35,
                    'icon-anchor': 'bottom',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                },
                'paint': {
                    'icon-opacity': 0.9
                }
            });
        });

        // Overall layer
        map.addLayer({
            'id': 'lien_overall',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': 'data/lien_overall/lien_overall.geojson'
            },
            'layout': {
                'icon-image': 'bail-pin',
                'icon-size': 0.35,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            },
            'paint': {
                'icon-color': '#2b2b2b',
                'icon-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1.0,
                    0.9
                ]
            }
        });

        // Overlay for overall
        map.addLayer({
            'id': 'lien_overall_overlay',
            'type': 'symbol',
            'source': 'lien_overall',
            'layout': {
                'icon-image': 'bail-pin-overlay',
                'icon-size': 0.35,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            },
            'paint': {
                'icon-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1.0,
                    0.9
                ]
            }
        });

        // Ensure road, water, pins and labels appear above demographic and mask layers
        map.moveLayer('water');
        map.moveLayer('road-simple');
        // Then pins above everything
        map.moveLayer('lien_overall');
        map.moveLayer('lien_overall_overlay');
        innerYearsList.forEach(function(year) {
            map.moveLayer('lien_' + year);
            map.moveLayer('lien_' + year + '_overlay');
        });
        map.moveLayer('poi-label');
        map.moveLayer('waterway-label');
        map.moveLayer('airport-label');
        map.moveLayer('road-label-simple');

    }); // end loadPinImage

    let hoveredFeatureId = null;

    map.on('mouseenter', 'lien_overall', function(e) {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
            if (hoveredFeatureId) {
                map.setFeatureState({ source: 'lien_overall', id: hoveredFeatureId }, { hover: false });
            }
            hoveredFeatureId = e.features[0].id;
            map.setFeatureState({ source: 'lien_overall', id: hoveredFeatureId }, { hover: true });
        }
    });

    map.on('mouseleave', 'lien_overall', function() {
        map.getCanvas().style.cursor = '';
        if (hoveredFeatureId) {
            map.setFeatureState({ source: 'lien_overall', id: hoveredFeatureId }, { hover: false });
        }
        hoveredFeatureId = null;
    });

    // --- Popup on click ---
    map.on('click', 'lien_overall', function(e) {
        if (e.features.length > 0) {
            var feature = e.features[0];

            var amount = feature.properties['Amount'] || '';
            var bondcompany = feature.properties['Bonding Company'] || '';
            var duration = feature.properties['Lien Duration'] || '';

            var amountFormatted = amount !== ''
                ? '$' + Number(amount).toLocaleString('en-US')
                : '';
            var durationFormatted = duration !== '' ? duration + ' days' : '';

            new mapboxgl.Popup({ anchor: 'bottom-left' })
                .setLngLat(e.lngLat)
                .setHTML(
                    '<p><b>Amount</b>: ' + amountFormatted + '</p>' +
                    '<p><b>Bond company</b>: ' + bondcompany + '</p>' +
                    '<p><b>Duration</b>: ' + durationFormatted + '</p>')
                .addTo(map);
        }
    });

    // --- Status filter ---
    function filterLayer() {
        const overallFilters = ['any'];
        const signed = document.getElementById('liensigned').checked;
        const released = document.getElementById('lienreleased').checked;
        const foreclosed = document.getElementById('lienforeclosed').checked;
        const pending = document.getElementById('lienpending').checked;

        const signedFilter = ['==', ['get', 'Status'], 'Signed'];
        const releasedFilter = ['==', ['get', 'Status'], 'Released'];
        const foreclosedFilter = ['==', ['get', 'Status'], 'Foreclosed'];
        const releaseBeforeForeclosedFilter = ['==', ['get', 'Status'], 'Release (before foreclose)'];
        const pendingFilter = ['==', ['get', 'Status'], 'Pending'];

        if (signed) overallFilters.push(signedFilter);
        if (released) overallFilters.push(releasedFilter);
        if (foreclosed) overallFilters.push(foreclosedFilter, releaseBeforeForeclosedFilter);
        if (pending) overallFilters.push(pendingFilter);

        map.setFilter('lien_overall', overallFilters.length > 1 ? overallFilters : null);

        const yearsFilters = ['any'];
        if (signed) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Signed That Year']);
        if (released) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Released That Year']);
        if (foreclosed) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Foreclosed That Year']);
        if (pending) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Pending']);

        const years = Array.from({length: 21}, (_, i) => i + 2000);
        years.forEach(year => {
            const layerId = `lien_${year}`;
            try {
                map.setFilter(layerId, yearsFilters.length > 1 ? yearsFilters : null);
                map.setFilter(layerId + '_overlay', yearsFilters.length > 1 ? yearsFilters : null);
            } catch (error) {
                console.error(`Error applying filter to layer ${layerId}:`, error);
            }
        });
    }

    document.getElementById('liensigned').addEventListener('change', filterLayer);
    document.getElementById('lienreleased').addEventListener('change', filterLayer);
    document.getElementById('lienforeclosed').addEventListener('change', filterLayer);
    document.getElementById('lienpending').addEventListener('change', filterLayer);
    filterLayer();

////
function updateYearCheckboxes(selectedYear) {
    document.querySelectorAll('.year-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    if (selectedYear) {
        document.getElementById('year-' + selectedYear).checked = true;
    } else {
        document.getElementById('year-all').checked = true;
    }
    const bondSelect = document.getElementById("bond-select");
    if (bondSelect && bondSelect.value === "option4") {
        for (let y = 2000; y <= 2020; y++) {
            const layerId = 'lien_' + y;
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', 'none');
            }
        }
        updateOutcomeLayer();
    }
    updateLayerVisibility(selectedYear);
}

function updateLayerVisibility(selectedYear) {
    const years = ["2000","2001","2002","2003","2004","2005","2006","2007",
                   "2008","2009","2010","2011","2012","2013","2014","2015",
                   "2016","2017","2018","2019","2020"];
    if (!selectedYear || selectedYear === 'all') {
        map.setLayoutProperty('lien_overall', 'visibility', 'visible');
        map.setLayoutProperty('lien_overall_overlay', 'visibility', 'visible');
        years.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', 'none');
                map.setLayoutProperty('lien_' + year + '_overlay', 'visibility', 'none');
            }
        });
    } else {
        years.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                const vis = year === selectedYear ? 'visible' : 'none';
                map.setLayoutProperty('lien_' + year, 'visibility', vis);
                map.setLayoutProperty('lien_' + year + '_overlay', 'visibility', vis);
            }
        });
        map.setLayoutProperty('lien_overall', 'visibility', 'none');
        map.setLayoutProperty('lien_overall_overlay', 'visibility', 'none');
    }
}

document.querySelectorAll('.year-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
        const selectedId = e.target.id.replace('year-', '');
        updateYearCheckboxes(selectedId === 'all' ? null : selectedId);
    });
});

updateYearCheckboxes(null);

}); // end map.on('load')


// --- Race select handler ---
document.getElementById('race-select').addEventListener('change', function(e) {
    var propertyName = '';
    switch (e.target.value) {
        case 'option1':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: White alone'; break;
        case 'option2':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Black or African American alone'; break;
        case 'option3':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: American Indian and Alaska Native alone'; break;
        case 'option4':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Asian alone'; break;
        case 'option5':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Native Hawaiian and Other Pacific Islander alone'; break;
        case 'option6':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Hispanic or Latino'; break;
    }
    if (propertyName) {
        map.setPaintProperty('race_2020', 'fill-color', [
            'case',
            ['==', ['get', propertyName], null], 'transparent',
            ['step', ['get', propertyName],
                '#f5f0c8',
                20, '#ede78a',
                40, '#e6de60',
                60, '#ddd43a',
                80, '#d4ca1a'
            ]
        ]);
    }
});


// --- Bond select handler ---
var data = [
    { company: "AAA Bail Bonds", count: 366 },
    { company: "Pacheco Bonding", count: 325 },
    { company: "A Bail Bond Co.", count: 207 },
    { company: "ASAP Bail Bond", count: 157 },
    { company: "Aardvark Bail Bond", count: 56 },
    { company: "Affordable Bail Bonds", count: 27 },
    { company: "Martinez Bail Bonds", count: 18 },
    { company: "Help Bail Bonds", count: 17 },
    { company: "ABC Bail Bonds", count: 17 },
    { company: "Gonzales Bail Bonds", count: 14 },
    { company: "Other", count: 89 },
];

document.getElementById('bond-select').addEventListener('change', function(e) {
    var incomeLegend = document.getElementById('income-legend');
    var durationLegend = document.getElementById('duration-legend');
    var caseOutcomeFilters = document.getElementById('case-outcome-filters');

    // Clear any active legend filter when switching modes
    clearLegendFilter();

    // Reset all legend/chart visibility
    incomeLegend.style.display = 'none';
    durationLegend.style.display = 'none';
    caseOutcomeFilters.style.display = 'none';
    d3.select('.company-barchart svg').remove();

    if (e.target.value === 'option1') {
        incomeLegend.style.display = '';
    } else if (e.target.value === 'option2') {
        durationLegend.style.display = '';
    } else if (e.target.value === 'option3') {
        drawBarChart(data);
    } else if (e.target.value === 'option4') {
        // Case Outcome — handled by its own layer, hide standard pins
        caseOutcomeFilters.style.display = 'block';
        if (map.getLayer('lien_overall')) {
            map.setLayoutProperty('lien_overall', 'visibility', 'none');
            map.setLayoutProperty('lien_overall_overlay', 'visibility', 'none');
        }
        yearsList.forEach(function(year) {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', 'none');
                map.setLayoutProperty('lien_' + year + '_overlay', 'visibility', 'none');
            }
        });
        updateOutcomeLayer();
        return; // skip updateMapLayer for case outcome
    }
    // option0 (Select...) — stays black, everything hidden
    updateMapLayer(e.target.value);
});

d3.select('.company-barchart svg').remove();


function drawBarChart(data) {
    var margin = {top: 20, right: 10, bottom: 120, left: 40},
        width = 265 - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    var svg = d3.select(".company-barchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
        .domain(data.map(function(d) { return d.company; }));
    var y = d3.scaleLinear().range([height, 0])
        .domain([0, d3.max(data, function(d) { return d.count; })]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)")
        .style("fill", "white")
        .style("font-size", "12px");

    svg.append("g")
        .call(d3.axisLeft(y).ticks(10))
        .selectAll("text")
        .style("fill", "white")
        .style("font-size", "12px");

    svg.selectAll(".domain, .tick line")
        .style("stroke", "white");

    var colorScale = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d.company; }))
        .range(['#fcf467','#d8c4fb','#ea8972','#5fcad2','#4ca48a','#FF7733','#f2c947','#F48A28','#80BB47','#FEBA2A','#949494']);

    function updateBarOpacity() {
        svg.selectAll(".bar").style("opacity", function(d) {
            if (!legendFilterState.active || legendFilterState.type !== 'company') return 1;
            return legendFilterState.activeKeys.has(d.company) ? 1 : 0.25;
        });
    }

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .style("fill", function(d) { return colorScale(d.company); })
        .style("cursor", "pointer")
        .attr("x", function(d) { return x(d.company); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); })
        .on("click", function(event, d) {
            const company = d.company;
            if (legendFilterState.type && legendFilterState.type !== 'company') {
                legendFilterState.activeKeys.clear();
            }
            legendFilterState.active = true;
            legendFilterState.type = 'company';

            if (legendFilterState.activeKeys.has(company)) {
                legendFilterState.activeKeys.delete(company);
                if (legendFilterState.activeKeys.size === 0) {
                    legendFilterState.active = false;
                }
            } else {
                legendFilterState.activeKeys.add(company);
            }
            updateBarOpacity();
            applyLegendFilter();
        });

    svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .style("fill", "white")
        .attr("x", function(d) { return x(d.company) + x.bandwidth() / 2; })
        .attr("y", function(d) { return y(d.count) - 12; })
        .attr("dy", ".75em")
        .text(function(d) { return d.count; })
        .attr("text-anchor", "middle")
        .style("font-size", "12px");
}


// --- D3 bivariate matrices ---
const matrixData = [
    ["#000000", "#f5c4a8", "#e89060", "#d96030", "#c94a1a", "#8a2e08"],
    ["#d4ca1a", "#E4C761", "#DEAD3D", "#D69525", "#CE8A1A", "#AF7C11"],
    ["#ddd43a", "#E9CC71", "#E2B24D", "#DB9A35", "#D38F2A", "#B38121"],
    ["#e6de60", "#EDD184", "#E7B760", "#DF9F48", "#D7943D", "#B88634"],
    ["#ede78a", "#F1D599", "#EABB75", "#E3A35D", "#DB9852", "#BB8A49"],
    ["#f5f0c8", "#F5DAB8", "#EEC094", "#E7A87C", "#DF9D71", "#BF8F68"],
];

const matrix2Data = [
    ["#000000", "#9dd4d4", "#4eaaaa", "#1a8080", "#0a6b6b", "#054040"],
    ["#8a2e08", "#93816E", "#6C6C59", "#525744", "#4A4C39", "#473724"],
    ["#c94a1a", "#B38F77", "#8B7A62", "#71654D", "#695A42", "#67452D"],
    ["#d96030", "#BB9A82", "#93856D", "#797058", "#71654D", "#6F5038"],
    ["#e89060", "#C2B29A", "#9B9D85", "#818870", "#797D65", "#766850"],
    ["#f5c4a8", "#C9CCBE", "#A1B7A9", "#87A294", "#7F9789", "#7D8274"],
];

const matrix3Data = [
    ["#000000", "#9dd4d4", "#4eaaaa", "#1a8080", "#0a6b6b", "#054040"],
    ["#d4ca1a", "#B8CF77", "#91BA62", "#77A54D", "#6F9A42", "#6C852D"],
    ["#ddd43a", "#BDD487", "#95BF72", "#7BAA5D", "#739F52", "#718A3D"],
    ["#e6de60", "#C1D99A", "#9AC485", "#80AF70", "#78A465", "#758F50"],
    ["#ede78a", "#C5DDAF", "#9DC89A", "#83B385", "#7BA97A", "#799365"],
    ["#f5f0c8", "#C9E2CE", "#A1CDB9", "#87B8A4", "#7FAD99", "#7D9884"],
];

const margin = { top: 20, right: 20, bottom: 30, left: 32 },
      width = 262 - margin.left - margin.right,
      height = 262 - margin.top - margin.bottom;

const svg = d3.select('#matrix').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const svg2 = d3.select('#matrix2').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const svg3 = d3.select('#matrix3').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const blockSize = Math.min(width, height) / 6;

matrixData.forEach((row, i) => {
    row.forEach((color, j) => {
        svg.append('rect').attr('x', j * blockSize).attr('y', i * blockSize)
            .attr('width', blockSize).attr('height', blockSize).style('fill', color);
    });
});
matrix2Data.forEach((row, i) => {
    row.forEach((color, j) => {
        svg2.append('rect').attr('x', j * blockSize).attr('y', i * blockSize)
            .attr('width', blockSize).attr('height', blockSize).style('fill', color);
    });
});
matrix3Data.forEach((row, i) => {
    row.forEach((color, j) => {
        svg3.append('rect').attr('x', j * blockSize).attr('y', i * blockSize)
            .attr('width', blockSize).attr('height', blockSize).style('fill', color);
    });
});

const yAxisValues = d3.range(60, -1, -12);
const xAxisValues = d3.range(0, 101, 20);
yAxisValues.forEach((value, i) => {
    svg.append('text').attr('x', margin.left - 36).attr('y', i * blockSize + blockSize / 2)
        .style('fill', 'white').style('font-size', '11px').style('alignment-baseline', 'middle')
        .style('text-anchor', 'end').text(`${value}%`);
});
xAxisValues.forEach((value, i) => {
    svg.append('text').attr('x', i * blockSize + blockSize / 2).attr('y', height + margin.bottom / 2)
        .style('fill', 'white').style('font-size', '11px').style('text-anchor', 'middle').text(`${value}%`);
});

const yAxisValues2 = d3.range(60, -1, -12);
const xAxisLabels2 = ['0', '160k', '320k', '480k', '640k', '800k'];
yAxisValues2.forEach((value, i) => {
    svg2.append('text').attr('x', margin.left - 36).attr('y', i * blockSize + blockSize / 2)
        .style('fill', 'white').style('font-size', '11px').style('alignment-baseline', 'middle')
        .style('text-anchor', 'end').text(`${value}%`);
});
xAxisLabels2.forEach((label, i) => {
    svg2.append('text').attr('x', i * blockSize + blockSize / 2).attr('y', height + margin.bottom / 2)
        .style('fill', 'white').style('font-size', '11px').style('text-anchor', 'middle').text(label);
});

const yAxisValues3 = d3.range(0, 101, 20);
const xAxisValues3 = ['0', '160k', '320k', '480k', '640k', '800k'];
yAxisValues3.forEach((value, i) => {
    svg3.append('text').attr('x', margin.left - 36).attr('y', height - i * blockSize - blockSize / 2)
        .style('fill', 'white').style('font-size', '11px').style('alignment-baseline', 'middle')
        .style('text-anchor', 'end').text(value.toString() + '%');
});
xAxisValues3.forEach((label, i) => {
    svg3.append('text').attr('x', i * blockSize + blockSize / 2).attr('y', height + margin.bottom / 2)
        .style('fill', 'white').style('font-size', '11px').style('text-anchor', 'middle').text(label);
});


// --- checkSelection (community layer toggles) ---
function checkSelection() {
    const raceChecked = document.getElementById('race2020').checked;
    const povertyChecked = document.getElementById('poverty2020').checked;
    const housingChecked = document.getElementById('housing2020').checked;

    map.setLayoutProperty('race_2020', 'visibility', raceChecked ? 'visible' : 'none');
    map.setLayoutProperty('poverty_2020', 'visibility', povertyChecked ? 'visible' : 'none');
    map.setLayoutProperty('housing_2020', 'visibility', housingChecked ? 'visible' : 'none');

    const checkedBoxes = [raceChecked, povertyChecked, housingChecked].filter(Boolean).length;
    if (checkedBoxes > 2) {
        this.checked = false;
        return;
    }

    const matrixElement = document.getElementById('matrix');
    if (raceChecked && povertyChecked) {
        matrixElement.style.display = 'block';
        map.setLayoutProperty('race+poverty', 'visibility', 'visible');
    } else {
        matrixElement.style.display = 'none';
        map.setLayoutProperty('race+poverty', 'visibility', 'none');
    }

    const matrixElement2 = document.getElementById('matrix2');
    if (housingChecked && povertyChecked) {
        matrixElement2.style.display = 'block';
        map.setLayoutProperty('poverty+property', 'visibility', 'visible');
    } else {
        matrixElement2.style.display = 'none';
        map.setLayoutProperty('poverty+property', 'visibility', 'none');
    }

    const matrixElement3 = document.getElementById('matrix3');
    if (housingChecked && raceChecked) {
        matrixElement3.style.display = 'block';
        map.setLayoutProperty('race+property', 'visibility', 'visible');
    } else {
        matrixElement3.style.display = 'none';
        map.setLayoutProperty('race+property', 'visibility', 'none');
    }
}

document.getElementById('race2020').addEventListener('change', checkSelection);
document.getElementById('poverty2020').addEventListener('change', checkSelection);
document.getElementById('housing2020').addEventListener('change', checkSelection);

document.getElementById('matrix').style.display = 'none';
document.getElementById('race2020').checked = true;
document.getElementById('poverty2020').checked = false;
document.getElementById('housing2020').checked = false;
document.getElementById('matrix2').style.display = 'none';
document.getElementById('matrix3').style.display = 'none';
document.getElementById('race-select').value = 'option6';


// --- Case Outcome layer (Albuquerque-specific) ---
function normalizeDisposition(raw) {
    if (!raw) return "other";
    const text = raw.toLowerCase();
    if (text.includes("jury conviction")) return "jury_conviction";
    if (text.includes("guilty plea") || text.includes("no contest")) return "guilty_plea";
    if (text.includes("dismiss")) return "dismissed";
    if (text.includes("deferred") || text.includes("cond. discharge")) return "pending";
    return "other";
}

// Purple palette per outcome category — matches legend swatches in HTML
const outcomeColors = {
    guilty_plea:     '#a855f7',
    jury_conviction: '#7e22ce',
    dismissed:       '#2e0057',
    pending:         '#581c87',
    other:           '#d4aaff'
};

function buildCaseOutcomeColorExpr() {
    return [
        'match', ['get', 'outcome'],
        'guilty_plea',     outcomeColors.guilty_plea,
        'jury_conviction', outcomeColors.jury_conviction,
        'dismissed',       outcomeColors.dismissed,
        'pending',         outcomeColors.pending,
        outcomeColors.other // fallback = other
    ];
}

function showCaseOutcomeMap(geojson) {
    // Normalize disposition — only keep features that have valid coords AND a known disposition
    const processed = {
        type: "FeatureCollection",
        features: geojson.features.filter(f => {
            const coords = f.geometry?.coordinates;
            if (!Array.isArray(coords) || coords.length !== 2 ||
                coords[0] == null || coords[1] == null ||
                isNaN(coords[0]) || isNaN(coords[1])) return false;
            const raw = f.properties["Disposition (from Criminal Dockets)"];
            const outcome = normalizeDisposition(raw);
            // Exclude records with no disposition data
            if (!raw || outcome === 'other') {
                // Keep 'other' only if disposition field is present but unrecognized
                // Drop completely if field is absent/empty
                if (!raw || raw.trim() === '') return false;
            }
            f.properties.outcome = outcome;
            return true;
        })
    };

    if (map.getSource('caseOutcome')) {
        map.getSource('caseOutcome').setData(processed);
    } else {
        map.addSource('caseOutcome', { type: 'geojson', data: processed });

        // SDF pin base layer — colored by outcome
        map.addLayer({
            id: 'caseOutcome',
            type: 'symbol',
            source: 'caseOutcome',
            layout: {
                'icon-image': 'bail-pin',
                'icon-size': 0.35,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            },
            paint: {
                'icon-color': buildCaseOutcomeColorExpr(),
                'icon-opacity': 0.9
            }
        });

        // White overlay
        map.addLayer({
            id: 'caseOutcome_overlay',
            type: 'symbol',
            source: 'caseOutcome',
            layout: {
                'icon-image': 'bail-pin-overlay',
                'icon-size': 0.35,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            },
            paint: { 'icon-opacity': 0.9 }
        });

        // Popup — try multiple possible property key variants for robustness
        map.on('click', 'caseOutcome', function(e) {
            if (e.features.length > 0) {
                var f = e.features[0];
                var p = f.properties;
                // Amount: try both possible key formats
                var amount = p['Amount'] || p['amount'] || '';
                // Company: try both possible key formats
                var bondcompany = p['Bonding Company'] || p['bonding_company'] || p['BondCompany'] || '';
                // Duration: try both possible key formats
                var duration = p['Lien Duration'] || p['lien_duration'] || p['Duration'] || '';
                var outcome = p['outcome'] || '';

                var amountFormatted = amount !== '' ? '$' + Number(String(amount).replace(/[^0-9.]/g,'')).toLocaleString('en-US') : '';
                var durationFormatted = duration !== '' ? duration + ' days' : '';
                var outcomeLabel = {
                    guilty_plea: 'Guilty Plea', jury_conviction: 'Jury Conviction',
                    dismissed: 'Dismissed', pending: 'Pending', other: 'Other'
                }[outcome] || outcome;

                new mapboxgl.Popup({ anchor: 'bottom-left' })
                    .setLngLat(e.lngLat)
                    .setHTML(
                        '<p><b>Amount</b>: ' + amountFormatted + '</p>' +
                        '<p><b>Bond company</b>: ' + bondcompany + '</p>' +
                        '<p><b>Duration</b>: ' + durationFormatted + '</p>' +
                        '<p><b>Outcome</b>: ' + outcomeLabel + '</p>')
                    .addTo(map);
            }
        });
    }

    applyCaseOutcomeFilter();
}

// Filter caseOutcome layer by selected outcome categories
function applyCaseOutcomeFilter() {
    if (!map.getLayer('caseOutcome')) return;
    if (!legendFilterState.active || legendFilterState.type !== 'outcome' || legendFilterState.activeKeys.size === 0) {
        map.setFilter('caseOutcome', null);
        if (map.getLayer('caseOutcome_overlay')) map.setFilter('caseOutcome_overlay', null);
        return;
    }
    const keys = Array.from(legendFilterState.activeKeys);
    const filterExpr = ['in', ['get', 'outcome'], ['literal', keys]];
    map.setFilter('caseOutcome', filterExpr);
    if (map.getLayer('caseOutcome_overlay')) map.setFilter('caseOutcome_overlay', filterExpr);
}

function updateOutcomeLayer() {
    let dataPath = 'data/lien_overall/lien_overall_with_disposition.geojson';
    const checked = document.querySelector('.year-checkbox:checked');
    const selectedYear = checked ? checked.value : 'all';
    if (selectedYear !== 'all') {
        dataPath = `data/lien_byyear/lien_${selectedYear}_with_disposition.geojson`;
    }
    if (map.getLayer('caseOutcome')) map.removeLayer('caseOutcome');
    if (map.getLayer('caseOutcome_overlay')) map.removeLayer('caseOutcome_overlay');
    if (map.getSource('caseOutcome')) map.removeSource('caseOutcome');
    d3.json(dataPath).then(data => { showCaseOutcomeMap(data); });
}




