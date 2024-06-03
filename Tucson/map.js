mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongqianli/cluh62aew033f01qqcszb71kp',
    zoom: 11,
    minZoom: 10.5, 
    maxZoom: 11.5,
    center: [-110.9742, 32.2540],
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
                ['==', ['get', 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: White alone'], null], 'transparent',
                ['step', ['get', 'ACSDT5Y2020.B03002-Data-Reformatted_Percentage: White alone'],
                    '#ffffff',
                    0, '#003A04',
                    20, '#006B1D',
                    40, '#009D36',
                    60, '#00CE4E',
                    80, '#00FF67'
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
                ['==', ['get', 'ACSDT5Y2020.B25077-Data-Reformatted_Estimate!!Median value (dollars)'], null], 'transparent',
                ['step', ['get', 'ACSDT5Y2020.B25077-Data-Reformatted_Estimate!!Median value (dollars)'],
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
                ['get', 'R_B-P'],
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
            'circle-color': [
                'case',
                ['==', ['typeof', ['get', 'Amount']], 'number'], // 检查Amount是否为数字类型
                ['step', ['get', 'Amount'], // 如果是数字，根据Amount的值决定颜色
                    '#ffffff', 0,
                    '#ffa463', 35350,
                    '#ff8363', 85000,
                    '#ff6263', 164500,
                    '#ff4062', 305500,
                    '#ff1f62'
                ],
                '#cccccc' // 如果Amount不是数字类型（例如undefined或null），使用灰色（或您希望的任何“没有数据”的颜色）
            ],
            'circle-radius': 3, 
        }
    });

    map.addLayer({
        'id': 'lien_2000',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2000_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2000', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2001',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2001_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2001', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2002',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2002_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2002', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2003',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2003_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2003', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2004',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2004_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2004', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2005',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2005_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2005', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2006',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2006_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2006', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2007',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2007_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2007', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2008',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2008_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2008', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2009',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2009_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2009', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2010',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2010_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2010', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2011',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2011_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2011', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2012',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2012_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2012', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2013',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2013_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2013', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2014',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2014_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2014', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2015',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2015_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2015', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2016',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2016_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2016', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2017',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2017_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2017', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2018',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2018_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2018', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2019',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2019_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2019', 'visibility', 'none');
    map.addLayer({
        'id': 'lien_2020',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/lien_byyear/2020_accumulate.geojson'
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
            'circle-radius': 3, 
        }
    });
    map.setLayoutProperty('lien_2020', 'visibility', 'none');



    // 确保道路和水体图层在自定义图层之上
        map.moveLayer('water');
        map.moveLayer('road-simple');
        map.moveLayer('lien_overall');
        map.moveLayer('lien_2000');
        map.moveLayer('lien_2001');
        map.moveLayer('lien_2002');
        map.moveLayer('lien_2003');
        map.moveLayer('lien_2004');
        map.moveLayer('lien_2005');
        map.moveLayer('lien_2006');
        map.moveLayer('lien_2007');
        map.moveLayer('lien_2008');
        map.moveLayer('lien_2009');
        map.moveLayer('lien_2010');
        map.moveLayer('lien_2011');
        map.moveLayer('lien_2012');
        map.moveLayer('lien_2013');
        map.moveLayer('lien_2014');
        map.moveLayer('lien_2015');
        map.moveLayer('lien_2016');
        map.moveLayer('lien_2017');
        map.moveLayer('lien_2018');
        map.moveLayer('lien_2019');
        map.moveLayer('lien_2020');
        map.moveLayer('poi-label');
        map.moveLayer('waterway-label');
        map.moveLayer('airport-label');
        map.moveLayer('natural-point-label');
        map.moveLayer('road-label-simple');

        const style = map.getStyle();
        console.log(style);
    // 根据选项值获取对应的属性名称



        map.on('click', 'lien_overall', function(e) {
            // 确保至少选中了一个feature
            if (e.features.length > 0) {
                var feature = e.features[0];
                
                // 从feature中读取amount和duration属性
                var amount = feature.properties['Amount']|| ''; 
                var signdate = feature.properties['Date Signed']|| ''; 
                var releasedate = feature.properties['Date Release Signed']|| ''; 
                var foreclosedate = feature.properties['Foreclosure Date']|| ''; 
                var duration = feature.properties['Lien duration by Year']|| ''; 
                var bondcompany = feature.properties['Bail Bond Company']|| ''; 
                
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

        // function filterLayer() {
        //     // 针对 lien_overall 层的过滤条件
        //     const overallFilters = ['any'];
        //     const signed = document.getElementById('liensigned').checked;
        //     const released = document.getElementById('lienreleased').checked;
        //     const foreclosed = document.getElementById('lienforeclosed').checked;
        //     const pending = document.getElementById('lienpending').checked;
        
        //     if (signed) overallFilters.push(['==', ['get', 'Status_overall'], 'Signed']);
        //     if (released) overallFilters.push(['==', ['get', 'Status_overall'], 'Released']);
        //     if (foreclosed) {
        //         overallFilters.push(['==', ['get', 'Status_overall'], 'Forclosed']);
        //         overallFilters.push(['==', ['get', 'Status_overall'], 'Release (before foreclose)']);
        //     }
        //     if (pending) overallFilters.push(['==', ['get', 'Status_overall'], 'Pending']);
        
        //     // 应用过滤条件到 lien_overall 图层
        //     map.setFilter('lien_overall', overallFilters.length > 1 ? overallFilters : null);
        
        //     // 针对每个年份层的过滤条件
        //     const yearsFilters = ['any'];
        //     if (signed) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Signed That Year']);
        //     if (released) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Released That Year']);
        //     if (foreclosed) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Foreclosed That Year']);
        //     if (pending) yearsFilters.push(['==', ['get', 'Status Per Year'], 'Pending']);
        
        //     // 应用过滤条件到每个年份图层
        //     const years = Array.from({length: 21}, (_, i) => i + 2000); // 从2000到2020年
        //     years.forEach(year => {
        //         const layerId = `lien_${year}`;
        //         try {
        //             map.setFilter(layerId, yearsFilters.length > 1 ? yearsFilters : null);
        //         } catch (error) {
        //             console.error(`Error applying filter to layer ${layerId}:`, error);
        //         }
        //     });
        // }
        
        // // 为每个复选框添加事件监听器
        // document.getElementById('liensigned').addEventListener('change', filterLayer);
        // document.getElementById('lienreleased').addEventListener('change', filterLayer);
        // document.getElementById('lienforeclosed').addEventListener('change', filterLayer);
        // document.getElementById('lienpending').addEventListener('change', filterLayer);
        
        // // 初始时调用filterLayer函数以应用初始过滤条件
        // filterLayer();
        

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

    updateLayerVisibility(selectedYear);
}
  
// 根据选中的年份设置地图图层的可见性
function updateLayerVisibility(selectedYear) {
    const years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];
    
    if (!selectedYear || selectedYear === 'all') {
        // 如果选中了'All'，显示'lien_overall'图层，隐藏其他所有年份图层
        map.setLayoutProperty('lien_overall', 'visibility', 'visible');
        years.forEach(year => {
            if (map.getLayer('lien_' + year)) {
                map.setLayoutProperty('lien_' + year, 'visibility', 'none');
            }
        });
    } else {
        // 否则，显示选中年份的图层，隐藏'lien_overall'以及其他所有年份图层
        years.forEach(year => {
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
                0, '#003A04',
                20, '#006B1D',
                40, '#009D36',
                60, '#00CE4E',
                80, '#00FF67'
            ]
        ]);
    }
});


var data = [
    { company: "Azteca Bail Bonds LLC", count: 225 },
    { company: "Quick Bail, Inc.", count: 205 },
    { company: "Arizona Quest Bail Bonds", count: 125 },
    { company: "Financial Casualty & Surety", count: 115 },
    { company: "Allegheny Casualty Company", count: 37 },
    { company: "American Surety Company ", count: 33 },
    { company: "Lexington National", count: 26 },
    { company: "Didn't Do It Bail Bonds/Premier Bail Bonds Inc.", count: 4 },
    { company: "Action Bail Bonds", count: 1 },
    { company: "Silverlake Bail Bonds", count: 1 },
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
    if (e.target.value ===  'option3') {
        map.setPaintProperty('lien_overall', 'circle-color', [
            'match',
            ['get', 'Bail Bond Company'],
            'Azteca Bail Bonds LLC', '#fcf467',
            'Quick Bail, Inc.', '#d8c4fb',
            'Arizona Quest Bail Bonds', '#ea8972',
            'Financial Casualty & Surety', '#5fcad2',
            'Allegheny Casualty Company', '#4ca48a',
            'American Surety Company', '#FF7733',
            'Lexington National', '#f2c947',
            "Didn't Do It Bail Bonds/Premier Bail Bonds Inc.", '#F48A28',
            'Action Bail Bonds', '#80BB47',
            'Silverlake Bail Bonds', '#FEBA2A',
            '#949494' 
        ]);
        incomeLegend.style.display = 'none';

        d3.select('.company-barchart svg').remove();
        drawBarChart(data);
    } else if (e.target.value === 'option1') {
        
        map.setPaintProperty('lien_overall', 'circle-color', [
            'case',
            ['==', ['typeof', ['get', 'Amount']], 'number'], // 检查Amount字段是否存在且为数字
            ['step', 
                ['get', 'Amount'],
                '#ffffff', 0,      // 第一个阶梯值
                '#ffa463', 35350,  // 第二个阶梯值
                '#ff8363', 85000,  // 以此类推...
                '#ff6263', 164500,
                '#ff4062', 305500,
                '#ff1f62'          // 最后一个阶梯值
            ],
            '#cccccc' // 默认颜色，用于Amount不存在或不为数字的情况
        ]);
        d3.select('.company-barchart svg').remove();
        incomeLegend.style.display = ''; 
    }
});
d3.select('.company-barchart svg').remove();

