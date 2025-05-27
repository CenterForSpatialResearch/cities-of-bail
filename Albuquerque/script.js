document.getElementById('race2020').addEventListener('change', function(e) { 
    map.setLayoutProperty('race_2020', 'visibility', e.target.checked ? 'visible' : 'none'); 
}); 
 
document.getElementById('poverty2020').addEventListener('change', function(e) { 
    map.setLayoutProperty('poverty_2020', 'visibility', e.target.checked ? 'visible' : 'none'); 
}); 
 
document.getElementById('housing2020').addEventListener('change', function(e) { 
    map.setLayoutProperty('housing_2020', 'visibility', e.target.checked ? 'visible' : 'none'); 
}); 
 
document.getElementById('stories-link').addEventListener('click', function(event) { 
    event.preventDefault(); 
    const popup = document.getElementById('popup'); 
    popup.classList.remove('hidden'); 
    popup.classList.add('visible'); 
}); 
 
document.getElementById('close-btn').addEventListener('click', function() { 
    const popup = document.getElementById('popup'); 
    popup.classList.remove('visible'); 
    popup.classList.add('hidden'); 
}); 
 
const stories = { 
    intro: { 
        title: "Overview", 
        heading: "", 
        description: "From 2000 to 2020, over 850 liens were recorded in Albuquerque, a city of around 250,000 households. Bond underwriting fell off sharply in 2015 after New Mexico enacted far-reaching bail reform.", 
        content: [ 
            "Albuquerque is the most populous city in Bernalillo County, the most populous county in New Mexico. From 2000 to 2020, the county averaged a population of 632,000, spanning 258,000 households. Population moderately increased over the period.", 
            "From 2000 to 2020, over 850 liens were recorded on real property in Albuquerque to secure a bail bond, the highest per capita rate of bail liens in the project study (3.3 liens per 1000 households). Overall the liens secured $37.8 million in bail bond principals, premiums, and fees. The median bond was $25,000, the average bond was $45,000. The largest bond on record was $1 million, the smallest $500.", 
            "Albuquerque is bisected north and south by Interstate-25 and east and west by Interstate-40, neatly dividing the city into four roughly equal quadrants. Overall, the southwest quadrant has lower property values and higher rates of poverty, with high rates of ethnic diversity; the northwest is generally the more affluent and racially homogenous quadrant.", 
            "By far the highest number of bail mortgages are found in the southwest quadrant of Albuquerque. Indeed, this quarter of the city accounts for nearly half the liens—429. Lien concentration correlates strongly race (the more Hispanic/Latino the neighborhood, the more liens), but not so strongly with poverty. This fact highlights a curious feature of high-dollar bail bonds: while they tend to disproportionately burden racial minorities at similar rates as mass incarceration generally, the access to wealth and property needed to enter the market in the first place tends to burden the most well-off in an underprivileged community. Still the average bail lien in the southwest is the lowest among the four quadrants—$38,236—and more than a few liens are recorded for as little as $500. (n: 429; median: $21,400; mean: $38,236)", 
            "In the more affluent northwest, most of the 151 liens in the study appear in the wealthiest and whitest neighborhoods, including the largest bail bond mortgage on record, for $1 million. While all bond shops hold mortgages across the city, Pacheco Bonding and its subsidiaries hold the bulk of the high-dollar liens in this quadrant. (n: 151; median: $28,800; mean: $57,607)", 
            "The northeast quadrant has a surprisingly even distribution of bonds, which conveniently illustrates the widely variable duration of bail bond liens. Bail secures the appearance of a defendant a pretrial proceedings, which in felony cases can last several years. Beyond that, bondsmen are not always quick to record a release, and homeowners may not know to demand the release until they re-discover the lien years later when the property goes up for sale. Thus whether criminal proceedings are long or short, bail bond mortgages tend to tie up property and capital for at least a year and often as long as half a decade. (n: 86; median: $23,775; mean: $45,924)", 
            "The southeast quadrant, home to both the University of New Mexico and the Sunport, Albuquerque’s international airport, features the most diverse mix of property use. More apartments and commercial areas mean fewer lots to mortgage, while the ethnic makeup of the area can differ significantly from neighborhood to neighborhood. Overall the quadrant offers an interesting microcosm of Albuquerque as a whole. In this area, AAA Bail Bonds holds the greatest number of liens. (n: 140; median: $25,200; mean: $41,915)" 
        ] 
    }, 
    industry: { 
        title: "Market Concentration", 
        heading: "", 
        description: "Albuquerque exhibits a highly concentrated commercial bail industry, with basically two firms underwriting all high-end bail bonds.", 
        content: [ 
            "The largest recorder of bail liens is AAA Bail Bonds, located—as many bail bond shops are—one block behind the courthouses in downtown Albuquerque.", 
            "AAA Bail Bonds recorded 371 liens in the dataset, representing $7.3 million in collateralized debt. AAA’s business is spread around the city without concentration among racial or demographic lines.", 
            "At first it appears that the market for high-end collateralized bonds is Albuquerque is dominated by several large firms, with several others making up a less significant share. But in fact A Bail Bond Co., ASAP Bail Bond, and Aardvark Bail Bond, among others, are subsidiaries of Pacheco Bonding and usually appear on the same liens as Pacheco. Altogether Pacheco securitized $18.7 million in bonds during the period, over twice as much capital as AAA across a slightly smaller number of liens.", 
            "The high-end bail market in Albuquerque is thus highly concentrated. One single firm, Pacheco’s, accounts for 49.5% of the bonded debt, while on other, AAA, accounts for another 19.3%.", 
            "While the more active bond shops maintain storefronts near the courthouses, Pacheco Bonding was headquartered outside Alburquerque in the nearby town of Bernalillo. Pacheco’s subsidiaries, ASAP, A Bonding, Aardvark, and his other dba “A Pacheco” hearken back to the days of print phone books, when bondsmen jockeyed to be the first alphabetical entry in the lists.", 
            "After bail reform began in 2014, Pacheco Bonding began winding down operations. Owner and proprietor Richard Pacheco reported laying off his staff in March 2018, unable to underwrite more than a few bonds every couple months." 
        ] 
    }, 
    neighborhoods: { 
        title: "Reform", 
        heading: "",
        description: "From 2014 to 2018, New Mexico's Supreme Court lead the state in overhauling its cash bail process. The reforms dramatically altered the landscape of the commercial bail industry and its power over property in the state.",
        content: [ 
            "On November 6, 2014, the New Mexico Supreme Court handed down a unanimous opinion in the landmark case of State v. Brown. Reviewing the historical purpose and constitutional law of bail, the Court ruled that money bail amounts should be proven by evidence to be the least restrictive means of returning defendants to court. Though dealing with only a single case, the decision implied that many bail bonds in New Mexico were unconstitutionally excessive.", 
            "Following the ruling, New Mexico did not abolish cash bail, but it significantly reformed its system. Voters approved a constitutional amendment in 2016, and in July 2017 the state supreme court issued new rules to judges. The result was that judges were given discretion to order detention outright, subject to rigorous procedural safeguards, or else to release defendants on the least restrictive conditions such as house arrest, ankle monitoring, or weekly check-ins. While money bail is still a legal condition in New Mexico, judges ordered it much more rarely after the new rules.", 
            "The effect of New Mexico’s reform shows up starkly in the data. Mortgage-backed bonds had been declining in the 2010s, down from the peak years of 151 bonds in 2007 and 132 in 2008. Still, after the 2008 financial crisis, bondsmen were averaging 30 recorded mortgages a year averaging $$ in capital. In 2016 the number of mortgages dropped to six, and none at all were recorded from 2017 to 2020.", 
            "High-dollar bails are rarely ordered in New Mexico now, and mortgages securing bonds tend to appear in only the most extraordinary cases. The only mortgage recorded in 2020, for instance, arose from an unusual case in which charges were filed in Michigan against an Albuquerque priest later convicted of abuse. A $100,000 bond was secured in Albuquerque while the priest arranged his extradition to stand trial in Michigan." 
        ] 
    } 
    // infrastructure story excluded as per the request 
}; 
 
