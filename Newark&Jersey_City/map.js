mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongqianli/cluh62aew033f01qqcszb71kp',
    zoom: 11,
    minZoom: 10.5, 
    maxZoom: 11.5,
    center: [-74.18861, 40.7725],
    pitch: 0, 
    bearing: 0 
});

map.on('load', function () {

    // Update water layer appearance
    const waterLayer = map.getStyle().layers.find(layer => layer.id === 'water');
    if (waterLayer) {
        map.setPaintProperty('water', 'fill-color', '#9e9e9e');
        map.setPaintProperty('water', 'fill-opacity', 1.0);
    } else {
        console.error('Water layer not found');
    }


    // --- County mask ---
    // Two-layer approach: a dim fill over outside areas, plus a heavily blurred
    // line along the boundary edge to create a soft vignette transition.
    map.addSource('county-mask', {
        type: 'geojson',
        data: 'data/binarymap/mask.geojson'
    });

    // Outer fill: dims everything outside the target area
    map.addLayer({
        id: 'county-mask-layer',
        type: 'fill',
        source: 'county-mask',
        paint: {
            'fill-color': '#cdd6da',
            'fill-opacity': 0.7
        }
    });

    // Blurred edge: a wide soft line traced along the mask boundary.
    // line-blur creates a genuine feathered edge in Mapbox.
    map.addLayer({
        id: 'county-mask-edge-layer',
        type: 'line',
        source: 'county-mask',
        paint: {
            'line-color': '#cdd6da',
            'line-width': 900,
            'line-blur': 400,
            'line-opacity': 0.8
        }
    });
    // --- End county mask ---

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
                ['==', ['get', 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: White alone'], null], 'transparent',
                // Pastel yellow scale: 0–20% white = lightest; 80–100% white = darkest
                ['step', ['get', 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: White alone'],
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
                ['==', ['get', 'ACSST5Y2020.S1701-Data-Reformatted_Percent below poverty level!!Estimate!!Population for whom poverty status is determined'], null], 'transparent',
                ['step', ['get', 'ACSST5Y2020.S1701-Data-Reformatted_Percent below poverty level!!Estimate!!Population for whom poverty status is determined'],
                    '#ffffff',
                    0, '#2E0047',
                    12, '#610075',
                    24, '#9300A3',
                    36, '#C500D1',
                    48, '#F800FF'
                ]
            ],
            'fill-opacity': 1
        }
    });
    map.setLayoutProperty('poverty_2020', 'visibility', 'none');

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
                    0, '#011356',
                    160000, '#01417F',
                    320000, '#016EA8',
                    480000, '#009CD0',
                    640000, '#00CAF9'
                ]
            ],
            'fill-opacity': 1
        }
    });
    map.setLayoutProperty('housing_2020', 'visibility', 'none');



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
                ['get', 'Bi_class'],
                'E1', '#F52AFF','E2', '#F254FF','E3', '#F07EFF','E4', '#EDA8FF','E5', '#EAD2FF',
                'D1', '#C42DCD','D2', '#C259D2','D3', '#C084D7','D4', '#BEB0DC','D5', '#BBDBE1',
                'C1', '#93309B','C2', '#915DA5','C3', '#908AAF','C4', '#8EB7B8','C5', '#8CE4C2',
                'B1', '#623468','B2', '#616277','B3', '#609186','B4', '#5FBF95','B5', '#5EEDA4',
                'A1', '#313736','A2', '#30664A','A3', '#30975E','A4', '#2FC671','A5', '#2FF685',
                '#000000' 
                ]
            }
        });
        map.setLayoutProperty('race+poverty', 'visibility', 'none');

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
                    'E1', '#BC6CAC','E2', '#C684B9','E3', '#D19EC8','E4', '#DCB9D8','E5', '#EAD6E9',
                    'D1', '#A56EAF','D2', '#AE85BC','D3', '#B79DCA','D4', '#C1B7DA','D5', '#CDD2EA',
                    'C1', '#8F62A7','C2', '#9585BE','C3', '#9C9CCD','C4', '#A5B5DC','C5', '#AFCEEC',
                    'B1', '#724B99','B2', '#7877B4','B3', '#809BCF','B4', '#86B2DF','B5', '#8ECAEE',
                    'A1', '#463778','A2', '#5160A1','A3', '#588AC2','A4', '#63AFE1','A5', '#68C6F0',
                    '#000000' 
                    ]
                }
            });
            map.setLayoutProperty('poverty+property', 'visibility', 'none');    
    
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
                    'E1', '#88C768','E2', '#9ED084','E3', '#B4D99E','E4', '#CAE4BA','E5', '#E0EFD7',
                    'D1', '#69C071','D2', '#81C88C','D3', '#98D1A5','D4', '#AEDBC0','D5', '#C4E6DC',
                    'C1', '#41AF73','C2', '#60C092','C3', '#7AC9AB','C4', '#91D2C6','C5', '#A7DCE2',
                    'B1', '#008E6F','B2', '#35A995','B3', '#55C2B1','B4', '#70CACC','B5', '#88D4E7',
                    'A1', '#105A5E','A2', '#007E8F','A3', '#26A3B4','A4', '#46C3D1','A5', '#63CCEC',
                    '#000000' 
                    ]
                }
            });
            map.setLayoutProperty('race+property', 'visibility', 'none');    

                
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
                        'E1', '#F52AFF','E2', '#F254FF','E3', '#F07EFF','E4', '#EDA8FF','E5', '#EAD2FF',
                        'D1', '#C42DCD','D2', '#C259D2','D3', '#C084D7','D4', '#BEB0DC','D5', '#BBDBE1',
                        'C1', '#93309B','C2', '#915DA5','C3', '#908AAF','C4', '#8EB7B8','C5', '#8CE4C2',
                        'B1', '#623468','B2', '#616277','B3', '#609186','B4', '#5FBF95','B5', '#5EEDA4',
                        'A1', '#313736','A2', '#30664A','A3', '#30975E','A4', '#2FC671','A5', '#2FF685',
                        '#000000' 
                        ]
                    }
                });
                map.setLayoutProperty('poverty+property', 'visibility', 'none');    
            
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
                            'E1', '#F52AFF','E2', '#F254FF','E3', '#F07EFF','E4', '#EDA8FF','E5', '#EAD2FF',
                            'D1', '#C42DCD','D2', '#C259D2','D3', '#C084D7','D4', '#BEB0DC','D5', '#BBDBE1',
                            'C1', '#93309B','C2', '#915DA5','C3', '#908AAF','C4', '#8EB7B8','C5', '#8CE4C2',
                            'B1', '#623468','B2', '#616277','B3', '#609186','B4', '#5FBF95','B5', '#5EEDA4',
                            'A1', '#313736','A2', '#30664A','A3', '#30975E','A4', '#2FC671','A5', '#2FF685',
                            '#000000' 
                            ]
                        }
                    });
                    map.setLayoutProperty('race+property', 'visibility', 'none');    
            

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
    
    // map.addLayer({
    //     'id': 'lien_overall',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_overall/lien_overall.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], // Check if Amount is a number
    //             ['step', ['get', 'Amount'], // If it is a number, determine color based on the value of Amount
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' // If Amount is not a number (e.g. undefined or null), use gray as a 'no data' color
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });

    // map.addLayer({
    //     'id': 'lien_1998',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/1998_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_1998', 'visibility', 'none');    
    // map.addLayer({
    //     'id': 'lien_1999',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/1999_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_1999', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2000',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2001_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2000', 'visibility', 'none');    
    // map.addLayer({
    //     'id': 'lien_2001',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2001_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2001', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2002',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2002_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2002', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2003',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2003_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2003', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2004',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2004_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2004', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2005',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2005_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2005', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2006',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2006_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2006', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2007',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2007_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2007', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2008',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2008_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2008', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2009',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2009_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2009', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2010',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2010_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2010', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2011',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2011_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2011', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2012',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2012_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2012', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2013',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2013_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2013', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2014',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2014_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2014', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2015',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2015_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2015', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2016',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2016_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2016', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2017',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2017_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2017', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2018',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2018_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2018', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2019',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2019_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2019', 'visibility', 'none');
    // map.addLayer({
    //     'id': 'lien_2020',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2020_accumulate.geojson'
    //     },
    //     'paint': {
    //         'circle-color': [
    //             'case',
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], 
    //             ['step', ['get', 'Amount'], 
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' 
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });
    // map.setLayoutProperty('lien_2020', 'visibility', 'none');



    // // Ensure road and water layers appear above custom layers
    //     map.moveLayer('water');
    //     map.moveLayer('road-simple');
    //     map.moveLayer('lien_overall');
    //     map.moveLayer('lien_1998');
    //     map.moveLayer('lien_1999');
    //     map.moveLayer('lien_2000');
    //     map.moveLayer('lien_2001');
    //     map.moveLayer('lien_2002');
    //     map.moveLayer('lien_2003');
    //     map.moveLayer('lien_2004');
    //     map.moveLayer('lien_2005');
    //     map.moveLayer('lien_2006');
    //     map.moveLayer('lien_2007');
    //     map.moveLayer('lien_2008');
    //     map.moveLayer('lien_2009');
    //     map.moveLayer('lien_2010');
    //     map.moveLayer('lien_2011');
    //     map.moveLayer('lien_2012');
    //     map.moveLayer('lien_2013');
    //     map.moveLayer('lien_2014');
    //     map.moveLayer('lien_2015');
    //     map.moveLayer('lien_2016');
    //     map.moveLayer('lien_2017');
    //     map.moveLayer('lien_2018');
    //     map.moveLayer('lien_2019');
    //     map.moveLayer('lien_2020');
    //     map.moveLayer('poi-label');
    //     map.moveLayer('waterway-label');
    //     map.moveLayer('airport-label');
    //     map.moveLayer('road-label-simple');

    //     const style = map.getStyle();
    //     console.log(style);
    // // Get the property name corresponding to the selected option

    // Generate a list of year strings given a start and end year
    function provideYears(startYear, endYear) {
        let yearsArray = [];
        for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
            yearsArray.push(year.toString());
        }
        return yearsArray;
    }
    
    let yearsList = provideYears("2000", "2020"); // ("start year", "end year")

    // Function to update the map layer based on selected option.
    // Uses icon-color since lien layers are now SDF symbol layers.
    function updateMapLayer(selectedOption) {
        let colorExpression = '#2b2b2b';

        // For each year, apply the icon-color paint property
        yearsList.forEach(function(year) {
            let layerName = 'lien_' + year;
            map.setPaintProperty(layerName, 'icon-color', colorExpression);
        });
    }

    // Load the SDF pin image, then add all lien layers as symbol layers
    loadPinImage(map, function() {

        // Add a symbol layer for each year
        yearsList.forEach(function(year) {
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
        });

        // Add the lien_overall layer
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
                // feature-state IS supported in paint properties, so hover opacity works here
                'icon-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1.0, // Full opacity on hover
                    0.9  // Default opacity
                ]
            }
        });

        // Ensure road and water layers appear above custom layers
        map.moveLayer('water');
        map.moveLayer('road-simple');
        map.moveLayer('lien_overall');
        yearsList.forEach(function(year) {
            map.moveLayer('lien_' + year);
        });
        map.moveLayer('poi-label');
        map.moveLayer('waterway-label');
        map.moveLayer('airport-label');
        map.moveLayer('road-label-simple');

    }); // end loadPinImage

    // Event listener for dropdown menu changes
    document.getElementById('bond-select').addEventListener('change', function() {
        const selectedOption = this.value;
        updateMapLayer(selectedOption);
    });

    let hoveredFeatureId = null;



     // Mouse enter event handling
     map.on('mouseenter', 'lien_overall', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
            if (hoveredFeatureId) {
                map.setFeatureState(
                    { source: 'lien_overall', id: hoveredFeatureId },
                    { hover: false }
                );
            }
            hoveredFeatureId = e.features[0].id;
            map.setFeatureState(
                { source: 'lien_overall', id: hoveredFeatureId },
                { hover: true }
            );
        }
    });

    // Mouse leave event handling
    map.on('mouseleave', 'lien_overall', function () {
        map.getCanvas().style.cursor = '';
        if (hoveredFeatureId) {
            map.setFeatureState(
                { source: 'lien_overall', id: hoveredFeatureId },
                { hover: false }
            );
        }
        hoveredFeatureId = null;
    });

        map.on('click', 'lien_overall', function(e) {
            // Ensure at least one feature is selected
            if (e.features.length > 0) {
                var feature = e.features[0];
                
                // Read amount and duration properties from the feature
                var amount = feature.properties['Amount']|| ''; 
                var signdate = feature.properties['Signing Date']|| ''; 
                var releasedate = feature.properties['Date Release Signed']|| ''; 
                var foreclosedate = feature.properties['Foreclosure Date']|| ''; 
                var duration = feature.properties['Lien Duration']|| ''; 
                var bondcompany = feature.properties['Bonding Company']|| ''; 
                
                // Create a Popup instance and set its content
                var popup = new mapboxgl.Popup()
                    .setLngLat(e.lngLat) 
                    .setHTML(
                                '<p><b>Amount($)</b>: ' + amount + '</p>' +
                                '<p><b>Bond company</b>: ' + bondcompany + '</p>' +
                                '<p><b>Sign date</b>: ' + signdate + '</p>' +
                                '<p><b>Release date</b>: ' + releasedate + '</p>' +
                                '<p><b>Foreclose date</b>: ' + foreclosedate + '</p>' +
                                '<p><b>Duration(year)</b>: ' + duration + '</p>') 
                    .addTo(map); 
            }
        });

        function filterLayer() {
            // Filtering conditions for the lien_overall layer
            const overallFilters = ['any'];
            const signed = document.getElementById('liensigned').checked;
            const released = document.getElementById('lienreleased').checked;
            const foreclosed = document.getElementById('lienforeclosed').checked;
            const pending = document.getElementById('lienpending').checked;

            console.log(signed);
            console.log(released);
            console.log(foreclosed);
            console.log(pending);
        
            const signedFilter = ['==', ['get', 'Status'], 'Signed'];
            const releasedFilter = ['==', ['get', 'Status'], 'Released'];
            const foreclosedFilter = ['==', ['get', 'Status'], 'Foreclosed'];
            const releaseBeforeForeclosedFilter = [
                '==',
                ['get', 'Status'],
                'Release (before foreclose)',
                ];
            const pendingFilter = ['==', ['get', 'Status'], 'Pending'];

                if (signed)
                overallFilters.push(signedFilter);
                if (released) overallFilters.push(releasedFilter);
                if (foreclosed) {
                overallFilters.push(foreclosedFilter, releaseBeforeForeclosedFilter);
                }
                if (pending) overallFilters.push(pendingFilter);

    
        
            // Apply filtering conditions to the lien_overall layer; return overallfilters if at least one checkbox is checked
            map.setFilter('lien_overall', overallFilters.length > 0 ? overallFilters : null);
        
            // Filtering conditions for each year layer
            const yearsFilters = ['any'];
            if (signed) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Signed That Year']);
            if (released) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Released That Year']);
            if (foreclosed) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Foreclosed That Year']);
            if (pending) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Pending']);
        
            
            
            // Apply filter conditions to each year layer
            const years = Array.from({length: 21}, (_, i) => i + 1998); // Years 1998 to 2020
            years.forEach(year => {
                const layerId = `lien_${year}`;
                try {
                    map.setFilter(layerId, yearsFilters.length > 0 ? yearsFilters : null);
                } catch (error) {
                    console.error(`Error applying filter to layer ${layerId}:`, error);
                }
            });
        }
        
        // Add event listeners for each checkbox
        document.getElementById('liensigned').addEventListener('change', filterLayer);
        document.getElementById('lienreleased').addEventListener('change', filterLayer);
        document.getElementById('lienforeclosed').addEventListener('change', filterLayer);
        document.getElementById('lienpending').addEventListener('change', filterLayer);
        
        // Call filterLayer on initialization to apply initial filter conditions
        filterLayer();
        

