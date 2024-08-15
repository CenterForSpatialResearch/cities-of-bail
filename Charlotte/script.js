document.getElementById('race2020').addEventListener('change', function(e) {
    map.setLayoutProperty('race_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('poverty2020').addEventListener('change', function(e) {
    map.setLayoutProperty('poverty_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});

document.getElementById('housing2020').addEventListener('change', function(e) {
    map.setLayoutProperty('housing_2020', 'visibility', e.target.checked ? 'visible' : 'none');
});