// 변수로 현재 활성화된 스토리 항목과 상세 정보를 관리합니다. 
let activeStoryItem = null; 
let activeStoryDetails = null; 
 
document.querySelectorAll('.story-item').forEach(item => { 
    item.addEventListener('click', function() { 
        const story = stories[item.dataset.story]; 
         
        // 이전에 활성화된 스토리 항목이 있으면 원래 상태로 되돌립니다. 
        if (activeStoryItem) { 
            activeStoryItem.classList.remove('hidden'); 
        }
        if (activeStoryDetails) { 
            activeStoryDetails.remove(); 
        } 
 
        const storyDetailsElement = document.createElement('div'); 
        storyDetailsElement.className = 'story-details'; 
 
        storyDetailsElement.innerHTML = ` 
            <h3 id="story-title" style="color: orange;">${story.title}</h3> 
            <h4 id="story-heading">${story.heading}</h4> 
            <p id="story-description">${story.description}</p> 
            <a id="read-more" href="#" style="color: #868686; text-decoration: none;">READ MORE ></a> 
        `; 
         
        item.after(storyDetailsElement); 
        item.classList.add('hidden'); 
         
        // 현재 활성화된 스토리 항목과 상세 정보를 업데이트합니다. 
        activeStoryItem = item; 
        activeStoryDetails = storyDetailsElement; 
         
        // Read More Event 
        storyDetailsElement.querySelector('#read-more').addEventListener('click', function(event) { 
            event.preventDefault(); 
 
            // 모든 story-item 및 story-details를 숨깁니다. 
            document.querySelectorAll('.story-item, .story-details').forEach(el => el.classList.add('hidden')); 
             
            const fullStoryElement = document.getElementById('full-story'); 
            fullStoryElement.querySelector('#full-story-title').innerText = story.heading; 
 
            // 네비게이션 점들을 동적으로 생성합니다. 
            const navigationDotsElement = document.getElementById('navigation-dots'); 
            navigationDotsElement.innerHTML = ''; // 기존 점들을 초기화합니다.
            
            const contentLength = story.content.length;
            for (let i = 0; i < contentLength; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = i;
                navigationDotsElement.appendChild(dot);
            }
 
            // 첫 번째 내용으로 업데이트합니다. 
            updateStoryContent(story.content, 0); 
             
            fullStoryElement.classList.remove('hidden'); 
        }); 
    }); 
}); 
 
