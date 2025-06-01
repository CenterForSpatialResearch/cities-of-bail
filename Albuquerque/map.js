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

var selectedYear = "all";
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
                    0, '#011356',
                    20, '#01417F',
                    40, '#016EA8',
                    60, '#009CD0',
                    80, '#00CAF9'
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
                    0, '#003A04',
                    160000, '#006B1D',
                    320000, '#009D36',
                    480000, '#00CE4E',
                    640000, '#00FF67'
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
                ['get', 'BI_H-R_H'],
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
    //             ['==', ['typeof', ['get', 'Amount']], 'number'], // 检查Amount是否为数字类型
    //             ['step', ['get', 'Amount'], // 如果是数字，根据Amount的值决定颜色 If it is a number, the color is determined based on the value of Amount
    //                 '#ffffff', 0,
    //                 '#ffa463', 35350,
    //                 '#ff8363', 85000,
    //                 '#ff6263', 164500,
    //                 '#ff4062', 305500,
    //                 '#ff1f62'
    //             ],
    //             '#cccccc' // 如果Amount不是数字类型（例如undefined或null），使用灰色（或您希望的任何“没有数据”的颜色）
    //         ],
    //         'circle-radius': 3, 
    //     }
    // });

    // map.addLayer({
    //     'id': 'lien_2000',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'data/lien_byyear/2000_accumulate.geojson'
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
    
    //         let hoveredFeatureId = null;
    
    // Generate a list of year strings given a start and end year
    function provideYears(startYear, endYear) {
        let yearsArray = [];
        for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
            yearsArray.push(year.toString());
        }
        return yearsArray;
    }
    
    let yearsList = provideYears("2000", "2020"); // ("start year", "end year")

    // Function to update the map layer based on selected option
    function updateMapLayer(selectedOption) {
        let colorExpression;

        if (selectedOption === 'option1') {
            colorExpression = [
                'case',
                ['==', ['typeof', ['get', 'Amount']], 'number'], 
                ['step', ['get', 'Amount'], 
                    '#ffffff', 0,
                    '#ffa463', 35350,
                    '#ff8363', 85000,
                    '#ff6263', 164500,
                    '#ff4062', 305500,
                    '#ff1f62'
                ],
                '#cccccc'
            ];
        } else if (selectedOption === 'option2') {
            colorExpression = [
                'case',
                ['==', ['typeof', ['get', 'Lien Duration']], 'number'],
                ['step', ['get', 'Lien Duration'],
                    '#ffffff', 0,             // Division 1: 0 to 1824
                    '#ffa463', 1825,          // Division 2: 1825 to 3649
                    '#ff8363', 3650,          // Division 3: 3650 to 5474
                    '#ff6263', 5475,          // Division 4: 5475 to 7299
                    '#ff4062', 7300,           // Division 5: 7300 to 9124
                    '#ff1f62'
                ],
                '#cccccc'
            ];
        }

        // For each year, apply the paint property for the lien
        yearsList.forEach(function(year) {
            let layerName = 'lien_' + year;
            map.setPaintProperty(layerName, 'circle-color', colorExpression);
        });
    }

    // For each year, apply the paint property for the lien
    yearsList.forEach(function(year) {
        let lienYear = 'lien_' + year;
        // Initial map layer setup
        map.addLayer({
            'id': lienYear,
            'type': 'circle',
            'source': {
                'type': 'geojson',
                'data': 'data/lien_byyear/' + year + '_accumulate.geojson'
            },
            'paint': {
                'circle-color': [
                    'case',
                    ['==', ['typeof', ['get', 'Amount']], 'number'], 
                    ['step', ['get', 'Amount'], 
                        '#ffffff', 0,
                        '#ffa463', 35350,
                        '#ff8363', 85000,
                        '#ff6263', 164500,
                        '#ff4062', 305500,
                        '#ff1f62'
                    ],
                    '#cccccc'
                ],
                'circle-radius': 3
            }
        });

    });
    
    // Event listener for dropdown menu changes
    document.getElementById('bond-select').addEventListener('change', function() {
        const selectedOption = this.value;
        if (selectedOption !== 'option4') {
            if (map.getLayer('caseOutcome')) {
              map.removeLayer('caseOutcome');
            }
            if (map.getSource('caseOutcome')) {
              map.removeSource('caseOutcome');
            }
            if (map.getLayer('lien_overall')) {
                map.setLayoutProperty('lien_overall', 'visible');
            }
        }
        updateMapLayer(selectedOption);
        document.querySelectorAll('input[name="case-outcome-checkbox"]').forEach(cb => {
        cb.addEventListener('change', updateOutcomeLayer);
    });
    });
    
    
    let hoveredFeatureId = null;

    
    // lien_overall 레이어 추가
    map.addLayer({
        'id': 'lien_overall',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_overall/lien_overall.geojson'
        },
        'paint': {
            'circle-color': [
                'case',
                ['==', ['typeof', ['get', 'Amount']], 'number'],
                ['step', ['get', 'Amount'], '#ffffff', 0, '#ffa463', 35350, '#ff8363', 85000, '#ff6263', 164500, '#ff4062', 305500, '#ff1f62'],
                '#cccccc'
            ],
            'circle-radius': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                10.5, // Hover radius
                3 // Default radius
            ],
            'circle-opacity': 0.8
        }
    });


    // 确保道路和水体图层在自定义图层之上
        map.moveLayer('water');
        map.moveLayer('road-simple');
        map.moveLayer('lien_overall');
        // For each year in the list, move the year lien layer
        yearsList.forEach(function(year) {
            let layerName = 'lien_' + year;
            map.moveLayer(layerName);
        });
        map.moveLayer('poi-label');
        map.moveLayer('waterway-label');
        map.moveLayer('airport-label');
        map.moveLayer('road-label-simple');

        const style = map.getStyle();
    // 根据选项值获取对应的属性名称


        // 마우스 엔터 이벤트 핸들링
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

    // 마우스 리브 이벤트 핸들링
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
            // 确保至少选中了一个feature
            if (e.features.length > 0) {
                var feature = e.features[0];
                
                // 从feature中读取amount和duration属性
                var amount = feature.properties['Amount']|| ''; 
                var signdate = feature.properties['Signed Date']|| ''; 
                var releasedate = feature.properties['Released Date']|| ''; 
                var foreclosedate = feature.properties['Foreclosed Date']|| ''; 
                var duration = feature.properties['Lien Duration']|| ''; 
                var bondcompany = feature.properties['Bonding Company']|| ''; 
                
                // 创建Popup实例并设置内容
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
        
            
            
            // 应用过滤条件到每个年份图层
            const years = Array.from({length: 21}, (_, i) => i + 2000); // 从2000到2020年
            years.forEach(year => {
                const layerId = `lien_${year}`;
                try {
                    map.setFilter(layerId, yearsFilters.length > 0 ? yearsFilters : null);
                } catch (error) {
                    console.error(`Error applying filter to layer ${layerId}:`, error);
                }
            });
        }
        
        // 为每个复选框添加事件监听器
        document.getElementById('liensigned').addEventListener('change', filterLayer);
        document.getElementById('lienreleased').addEventListener('change', filterLayer);
        document.getElementById('lienforeclosed').addEventListener('change', filterLayer);
        document.getElementById('lienpending').addEventListener('change', filterLayer);
        
        // 初始时调用filterLayer函数以应用初始过滤条件
        filterLayer();
        

