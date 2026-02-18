// shared.js
// Loads the SDF map pin image into a Mapbox map instance.
// Call loadPinImage(map, callback) after map 'load', before adding any symbol layers.
//
// The pin is loaded as an SDF (Signed Distance Field), which means its color
// can be controlled dynamically at render time via the 'icon-color' paint property
// on any symbol layer that uses it. This makes it easy to change pin colors
// based on lien type, bond company, criminal charges, or any other data-driven
// property without needing separate image assets per color.
//
// Usage in each city's map.js:
//   map.on('load', function() {
//       loadPinImage(map, function() {
//           // add your symbol layers here
//       });
//   });
//
// When adding a symbol layer, use:
//   'type': 'symbol'
//   'layout': {
//       'icon-image': 'bail-pin',
//       'icon-size': 0.5,
//       'icon-anchor': 'bottom',
//       'icon-allow-overlap': true
//   }
//   'paint': {
//       'icon-color': '#2b2b2b',   // change this to any color or expression
//       'icon-opacity': 0.9
//   }

function loadPinImage(map, callback) {
    const pinPath = getRelativePinPath();

    map.loadImage(pinPath, function(error, image) {
        if (error) {
            console.error('Failed to load pin image:', error);
            return;
        }
        // Add the image as an SDF so icon-color can be set dynamically
        if (!map.hasImage('bail-pin')) {
            map.addImage('bail-pin', image, { sdf: true });
        }
        if (callback) callback();
    });
}

// Determines the correct relative path to the pin image based on the current page's location.
// City pages are one level deep (e.g. Newark&Jersey_City/), so they need '../images/pin.png'.
// Root-level pages use 'images/pin.png'.
function getRelativePinPath() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    return depth >= 2 ? '../images/pin.png' : 'images/pin.png';
}