// Back to Stories Event 
document.getElementById('back-to-stories').addEventListener('click', function(event) { 
    event.preventDefault(); 
 
    // 전체 스토리 내용을 숨깁니다. 
    const fullStoryElement = document.getElementById('full-story'); 
    fullStoryElement.classList.add('hidden'); 
     
    // 모든 스토리 항목을 표시합니다. 
    document.querySelectorAll('.story-item').forEach(el => el.classList.remove('hidden')); 
     
    // 모든 story-details 요소를 제거합니다. 
    document.querySelectorAll('.story-details').forEach(el => el.remove()); 
     
    // 현재 활성화된 스토리 항목 및 상세 정보를 초기화합니다. 
    activeStoryItem = null; 
    activeStoryDetails = null; 
}); 
 
function updateStoryContent(contentArray, index) {
    const storyContentElement = document.getElementById('story-content');
    storyContentElement.innerText = contentArray[index];
    
    // 모든 점에서 'active' 클래스 제거
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    // 클릭한 점에 'active' 클래스 추가
    document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
    
    const storyKey = activeStoryItem.dataset.story;
    
    if (storyKey === 'intro') {
        handleIntroStoryDots(index);
    } else if (storyKey === 'industry') {
        handleIndustryStoryDots(index);
    } else if (storyKey === 'neighborhoods') {
        handleNeighborhoodsStoryDots(index);
    }
}