////
function updateYearCheckboxes(selectedYear) {
    document.querySelectorAll('.year-checkbox').forEach(checkbox => {
        checkbox.checked = false; // 先取消选择所有复选框
    });
    
    if (selectedYear) {
        document.getElementById('year-' + selectedYear).checked = true; // 选中特定年份
    } else {
        document.getElementById('year-all').checked = true; // 确保"All"始终选中
    }
    const bondSelect = document.getElementById("bond-select");
    if (bondSelect && bondSelect.value === "option4") {
        updateOutcomeLayer(); // This will call showCaseOutcomeMap internally
    }
    updateLayerVisibility(selectedYear);
}

// 根据选中的年份设置地图图层的可见性 Set the visibility of the map layers based on the selected year
function updateLayerVisibility(selectedYear) {
    if (!selectedYear || selectedYear === 'all') {
        // 如果选中了'All'，显示'lien_overall'图层，隐藏其他所有年份图层
        map.setLayoutProperty('lien_overall', 'visibility', 'visible');
        yearsList.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', 'none');
            }
        });
    } else {
        // 否则，显示选中年份的图层，隐藏'lien_overall'以及其他所有年份图层
        yearsList.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', year === selectedYear ? 'visible' : 'none');
            }
        });
        map.setLayoutProperty('lien_overall', 'visibility', 'none');
    }
}
  
// 为所有年份的checkbox添加事件监听器
document.querySelectorAll('.year-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
        // 当选中某一年时取消'All'的选中状态，并更新图层可见性
        const selectedId = e.target.id.replace('year-', '');
        updateYearCheckboxes(selectedId === 'all' ? null : selectedId);
    });
});

