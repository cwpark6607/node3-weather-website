const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9vZHBhcmsiLCJhIjoiY2t6N3FlaW4wMWRkZDJ0cW9sNXkzMW5udCJ9.-Jp0QRNC9TGhUeSCCywbtw&limit=1'

    request( { url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const geoData = body.features[0]
            
            callback(undefined, {
                longitude: geoData.center[0],
                latitude: geoData.center[1],
                location: geoData.place_name
            })
        }
    })
}

// const request = require('request')

// const geocode = (address, callback) => {
    
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9vZHBhcmsiLCJhIjoiY2t6N3FlaW4wMWRkZDJ0cW9sNXkzMW5udCJ9.-Jp0QRNC9TGhUeSCCywbtw&limit=1'

//     request( { url, json: true }, (err, { body }) => {
//         if (err) {
//             callback('Unable to connect to location service!', undefined)
//         } else if (body.features.length === 0) {
//             callback('Unable to find location. Try another search!', undefined)
//         } else {
//             const geoData = body.features[0]
            
//             callback(undefined, {
//                 longitude: geoData.center[0],
//                 latitude: geoData.center[1],
//                 location: geoData.place_name
//             })
//         }
//     })
// }

module.exports = geocode;