document.getElementById('race2020').addEventListener('change', function(e) {
    map.setLayoutProperty('race_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('poverty2020').addEventListener('change', function(e) {
    map.setLayoutProperty('poverty_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('housing2020').addEventListener('change', function(e) {
    map.setLayoutProperty('housing_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

const stories = { 
    intro: { 
        title: "Overview", 
        heading: "Overview", 
        description: "Description of OVerview", 
        content: [ 
            "Pittsburgh is Pennsylvania’s second-most populous city, seat of the second most-populous county, Allegheny County. From 2000 to 2020, the county averaged a population of 1.25 million spanning 538,000 households. About a third of the population lives in Pittsburgh proper. Pittsburgh’s population has declined slightly over the period of study, while the share of African Americans (22.6% in the 2020 census) has grown.", 
            "From 2000 to 2020, just over 450 liens were recorded in Allegheny County securing bail bonds. Pittsburgh represents the lowest per capita rate of mortgage-backed bail bonds in the study (.84 liens per 1,000 households), but also the most expensive. Altogether the liens secured $29 million in real estate. The median bond was $50,000; the average bond was $65,126. The largest secured bond on record was $1 million. The smallest was $3,000.", 
            "Pittsburgh is divided into three sections by the formation of the Ohio River at the confluence of the Allegheny River and Monongahela River. Outside of the prime real estate where the three rivers join, poorer and more racially mixed neighborhoods tend to be located toward the city’s center and along the riverbanks.", 
            "Overall, liens recorded north of Point State Park were on average $10,000 more valuable than liens recorded to the south, but the distribution of liens and capital secured was fairly even across the city. Each third of the city had around 150 liens recorded during the period, and the median lien in each section was $50,000.", 
            "Like all cities in this study, mortgage-backed bail bonds disproportionately burden racial minorities and more strongly correlate with poorer neighborhoods than affluent ones, but only up to a point. The poorest minority neighborhoods record no liens, likely because rates of ownership and property values are too low to meet the bondsmen’s collateral requirements."
        ] 
    }, 
    industry: { 
        title: "Market Concentration", 
        heading: "Market Concentration", 
        description: "Description of Market Concentration", 
        content: [ 
            "Pittsburgh’s is the most concentrated market for high-end mortgage-backed bail bonds in this study. Although it appears as if two firms—Lexington and Liberty—dominate the market, Lexington is a surety conglomerate that backs the bonds underwritten by local bond shops. On the majority of Lexington liens during the period, Liberty was listed as the local shop.", 
            "Liberty, in sum, functioned as a local agent of national surety companies like Lexington for most of the period. In essence, there was one firm underwriting 97% of the mortgage-backed bail bonds in Allegheny County. Liberty Bail Bonds is located centrally downtown, near Pittsburgh’s Union Station.", 
            "Until 2008, most liens were filed on Lexington National paperwork, often with Liberty Bail Bonds listed as a corresponding agent.", 
            "After 2008, almost all liens were filed on Liberty paperwork listing Seneca Insurance Company as a secondary trustee. While Liberty underwrote most of the bonds in this study, it seems to have switched surety firms from Lexington to Seneca halfway through." 
        ] 
    }, 
    neighborhoods: { 
        title: "Reform", 
        heading: "Reform", 
        description: "Description of Reform", 
        content: [ 
            "Unlike the other cities in this study, the rate of recording remained fairly uniform across the period, with an average of about 25 recorded mortgages a year from 2004 to 2018, with no major decline in the years following the 2008 financial crisis.", 
            "Neither the City of Pittsburgh or the Commonwealth of Pennsylvania engaged in significant bail reform from 2000 to 2020, and Pittsburgh’s one major underwriter of mortgage-backed bail bonds remained entirely stable through the period. Although the single firm seems to make for a smaller sample size, Pittsburgh remains a useful comparator to states that experimented with bail in the 2010s, especially its neighbors in Ohio  and New Jersey.", 
            "In July 2023, Pittsburgh began a pilot program to ensure all defendants at bail hearings were appointed representation by legal counsel. Preliminary studies show that represented defendants are granted affordable bail more often, released more often, and make trial appearances more often, when they have a lawyer advising them from the get-go. At the time of publication, it remains too early to tell whether the guarantee of a lawyer at a bail hearing appreciably affects the rate of securing bail bonds with property liens.", 
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
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }

        console.log("Intro - First dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4406],
            zoom: 10
        });

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

        console.log("Intro - Second dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4406],
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
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        
        console.log("Intro - Third dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4406],
            zoom: 11
        });-79.9959, 40.4406

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
        raceSelect.value = 'option2';
        raceSelect.dispatchEvent(new Event('change'));

        const povertyCheckbox = document.getElementById('poverty2020');
        povertyCheckbox.checked = true;
        povertyCheckbox.dispatchEvent(new Event('change'));

        bondSelect.value = 'option1';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 3) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }

        console.log("Intro - Fourth dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4906],
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
        raceSelect.value = 'option2';
        raceSelect.dispatchEvent(new Event('change'));

        const povertyCheckbox = document.getElementById('poverty2020');
        povertyCheckbox.checked = true;
        povertyCheckbox.dispatchEvent(new Event('change'));

        bondSelect.value = 'option1';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 4) {
        console.log("Intro - Fifth dot clicked");
        map.flyTo({
            center: [-80.007192,40.489485],
            zoom: 13
        });
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.getSource('point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-80.007192,40.489485]
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
                            coordinates: [-80.007192,40.489485]
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
 
         // 'Race' 및 'Poverty' 체크박스 선택 및 드롭다운 설정
         const raceCheckbox = document.getElementById('race2020');
         raceCheckbox.checked = true;
         raceCheckbox.dispatchEvent(new Event('change'));
 
         const raceSelect = document.getElementById('race-select');
         raceSelect.value = 'option2';
         raceSelect.dispatchEvent(new Event('change'));
 
         const povertyCheckbox = document.getElementById('poverty2020');
         povertyCheckbox.checked = true;
         povertyCheckbox.dispatchEvent(new Event('change'));
 
         bondSelect.value = 'option1';
         bondSelect.dispatchEvent(new Event('change'));
    } 
}

function handleIndustryStoryDots(index) {
    // industry에 해당되는 dot의 동작 구현
    const bondSelect = document.getElementById('bond-select'); // 'bond-select' 요소 가져오기
    
    if (index === 0) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        
        map.flyTo({
            center: [-79.9959, 40.4406],
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

        bondSelect.value = 'option3';
        bondSelect.dispatchEvent(new Event('change'));

        updateYearCheckboxes('all');

    } else if (index === 1) {
        
        map.flyTo({
            center: [-79.992723, 40.445568],
            zoom: 15
        });
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.getSource('point').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-79.992723, 40.445568]
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
                            coordinates: [-79.992723, 40.445568]
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

        bondSelect.value = 'option3';
        bondSelect.dispatchEvent(new Event('change'));
    } else if (index === 2) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        
        map.flyTo({
            center: [-79.9959, 40.4406],
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

        updateYearCheckboxes('2005');
        
        // Your handling code for the third dot in industry here
    } else if (index === 3) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }
        
        map.flyTo({
            center: [-79.9959, 40.4406],
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

        updateYearCheckboxes('2013');
    } 
}

function handleNeighborhoodsStoryDots(index) {
    // industry에 해당되는 dot의 동작 구현
    const bondSelect = document.getElementById('bond-select'); // 'bond-select' 요소 가져오기
    
    // neighborhoods에 해당되는 dot의 동작 구현
    if (index === 0) {
        
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }

        console.log("Intro - Second dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4406],
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

    } else if (index === 1) {
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }

        console.log("Intro - Second dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4406],
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
        bondSelect.value = 'option3';
        bondSelect.dispatchEvent(new Event('change'));

    } else if (index === 2) {
        if (map.getLayer('point') && map.getSource('point')) {
            map.removeLayer('point');
            map.removeSource('point');
        }

        console.log("Intro - Second dot clicked");
        map.flyTo({
            center: [-79.9959, 40.4406],
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
        bondSelect.value = 'option2';
        bondSelect.dispatchEvent(new Event('change'));
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