// 初始化为显示'All'
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

    // 更新图层的'fill-color'属性
    if (propertyName) {
        map.setPaintProperty('race_2020', 'fill-color', [
            'case',
            ['==', ['get', propertyName], null], 'transparent',
            ['step', ['get', propertyName],
                '#ffffff',
                0, '#011356',
                20, '#01417F',
                40, '#016EA8',
                60, '#009CD0',
                80, '#00CAF9'
            ]
        ]);
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

// 设置X轴比例尺
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    .domain(data.map(function(d) { return d.company; }));

// 设置Y轴比例尺
var y = d3.scaleLinear().range([height, 0])
    .domain([0, d3.max(data, function(d) { return d.count; })]);

// 添加X轴
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

// 添加Y轴
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
    if (e.target.value === 'option3') {
        map.setPaintProperty('lien_overall', 'circle-color', [
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
        
        map.setPaintProperty('lien_overall', 'circle-color', [
            'case',
            ['==', ['typeof', ['get', 'Amount']], 'number'], // Check if the Amount field exists and is a number
            ['step', 
                ['get', 'Amount'],
                '#ffffff', 0,      // first step value
                '#ffa463', 35350,  // second step value
                '#ff8363', 85000,
                '#ff6263', 164500,
                '#ff4062', 305500,
                '#ff1f62'          // Last step value
            ],
            '#cccccc' // Default color, used when Amount does not exist or is not a number
        ]);
        durationLegend.style.display = 'none'; // Disable the duration legend
        d3.select('.company-barchart svg').remove(); // Remove any existing bar chart
        incomeLegend.style.display = ''; // Enable the income legend
       

    } else if (e.target.value === 'option2') { // Add a new option for Lien Duration
        
        map.setPaintProperty('lien_overall', 'circle-color', [
            'case',
            ['==', ['typeof', ['get', 'Lien Duration']], 'number'], // Check if the Lien Duration field exists and is a number
            ['step', 
                ['get', 'Lien Duration'],
                '#ffffff', 0,        // Division 1: 0 to 1824
                '#ffa463', 1825,     // Division 2: 1825 to 3649
                '#ff8363', 3650,     // Division 3: 3650 to 5474
                '#ff6263', 5475,     // Division 4: 5475 to 7299
                '#ff4062', 7300,     // Division 5: 7300 to 9124
                '#ff1f62'            // Default color if above 9124 or no data
            ],
            '#cccccc' // Default color if Lien Duration is not a number
        ]);
        d3.select('.company-barchart svg').remove(); // Remove any existing bar chart
        incomeLegend.style.display = 'none'; // Hide the income legend
        durationLegend.style.display = ''; // Enable the duration legend
    }
});
d3.select('.company-barchart svg').remove(); // Ensure the chart is cleared initially


// 假设的数据和颜色
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



// SVG的尺寸和边距
const margin = { top: 20, right: 20, bottom: 30, left: 32},
        width = 262 - margin.left - margin.right,
        height = 262 - margin.top - margin.bottom;

// 创建SVG元素
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

// 设置每个色块的大小
const blockSize = Math.min(width, height) / 6;

// 绘制色块图
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

// 创建左侧和底部的百分比标签
const yAxisValues = d3.range(60, -1, -12);
const xAxisValues = d3.range(0, 101, 20);

// 添加Y轴百分比标签
yAxisValues.forEach((value, i) => {
    svg.append('text')
       .attr('x', margin.left-36) // 标签在左侧的位置
       .attr('y', i * blockSize + blockSize / 2) // 标签在每个方块中间的Y位置
       .style('fill', 'white') // 文本颜色
       .style('font-size', '11px')
       .style('alignment-baseline', 'middle') // 文本垂直居中
       .style('text-anchor', 'end') // 文本靠右对齐
       .text(`${value}%`); // 添加文本
});

// 添加X轴百分比标签
xAxisValues.forEach((value, i) => {
    svg.append('text')
       .attr('x', i * blockSize + blockSize / 2) // 标签在每个方块中间的X位置
       .attr('y', height + margin.bottom / 2) // 标签在底部的位置
       .style('fill', 'white') 
       .style('font-size', '11px')// 文本颜色
       .style('text-anchor', 'middle') // 文本水平居中
       .text(`${value}%`); // 添加文本
});

const yAxisValues2 = d3.range(60, -1, -12);
const xAxisLabels2 = ['0', '160k', '320k', '480k', '640k', '800k'];

// 添加Y轴百分比标签
yAxisValues2.forEach((value, i) => {
    svg2.append('text')
       .attr('x', margin.left-36) // 标签在左侧的位置
       .attr('y', i * blockSize + blockSize / 2) // 标签在每个方块中间的Y位置
       .style('fill', 'white') // 文本颜色
       .style('font-size', '11px')
       .style('alignment-baseline', 'middle') // 文本垂直居中
       .style('text-anchor', 'end') // 文本靠右对齐
       .text(`${value}%`); // 添加文本
});

// 添加X轴百分比标签
xAxisLabels2.forEach((label, i) => {
    svg2.append('text')
       .attr('x', i * blockSize + blockSize / 2) // 标签在每个方块中间的X位置
       .attr('y', height + margin.bottom / 2) // 标签在底部的位置
       .style('fill', 'white') 
       .style('font-size', '11px')// 文本颜色
       .style('text-anchor', 'middle') // 文本水平居中
       .text(label); // 添加文本
});

const yAxisValues3 = d3.range(0, 101, 20);
const xAxisValues3 = ['0', '160k', '320k', '480k', '640k', '800k'];

// 添加Y轴百分比标签
yAxisValues3.forEach((value, i) => {
    svg3.append('text')
       .attr('x', margin.left - 36) // 레이블의 X 위치
       .attr('y', height - i * blockSize - blockSize / 2) // Y축의 레이블 위치 조정
       .style('fill', 'white') // 텍스트 색상
       .style('font-size', '11px') // 텍스트 크기
       .style('alignment-baseline', 'middle') // 텍스트 수직 중앙 정렬
       .style('text-anchor', 'end') // 텍스트 오른쪽 정렬
       .text(value.toString() + '%'); // 텍스트 내용
});

// 添加X轴百分比标签
xAxisValues3.forEach((label, i) => {
    svg3.append('text')
       .attr('x', i * blockSize + blockSize / 2) // 标签在每个方块中间的X位置
       .attr('y', height + margin.bottom / 2) // 标签在底部的位置
       .style('fill', 'white') 
       .style('font-size', '11px')// 文本颜色
       .style('text-anchor', 'middle') // 文本水平居中
       .text(label); // 添加文本
});


function checkSelection() {
    // 获取每个复选框的状态
    const raceChecked = document.getElementById('race2020').checked;
    const povertyChecked = document.getElementById('poverty2020').checked;
    const housingChecked = document.getElementById('housing2020').checked;
  
    // 设置地图图层可见性
    map.setLayoutProperty('race_2020', 'visibility', raceChecked ? 'visible' : 'none');
    map.setLayoutProperty('poverty_2020', 'visibility', povertyChecked ? 'visible' : 'none');
    map.setLayoutProperty('housing_2020', 'visibility', housingChecked ? 'visible' : 'none');
  
    // 检查选中了多少个复选框
    const checkedBoxes = [raceChecked, povertyChecked, housingChecked].filter(isChecked => isChecked).length;
  
    // 最多只能选择两个，如果超过两个，取消当前复选框的选择
    if (checkedBoxes > 2) {
    this.checked = false; // 取消当前复选框的选择
    return;
    }

    // 显示或隐藏matrix元素
    const matrixElement = document.getElementById('matrix');
    if (raceChecked && povertyChecked) {
      // 如果race和poverty都被选中，则显示matrix元素
    matrixElement.style.display = 'block';
    map.setLayoutProperty('race+poverty', 'visibility', 'visible');
    } else {
    // 否则隐藏matrix元素
    matrixElement.style.display = 'none';
    map.setLayoutProperty('race+poverty', 'visibility', 'none');
    }

     // 显示或隐藏matrix元素
     const matrixElement2 = document.getElementById('matrix2');
     if (housingChecked && povertyChecked) {
       // 如果race和poverty都被选中，则显示matrix元素
     matrixElement2.style.display = 'block';
     map.setLayoutProperty('poverty+property', 'visibility', 'visible'); 
     } else {
     // 否则隐藏matrix元素
     matrixElement2.style.display = 'none';
     map.setLayoutProperty('poverty+property', 'visibility', 'none');
     }
 
     // 显示或隐藏matrix元素
     const matrixElement3 = document.getElementById('matrix3');
     if (housingChecked && raceChecked) {
       // 如果race和poverty都被选中，则显示matrix元素
     matrixElement3.style.display = 'block';
     map.setLayoutProperty('race+property', 'visibility', 'visible'); 
     } else {
     // 否则隐藏matrix元素
     matrixElement3.style.display = 'none';
     map.setLayoutProperty('race+property', 'visibility', 'none');
     }
}

// 为复选框添加事件监听器
document.getElementById('race2020').addEventListener('change', checkSelection);
document.getElementById('poverty2020').addEventListener('change', checkSelection);
document.getElementById('housing2020').addEventListener('change', checkSelection);

// 初始化状态
    document.getElementById('matrix').style.display = 'none'; // 默认隐藏matrix元素
    document.getElementById('race2020').checked = true;  
    document.getElementById('poverty2020').checked = false;
    document.getElementById('housing2020').checked = false;
    document.getElementById('matrix2').style.display = 'none'; 
    document.getElementById('matrix3').style.display = 'none'; 
    document.getElementById('race-select').value = 'option6';


// --- Case Outcome Layer for Map Dots ---
let caseOutcomeLayer;

// Normalize case disposition values to consistent categories
function normalizeDisposition(raw) {
    if (!raw) return "other";
    const text = raw.toLowerCase();
    if (text.includes("jury conviction")) return "jury_conviction";
    if (text.includes("guilty plea") || text.includes("no contest")) return "guilty_plea";
    if (text.includes("dismiss")) return "dismissed";
    if (text.includes("deferred") || text.includes("cond. discharge")) return "pending";
    return "other";
}

// Color code dots by outcome
function getOutcomeColor(disposition) {
    const outcome = normalizeDisposition(disposition);
    switch (outcome) {
        case 'guilty_plea': return "#2ca02c";
        case 'jury_conviction': return "#1f77b4";
        case 'dismissed': return "#ff7f0e";
        case 'pending': return "#d62728";
        default: return "#999";
    }
}

// Get selected checkboxes for filtering
function getSelectedOutcomes() {
    return Array.from(document.querySelectorAll('input[name="case-outcome-checkbox"]:checked'))
        .map(cb => cb.value);
}

// Show filtered dots on the map for selected outcomes
function showCaseOutcomeMap(data) {
    console.log("Drawing map dots");
    console.log("Number of features:", data.features?.length);
    console.log("Selected outcomes:", getSelectedOutcomes());

    const selectedOutcomes = getSelectedOutcomes();
    //const selectedOutcomes = ['guilty_plea', 'jury_conviction', 'dismissed'];

    // Normalize and filter the data
    const filtered = {
          type: "FeatureCollection",
          features: data.features.filter(f => {
            const coords = f.geometry?.coordinates;
            const rawDisposition = f.properties["Disposition (from Criminal Dockets)"];
            const normalizedDisposition = normalizeDisposition(rawDisposition);
            const rawAmount = f.properties.Amount;
            const amount = Number(String(rawAmount).replace(/[^0-9.-]+/g, ""));
        
            // Add amount bin to feature
            let amountBin = null;
            if (amount < 35000) amountBin = 'low';
            else if (amount < 85000) amountBin = 'medium';
            else amountBin = 'high';
        
            if (coords && coords.length === 2 && normalizedDisposition && getSelectedOutcomes().includes(normalizedDisposition)) {
              f.properties.amountBin = amountBin;  //  add this line
              return true;
            }
            return false;
          })
    };

    // If layer already exists, update the source
    if (map.getSource('caseOutcome')) {
        map.getSource('caseOutcome').setData(filtered);
        return;
    }

    // Otherwise, add the source and layer
    map.addSource('caseOutcome', {
        type: 'geojson',
        data: filtered
    });

    map.addLayer({
      id: 'caseOutcome',
      type: 'circle',
      source: 'caseOutcome',
      paint: {
        'circle-radius': 3,
        'circle-color': [
          'match',
          ['get', 'amountBin'],
          'low', '#66c2a5',
          'medium', '#fc8d62',
          'high', '#8da0cb',
          '#cccccc' // fallback
        ],
        'circle-opacity': 0.85,
        //'circle-stroke-width': 1,
        //'circle-stroke-color': '#000000'
      }
});

}


// Called when checkboxes or dropdown change
function updateOutcomeLayer() {
    let dataPath = 'data/lien_overall/lien_overall_with_disposition.geojson';
    const selectedYear = document.querySelector('.year-checkbox:checked')?.value;
    if (selectedYear !== 'all') {
        dataPath = 'data/lien_byyear/lien_${selectedYear}_with_disposition.geojson';
    }
    
    if (map.getLayer('caseOutcome')) {
        map.removeLayer('caseOutcome');
    }
    if (map.getSource('caseOutcome')) {
        map.removeSource('caseOutcome');
    }
    if (map.getLayer('lien_overall')) {
        map.setLayoutProperty('lien_overall', 'visibility', 'none');
    }
    d3.json(dataPath).then(data => {
        showCaseOutcomeMap(data);
    });
}

