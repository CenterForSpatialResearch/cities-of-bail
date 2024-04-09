mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongqianli/cluh62aew033f01qqcszb71kp',
    zoom: 11,
    center: [-106.6945, 35.0533],
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
    
    // 确保道路和水体图层在自定义图层之上
        map.moveLayer('water');
        map.moveLayer('road-simple');
        map.moveLayer('lien_overall');
        map.moveLayer('poi-label');
        map.moveLayer('road-label-simple');

        const style = map.getStyle();
        console.log(style);


    // 图层可见性
        map.setLayoutProperty('race_2020', 'visibility', 'visible');
        map.setLayoutProperty('poverty_2020', 'visibility', 'none');
        map.setLayoutProperty('housing_2020', 'visibility', 'none');

        document.getElementById('race2020').checked = true; 
        document.getElementById('poverty2020').checked = false; 
        document.getElementById('housing2020').checked = false; 

        // 为复选框添加事件监听器来改变图层的可见性
        document.getElementById('race2020').addEventListener('change', function(e) {
        map.setLayoutProperty('race_2020', 'visibility', e.target.checked ? 'visible' : 'none');
        });

        document.getElementById('poverty2020').addEventListener('change', function(e) {
        map.setLayoutProperty('poverty_2020', 'visibility', e.target.checked ? 'visible' : 'none');
        });

        document.getElementById('housing2020').addEventListener('change', function(e) {
        map.setLayoutProperty('housing_2020', 'visibility', e.target.checked ? 'visible' : 'none');
        });


    // 根据选项值获取对应的属性名称
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
                        0, '#2d653b',
                        20, '#55895d',
                        40, '#7dad7e',
                        60, '#a5d1a0',
                        80, '#cdf5c1'
                    ]
                ]);
            }
        });


        map.on('click', 'lien_overall', function(e) {
            // 确保至少选中了一个feature
            if (e.features.length > 0) {
                var feature = e.features[0];
                
                // 从feature中读取amount和duration属性
                var amount = feature.properties['Amount']; 
                var signdate = feature.properties['Signing Date']; 
                var releasedate = feature.properties['Date Release Signed']; 
                var foreclosedate = feature.properties['Foreclosure Date']; 
                var duration = feature.properties['Lien duration by Year']; 
                var bondcompany = feature.properties['Bonding Company']; 
                
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
    .style("stroke", "white")
    .style("font-size", "12px"); 

svg.selectAll(".domain, .tick line")
    .style("stroke", "white"); 

var colorScale = d3.scaleOrdinal()
    .domain(data.map(function(d) { return d.company; }))
    .range(['#DDEC35', '#F48A28', '#80BB47', '#FEBA2A', '#0B8A7C', '#FE8F24', '#C48841', '#FF7733', '#FE512C', '#10B3CC', '#949494']);

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
            ['get', 'Bonding Company'],
            'AAA Bail Bonds', '#DDEC35',
            'Pacheco Bonding', '#F48A28',
            'A Bail Bond Co.', '#80BB47',
            'ASAP Bail Bond', '#FEBA2A',
            'Aardvark Bail Bond', '#0B8A7C',
            'Affordable Bail Bonds', '#FE8F24',
            'Martinez Bail Bonds', '#C48841',
            'Help Bail Bonds', '#FF7733',
            'ABC Bail Bonds', '#FE512C',
            'Gonzales Bail Bonds', '#10B3CC',
            '#949494' 
        ]);
        incomeLegend.style.display = 'none';

        d3.select('.company-barchart svg').remove();
        drawBarChart(data);
    } else if (e.target.value === 'option1') {
        
        map.setPaintProperty('lien_overall', 'circle-color', [
            'step',
            ['get', 'Amount'],
            '#ffffff', 0,
            '#ffa463', 35350,
            '#ff8363', 85000,
            '#ff6263', 164500,
            '#ff4062', 305500,
            '#ff1f62'
        ]);
        d3.select('.company-barchart svg').remove();
        incomeLegend.style.display = ''; 
    }
});

d3.select('.company-barchart svg').remove();



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