// 假设的数据和颜色
const matrixData = [
    ["#F800FF", "#F52AFF", "#F254FF", "#F07EFF", "#EDA8FF", "#EAD2FF"],
    ["#C500D1", "#C42DCD", "#C259D2", "#C084D7", "#BEB0DC", "#BBDBE1"],
    ["#9300A3", "#93309B", "#915DA5", "#908AAF", "#8EB7B8", "#8CE4C2"],
    ["#610075", "#623468", "#616277", "#609186", "#5FBF95", "#5EEDA4"],
    ["#2E0047", "#313736", "#30664A", "#30975E", "#2FC671", "#2FF685"],
    ["#000000", "#003A04", "#006B1D", "#009D36", "#00CE4E", "#00FF67"],
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

// 创建左侧和底部的百分比标签
const yAxisValues = d3.range(60, -1, -12);
const xAxisValues = d3.range(0, 101, 20);

// 添加Y轴百分比标签
yAxisValues.forEach((value, i) => {
    svg.append('text')
       .attr('x', margin.left-36) // 标签在左侧的位置
       .attr('y', i * blockSize + blockSize / 2) // 标签在每个方块中间的Y位置
       .style('fill', 'white') // 文本颜色
       .style('font-size', '14px')
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
       .style('font-size', '14px')// 文本颜色
       .style('text-anchor', 'middle') // 文本水平居中
       .text(`${value}%`); // 添加文本
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