////
function updateYearCheckboxes(selectedYear) {
    document.querySelectorAll('.year-checkbox').forEach(checkbox => {
        checkbox.checked = false; // First deselect all checkboxes
    });
    
    if (selectedYear) {
        document.getElementById('year-' + selectedYear).checked = true; // Select the specific year
    } else {
        document.getElementById('year-all').checked = true; // Ensure "All" is always selected
    }

    updateLayerVisibility(selectedYear);
}
  
// Set map layer visibility based on the selected year
function updateLayerVisibility(selectedYear) {
    const years = ["1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];
    
    if (!selectedYear || selectedYear === 'all') {
        // If 'All' is selected, show the 'lien_overall' layer and hide all year layers
        map.setLayoutProperty('lien_overall', 'visibility', 'visible');
        years.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', 'none');
            }
        });
    } else {
        // Otherwise, show the selected year's layer and hide 'lien_overall' and all other year layers
        years.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', year === selectedYear ? 'visible' : 'none');
            }
        });
        map.setLayoutProperty('lien_overall', 'visibility', 'none');
    }
}
  
// Add event listeners for all year checkboxes
document.querySelectorAll('.year-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
        // When a specific year is selected, deselect 'All' and update layer visibility
        const selectedId = e.target.id.replace('year-', '');
        updateYearCheckboxes(selectedId === 'all' ? null : selectedId);
    });
});