function handleIntroStoryDots(index) {
    const bondSelect = document.getElementById('bond-select'); // 'bond-select' 요소 가져오기
    
    // 기존 점 제거
    if (map.getLayer('point') && map.getSource('point')) {
        map.removeLayer('point');
        map.removeSource('point');
    }

    // intro에 해당되는 dot의 동작 구현
    if (index === 0) {
        console.log("Intro - First dot clicked");
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 10.5
        });

        // 체크박스 모두 비활성화
        const checkboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"], .makeup input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });
    } else if (index === 1) {
        console.log("Intro - Second dot clicked");
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // bond-select를 'Amount'로 설정
        bondSelect.value = 'option1';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 2) {
        console.log("Intro - Third dot clicked");
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'Race' 체크박스 선택 및 드롭다운 설정
        const raceCheckbox = document.getElementById('race2020');
        raceCheckbox.checked = true;
        raceCheckbox.dispatchEvent(new Event('change'));

        const raceSelect = document.getElementById('race-select');
        raceSelect.value = 'option6';
        raceSelect.dispatchEvent(new Event('change'));

        bondSelect.value = 'option1';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 3) {
        console.log("Intro - Fourth dot clicked");
        map.flyTo({
            center: [-106.6945, 35.0433],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'Race' 및 'Poverty' 체크박스 선택 및 드롭다운 설정
        const raceCheckbox = document.getElementById('race2020');
        raceCheckbox.checked = true;
        raceCheckbox.dispatchEvent(new Event('change'));

        const raceSelect = document.getElementById('race-select');
        raceSelect.value = 'option6';
        raceSelect.dispatchEvent(new Event('change'));

        const povertyCheckbox = document.getElementById('poverty2020');
        povertyCheckbox.checked = true;
        povertyCheckbox.dispatchEvent(new Event('change'));

        bondSelect.value = 'option1';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 4) {
        console.log("Intro - Fifth dot clicked");
        map.flyTo({
            center: [-106.6945, 35.1233],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'Race', 'Poverty' 체크박스 및 'bond-select'을 올바르게 설정
        const raceCheckbox = document.getElementById('race2020');
        raceCheckbox.checked = true;
        raceCheckbox.dispatchEvent(new Event('change'));

        const raceSelect = document.getElementById('race-select');
        raceSelect.value = 'option6';
        raceSelect.dispatchEvent(new Event('change'));

        const povertyCheckbox = document.getElementById('poverty2020');
        povertyCheckbox.checked = true;
        povertyCheckbox.dispatchEvent(new Event('change'));

        bondSelect.value = 'option3';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 5) {
        console.log("Intro - Sixth dot clicked");
        map.flyTo({
            center: [-106.6945, 35.1233],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'Race', 'Poverty' 체크박스 및 'bond-select' 올바른 설정
        const raceCheckbox = document.getElementById('race2020');
        raceCheckbox.checked = true;
        raceCheckbox.dispatchEvent(new Event('change'));

        const raceSelect = document.getElementById('race-select');
        raceSelect.value = 'option6';
        raceSelect.dispatchEvent(new Event('change'));

        const povertyCheckbox = document.getElementById('poverty2020');
        povertyCheckbox.checked = true;
        povertyCheckbox.dispatchEvent(new Event('change'));

        bondSelect.value = 'option2';
        bondSelect.dispatchEvent(new Event('change'));
    }else if (index === 6) {
        console.log("Intro - Sixth dot clicked");
        map.flyTo({
            center: [-106.6945, 35.0433],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'Race', 'Poverty' 체크박스 및 'bond-select' 올바른 설정
        const raceCheckbox = document.getElementById('race2020');
        raceCheckbox.checked = true;
        raceCheckbox.dispatchEvent(new Event('change'));

        const raceSelect = document.getElementById('race-select');
        raceSelect.value = 'option6';
        raceSelect.dispatchEvent(new Event('change'));

        const povertyCheckbox = document.getElementById('poverty2020');
        povertyCheckbox.checked = true;
        povertyCheckbox.dispatchEvent(new Event('change'));

        bondSelect.value = 'option3';
        bondSelect.dispatchEvent(new Event('change'));
    }
}

function handleIndustryStoryDots(index) {
    // industry에 해당되는 dot의 동작 구현
    const bondSelect = document.getElementById('bond-select'); // 'bond-select' 요소 가져오기
    if (index === 0) {
        map.flyTo({
            center: [-106.652536, 35.091781],
            zoom: 15
        });
        if (map.getLayer('point') && map.getSource('point')) {
            map.getSource('point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-106.652536, 35.091781]
                    }
                }]
            });
        } else {
            map.addSource('point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-106.652536, 35.091781]
                        }
                    }]
                }
            });
    
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: 'point',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#FF0000'
                }
            });
        }
        // 점 추가 부분 끝
        // 체크박스 모두 비활성화
        const checkboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"], .makeup input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });
    } else if (index === 1) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        // bond-select를 'Amount'로 설정
        bondSelect.value = 'option1';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 2) {
        
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });

        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });
        bondSelect.value = 'option3';
        bondSelect.dispatchEvent(new Event('change'));
        
        // Your handling code for the third dot in industry here
    } else if (index === 3) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        

        // Your handling code for the fourth dot in industry here
    } else if (index === 4) {
        
        
        map.flyTo({
            center: [-106.566446, 35.319149],
            zoom: 15
        });


        if (map.getLayer('point') && map.getSource('point')) {
            map.getSource('point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-106.566446, 35.319149]
                    }
                }]
            });
        } else {
            map.addSource('point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-106.566446, 35.319149]
                        }
                    }]
                }
            });
    
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: 'point',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#FF0000'
                }
            });
        }
        
        const checkboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"], .makeup input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        }); 

    } else if (index === 5) {
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        
        // Your handling code for the sixth dot in industry here
    }
}

