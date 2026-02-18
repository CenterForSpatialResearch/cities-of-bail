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
    const pinPath = getRelativePinPath('pin.png');
    const overlayPath = getRelativePinPath('pin_overlay.png');
    console.log('[shared.js] Loading pin from:', pinPath);

    map.loadImage(pinPath, function(error, image) {
        if (error) {
            console.error('[shared.js] Failed to load pin image:', error);
            return;
        }
        console.log('[shared.js] Pin image loaded successfully');
        if (!map.hasImage('bail-pin')) {
            map.addImage('bail-pin', image, { sdf: true });
        }

        // Load the static white overlay (not SDF — always white)
        map.loadImage(overlayPath, function(error2, overlayImage) {
            if (error2) {
                console.error('[shared.js] Failed to load pin overlay image:', error2);
                return;
            }
            if (!map.hasImage('bail-pin-overlay')) {
                map.addImage('bail-pin-overlay', overlayImage, { sdf: false });
            }
            if (callback) callback();
        });
    });
}

// Determines the correct relative path to the pin image based on the current page's location.
// City pages are one level deep (e.g. Newark&Jersey_City/), so they need '../images/pin.png'.
// Root-level pages use 'images/pin.png'.
function getRelativePinPath(filename) {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    return (depth >= 2 ? '../images/' : 'images/') + filename;
}