// Initialize to show 'All'
updateYearCheckboxes(null);

});

document.getElementById('race-select').addEventListener('change', function(e) {
    var propertyName = '';
    switch (e.target.value) {
        case 'option1':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: White alone';
            break;
        case 'option2':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Black or African American alone';
            break;
        case 'option3':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: American Indian and Alaska Native alone';
            break;
        case 'option4':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Asian alone';
            break;
        case 'option5':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Native Hawaiian and Other Pacific Islander alone';
            break;
        case 'option6':
            propertyName = 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: Hispanic or Latino';
            break;
    }

    // Update the layer's fill-color property
    // For 'White alone' (option1): inverted so darkest yellow = lowest % white (most non-white areas)
    // For all other groups: normal direction so darkest yellow = highest % of that group
    if (propertyName) {
        if (e.target.value === 'option1') {
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
        } else {
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
    }
});


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

function drawBarChart(data) {
var margin = {top: 20, right: 10, bottom: 120, left: 40},
    width = 265 - margin.left - margin.right,
    height = 320 - margin.top - margin.bottom;

var svg = d3.select(".company-barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set X-axis scale
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    .domain(data.map(function(d) { return d.company; }));

// Set Y-axis scale
var y = d3.scaleLinear().range([height, 0])
    .domain([0, d3.max(data, function(d) { return d.count; })]);

// Add X axis
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

// Add Y axis
svg.append("g")
    .call(d3.axisLeft(y).ticks(10))
    .selectAll("text")
    .style("fill", "white")
    .style("font-size", "12px"); 

svg.selectAll(".domain, .tick line")
    .style("stroke", "white"); 

var colorScale = d3.scaleOrdinal()
    .domain(data.map(function(d) { return d.company; }))
    .range(['#fcf467', '#d8c4fb','#ea8972', '#5fcad2', '#4ca48a', '#FF7733', '#f2c947', '#F48A28', '#80BB47', '#FEBA2A', '#949494']);

svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .style("fill", function(d) { return colorScale(d.company); })
    .attr("x", function(d) { return x(d.company); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.count); })
    .attr("height", function(d) { return height - y(d.count); });

svg.selectAll(".text")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .style("fill", "white") 
    .attr("x", (function(d) { return x(d.company) + x.bandwidth() / 2; }))
    .attr("y", function(d) { return y(d.count) - 12; }) 
    .attr("dy", ".75em")
    .text(function(d) { return d.count; })
    .attr("text-anchor", "middle")
    .style("font-size", "12px"); 
}

document.getElementById('bond-select').addEventListener('change', function(e) {
    var incomeLegend = document.getElementById('income-legend');
    var durationLegend = document.getElementById('duration-legend');
    if (e.target.value ===  'option3') {
        map.setPaintProperty('lien_overall', 'icon-color', [
            'match',
            ['get', 'Bonding Company'],
            'AAA Bail Bonds', '#fcf467',
            'Pacheco Bonding', '#ea8972',
            'A Bail Bond Co.', '#0B8A7C',
            'ASAP Bail Bond', '#5fcad2',
            'Aardvark Bail Bond', '#4ca48a',
            'Affordable Bail Bonds', '#FF7733',
            'Martinez Bail Bonds', '#f2c947',
            'Help Bail Bonds', '#F48A28',
            'ABC Bail Bonds', '#80BB47',
            'Gonzales Bail Bonds', '#FEBA2A',
            '#949494' 
        ]);
        incomeLegend.style.display = 'none'; // Hide the income legend
        durationLegend.style.display = 'none'; // Disable the duration legend
        d3.select('.company-barchart svg').remove(); // Remove any existing bar chart
        drawBarChart(data); // Redraw the bar chart

    } else if (e.target.value === 'option1') {
        
        map.setPaintProperty('lien_overall', 'icon-color', '#2b2b2b');
        durationLegend.style.display = 'none'; // Hide the duration legend
        d3.select('.company-barchart svg').remove(); // Remove any existing bar chart
        incomeLegend.style.display = ''; // Show the income legend

    } else if (e.target.value === 'option2') { // Lien Duration option
        
        map.setPaintProperty('lien_overall', 'icon-color', '#2b2b2b');
        d3.select('.company-barchart svg').remove(); // Remove any existing bar chart
        incomeLegend.style.display = 'none'; // Hide the income legend
        durationLegend.style.display = ''; // Show the duration legend
    }
});
d3.select('.company-barchart svg').remove(); // Ensure the chart is cleared initially

// Matrix color data
const matrixData = [
    ["#F800FF", "#F52AFF", "#F254FF", "#F07EFF", "#EDA8FF", "#EAD2FF"],
    ["#C500D1", "#C42DCD", "#C259D2", "#C084D7", "#BEB0DC", "#BBDBE1"],
    ["#9300A3", "#93309B", "#915DA5", "#908AAF", "#8EB7B8", "#8CE4C2"],
    ["#610075", "#623468", "#616277", "#609186", "#5FBF95", "#5EEDA4"],
    ["#2E0047", "#313736", "#30664A", "#30975E", "#2FC671", "#2FF685"],
    ["#000000", "#003A04", "#006B1D", "#009D36", "#00CE4E", "#00FF67"],
];

const matrix2Data = [
    ["#F800FF", "#BC6CAC", "#C684B9", "#D19EC8", "#DCB9D8", "#EAD6E9"],
    ["#C500D1", "#A56EAF", "#AE85BC", "#B79DCA", "#C1B7DA", "#CDD2EA"],
    ["#9300A3", "#8F62A7", "#9585BE", "#9C9CCD", "#A5B5DC", "#AFCEEC"],
    ["#610075", "#724B99", "#7877B4", "#809BCF", "#86B2DF", "#8ECAEE"],
    ["#2E0047", "#463778", "#5160A1", "#588AC2", "#63AFE1", "#68C6F0"],
    ["#000000", "#1C1E52", "#1C437E", "#006FA9", "#009CD1", "#28C4F3"],
];


const matrix3Data = [
    ["#71BF4E", "#88C768", "#9ED084", "#B4D99E", "#CAE4BA", "#E0EFD7"],
    ["#49B74D", "#69C071", "#81C88C", "#98D1A5", "#AEDBC0", "#C4E6DC"],
    ["#079D49", "#41AF73", "#60C092", "#7AC9AB", "#91D2C6", "#A7DCE2"],
    ["#0B6B37", "#008E6F", "#35A995", "#55C2B1", "#70CACC", "#88D4E7"],
    ["#193A1B", "#105A5E", "#007E8F", "#26A3B4", "#46C3D1", "#63CCEC"],
    ["#000000", "#1C1E52", "#1C437E", "#006FA9", "#009CD1", "#28C4F3"],
];


// SVG dimensions and margins
const margin = { top: 20, right: 20, bottom: 30, left: 32},
        width = 262 - margin.left - margin.right,
        height = 262 - margin.top - margin.bottom;

// Create SVG elements
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

// Set the size of each color block
const blockSize = Math.min(width, height) / 6;

// Draw the color block matrix
matrixData.forEach((row, i) => {
    row.forEach((color, j) => {
    svg.append('rect')
        .attr('x', j * blockSize)
        .attr('y', i * blockSize)
        .attr('width', blockSize)
        .attr('height', blockSize)
        .style('fill', color);
    });
});

matrix2Data.forEach((row, i) => {
    row.forEach((color, j) => {
    svg2.append('rect')
        .attr('x', j * blockSize)
        .attr('y', i * blockSize)
        .attr('width', blockSize)
        .attr('height', blockSize)
        .style('fill', color);
    });
});

matrix3Data.forEach((row, i) => {
    row.forEach((color, j) => {
    svg3.append('rect')
        .attr('x', j * blockSize)
        .attr('y', i * blockSize)
        .attr('width', blockSize)
        .attr('height', blockSize)
        .style('fill', color);
    });
});


// Create percentage labels on the left and bottom axes
const yAxisValues = d3.range(60, -1, -12);
const xAxisValues = d3.range(0, 101, 20);

// Add Y-axis percentage labels
yAxisValues.forEach((value, i) => {
    svg.append('text')
       .attr('x', margin.left-36) // Label position on the left
       .attr('y', i * blockSize + blockSize / 2) // Y position at the center of each block
       .style('fill', 'white') // Text color
       .style('font-size', '11px')
       .style('alignment-baseline', 'middle') // Vertically center the text
       .style('text-anchor', 'end') // Right-align the text
       .text(`${value}%`); // Add text
});

// Add X-axis percentage labels
xAxisValues.forEach((value, i) => {
    svg.append('text')
       .attr('x', i * blockSize + blockSize / 2) // X position at the center of each block
       .attr('y', height + margin.bottom / 2) // Label position at the bottom
       .style('fill', 'white') 
       .style('font-size', '11px') // Text color
       .style('text-anchor', 'middle') // Horizontally center the text
       .text(`${value}%`); // Add text
});

const yAxisValues2 = d3.range(60, -1, -12);
const xAxisLabels2 = ['0', '160k', '320k', '480k', '640k', '800k'];

// Add Y-axis percentage labels
yAxisValues2.forEach((value, i) => {
    svg2.append('text')
       .attr('x', margin.left-36) // Label position on the left
       .attr('y', i * blockSize + blockSize / 2) // Y position at the center of each block
       .style('fill', 'white') // Text color
       .style('font-size', '11px')
       .style('alignment-baseline', 'middle') // Vertically center the text
       .style('text-anchor', 'end') // Right-align the text
       .text(`${value}%`); // Add text
});

// Add X-axis percentage labels
xAxisLabels2.forEach((label, i) => {
    svg2.append('text')
       .attr('x', i * blockSize + blockSize / 2) // X position at the center of each block
       .attr('y', height + margin.bottom / 2) // Label position at the bottom
       .style('fill', 'white') 
       .style('font-size', '11px') // Text color
       .style('text-anchor', 'middle') // Horizontally center the text
       .text(label); // Add text
});

const yAxisValues3 = d3.range(0, 101, 20);
const xAxisValues3 = ['0', '160k', '320k', '480k', '640k', '800k'];

// Add Y-axis percentage labels
yAxisValues3.forEach((value, i) => {
    svg3.append('text')
       .attr('x', margin.left - 36) // X position of the label
       .attr('y', height - i * blockSize - blockSize / 2) // Adjust Y-axis label position
       .style('fill', 'white') // Text color
       .style('font-size', '11px') // Text size
       .style('alignment-baseline', 'middle') // Vertically center the text
       .style('text-anchor', 'end') // Right-align the text
       .text(value.toString() + '%'); // Text content
});

// Add X-axis percentage labels
xAxisValues3.forEach((label, i) => {
    svg3.append('text')
       .attr('x', i * blockSize + blockSize / 2) // X position at the center of each block
       .attr('y', height + margin.bottom / 2) // Label position at the bottom
       .style('fill', 'white') 
       .style('font-size', '11px') // Text color
       .style('text-anchor', 'middle') // Horizontally center the text
       .text(label); // Add text
});



function checkSelection() {
    // Get the state of each checkbox
    const raceChecked = document.getElementById('race2020').checked;
    const povertyChecked = document.getElementById('poverty2020').checked;
    const housingChecked = document.getElementById('housing2020').checked;
  
    // Set map layer visibility
    map.setLayoutProperty('race_2020', 'visibility', raceChecked ? 'visible' : 'none');
    map.setLayoutProperty('poverty_2020', 'visibility', povertyChecked ? 'visible' : 'none');
    map.setLayoutProperty('housing_2020', 'visibility', housingChecked ? 'visible' : 'none');
  
    // Count how many checkboxes are checked
    const checkedBoxes = [raceChecked, povertyChecked, housingChecked].filter(isChecked => isChecked).length;
  
    // At most two can be selected; if more than two, deselect the current checkbox
    if (checkedBoxes > 2) {
    this.checked = false; // Deselect the current checkbox
    return;
    }

    // Show or hide the matrix element
    const matrixElement = document.getElementById('matrix');
    if (raceChecked && povertyChecked) {
      // If both race and poverty are selected, show the matrix element
    matrixElement.style.display = 'block';
    map.setLayoutProperty('race+poverty', 'visibility', 'visible');
    } else {
    // Otherwise hide the matrix element
    matrixElement.style.display = 'none';
    map.setLayoutProperty('race+poverty', 'visibility', 'none');
    }

    // Show or hide the matrix element
    const matrixElement2 = document.getElementById('matrix2');
    if (housingChecked && povertyChecked) {
      // If both race and poverty are selected, show the matrix element
    matrixElement2.style.display = 'block';
    map.setLayoutProperty('poverty+property', 'visibility', 'visible'); 
    } else {
    // Otherwise hide the matrix element
    matrixElement2.style.display = 'none';
    map.setLayoutProperty('poverty+property', 'visibility', 'none');
    }

    // Show or hide the matrix element
    const matrixElement3 = document.getElementById('matrix3');
    if (housingChecked && raceChecked) {
      // If both race and poverty are selected, show the matrix element
    matrixElement3.style.display = 'block';
    map.setLayoutProperty('race+property', 'visibility', 'visible'); 
    } else {
    // Otherwise hide the matrix element
    matrixElement3.style.display = 'none';
    map.setLayoutProperty('race+property', 'visibility', 'none');
    }
}


// Add event listeners for the checkboxes
document.getElementById('race2020').addEventListener('change', checkSelection);
document.getElementById('poverty2020').addEventListener('change', checkSelection);
document.getElementById('housing2020').addEventListener('change', checkSelection);

// Initialize state
    document.getElementById('matrix').style.display = 'none'; // Hide matrix element by default
    document.getElementById('race2020').checked = true;  
    document.getElementById('poverty2020').checked = false;
    document.getElementById('housing2020').checked = false;
    document.getElementById('matrix2').style.display = 'none'; 
    document.getElementById('matrix3').style.display = 'none'; 