function handleNeighborhoodsStoryDots(index) {
    
    if (map.getLayer('point') && map.getSource('point')) {
        map.removeLayer('point');
        map.removeSource('point');
    }
    // neighborhoods에 해당되는 dot의 동작 구현
    if (index === 0) {
        map.flyTo({
            center: [-105.939931, 35.684791],
            zoom: 15
        });

        if (map.getLayer('point') && map.getSource('point')) {
            map.getSource('point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-105.939931, 35.684791]
                    }
                }]
            });
        } else {
            map.addSource('point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-105.939931, 35.684791]
                        }
                    }]
                }
            });
    
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: 'point',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#FF0000'
                }
            });
        }

        const checkboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"], .makeup input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });
    } else if (index === 1) {
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        updateYearCheckboxes('2015');

    } else if (index === 2) {
        map.flyTo({
            center: [-106.6945, 35.0833],
            zoom: 11
        });

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        updateYearCheckboxes('2016');
    } else if (index === 3) {
        map.flyTo({
            center: [-106.696644, 35.138554],
            zoom: 15
        });

        if (map.getLayer('point') && map.getSource('point')) {
            map.getSource('point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-106.696644, 35.138554]
                    }
                }]
            });
        } else {
            map.addSource('point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-106.696644, 35.138554]
                        }
                    }]
                }
            });
    
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: 'point',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#FF0000'
                }
            });
        }

        // 'container-bailinfo' 체크박스 모두 선택
        const containerBailinfoCheckboxes = document.querySelectorAll('.container-bailinfo input[type="checkbox"]');
        containerBailinfoCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        });

        // 'makeup' 체크박스 모두 해제
        const makeupCheckboxes = document.querySelectorAll('.makeup input[type="checkbox"]');
        makeupCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });

        updateYearCheckboxes('2020');
    }
}

document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('dot')) {
        const storyIndex = event.target.dataset.index;
        const activeStoryContent = stories[activeStoryItem.dataset.story].content;
        updateStoryContent(activeStoryContent, parseInt(storyIndex));
    }
});

document.getElementById('stories-link').addEventListener('click', function(event) {  
    event.preventDefault();  
    const popup = document.getElementById('popup');  
    popup.classList.remove('hidden');  
    popup.classList.add('visible');  
}); 
 
document.getElementById('close-btn').addEventListener('click', function() {  
    const popup = document.getElementById('popup');  
    popup.classList.remove('visible');  
    popup.classList.add('hidden');  
});

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
  
  // 根据选中的年份设置地图图层的可见性 Set the visibility of the map layers based on the selected year
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

// Eniola --- 1. Normalize raw disposition text into known categories
function normalizeDisposition(raw) {
    if (!raw) return "other";
    const text = raw.toLowerCase();

    if (text.includes("jury conviction")) return "jury_conviction";
    if (text.includes("guilty plea") || text.includes("no contest")) return "guilty_plea";
    if (text.includes("dismiss")) return "dismissed";
    if (text.includes("deferred") || text.includes("cond. discharge")) return "pending";
    if (text.includes("acquitted") || text.includes("converted") || text.includes("closure") || text.includes("transferred")) return "other";

    return "other";
}

// --- 2. Listen for dropdown changes
document.getElementById('bond-select').addEventListener('change', function () {
    const selected = this.value;

    const chart = document.getElementById('case-outcome-chart');
    const filters = document.getElementById('case-outcome-filters');
    const lienFilters = document.getElementById('lien-status-filters');

    const otherLegends = document.querySelectorAll('.duration-legend, .company-barchart, .income-legend');
    otherLegends.forEach(el => el.remove());
    
    if (selected === 'option4') {
        chart.style.display = 'block';
        filters.style.display = 'block';
        lienFilters.style.display = 'none';
        drawOutcomeChart();
    } else {
        chart.style.display = 'none';
        filters.style.display = 'none';
        lienFilters.style.display = 'block';
    }
});

// --- 3. Draw chart based on selected filters
function drawOutcomeChart() {
    d3.json('data/lien_overall/lien_overall_with_disposition.geojson').then(data => {
        const bins = ['low', 'medium', 'high'];
        const outcomes = ['guilty_plea', 'jury_conviction', 'dismissed', 'pending', 'other'];

        // Initialize outcome group counts
        const outcomeGroups = {};
        outcomes.forEach(outcome => {
            outcomeGroups[outcome] = { outcome };
            bins.forEach(bin => {
                outcomeGroups[outcome][bin] = 0;
            });
        });

        data.features.forEach(f => {
            const amountRaw = f.properties.Amount;
            const amount = Number(String(amountRaw).replace(/[^0-9.-]+/g, ""));
            if (isNaN(amount)) return;

            const rawDisposition = f.properties["Disposition (from Criminal Dockets)"];
            if (typeof amount !== 'number' || !rawDisposition) return;

            const outcome = normalizeDisposition(rawDisposition);
            const bin = amount < 35000 ? 'low' : amount < 85000 ? 'medium' : 'high';

            if (outcomeGroups[outcome]) {
                outcomeGroups[outcome][bin]++;
            }
        });

        const chartData = Object.values(outcomeGroups);
        drawStackedBarChart(chartData, bins);
    });
}


// --- 4. Create the actual stacked bar chart
function drawStackedBarChart(data, keys) {
    const svg = d3.select('#case-outcome-chart svg');
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 50 },
          width = +svg.attr('width') - margin.left - margin.right,
          height = +svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.outcome))
        .range([0, width])
        .padding(0.3);  // <— thinner bars

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => keys.reduce((sum, k) => sum + d[k], 0))])
        .nice()
        .range([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSet2);

    const stacked = d3.stack().keys(keys)(data);

    g.selectAll('g')
        .data(stacked)
        .join('g')
        .attr('fill', d => color(d.key))
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', d => x(d.data.outcome))
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth());

    // Y Axis
    g.append('g').call(d3.axisLeft(y).ticks(5));

    // Y Axis Label
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .attr("dy", "-1em")
        .style("text-anchor", "middle")
        .style("fill", "#fff")
        .text("Number of Defendants");

    // Prettify outcome labels
    const outcomeLabels = {
        guilty_plea: "Guilty Plea",
        jury_conviction: "Jury Conviction",
        dismissed: "Dismissed",
        pending: "Pending",
        other: "Other"
    };

    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => outcomeLabels[d] || d))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-30)")
        .style("fill", "#fff");

    // Legend
    const legend = svg.append('g').attr('transform', `translate(${width - 80}, 10)`);
    keys.forEach((key, i) => {
        legend.append('rect')
            .attr('x', 0).attr('y', i * 20)
            .attr('width', 10).attr('height', 10)
            .attr('fill', color(key));
        legend.append('text')
            .attr('x', 15).attr('y', i * 20 + 9)
            .text(key.charAt(0).toUpperCase() + key.slice(1))
            .style('font-size', '12px')
            .style('fill', '#fff');  // fix color!
    });
}

