const { jar } = require('request')
const request = require('request')

const forecast = (longitude, latitude, callback) => {

    // const url = 'http://api.weatherstack.com/current?access_key=59a47567aeb2a499939397b4d9638520&query=' + latitude + ',' + longitude + '&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=59a47567aeb2a499939397b4d9638520&query=' + latitude + ',' + longitude

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather sesrvice!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            result = body.current
            fcstString = result.weather_descriptions[0] + '. It is currently ' + result.temperature + ' degrees out. It feels like ' + result.feelslike + ' degrees out.' + result.humidity + '% of humidity.'
            callback(undefined, fcstString)
        }
    })
}

module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=59a47567aeb2a499939397b4d9638520&query=37.5665,126.9780&units=f'

// wrong url request
// const url = 'http://api.weatherstack.com/current?access_key=59a47567aeb2a499939397b4d9638520&query=&units=f'

// request({ url:url, json: true }, (err, res) => {
//     if (err) {
//         console.log('Unable to connect to weather service!')
//     } else if (res.body.error) {
//         console.log('Unable to find location')
//     } else {
//         const data = res.body.current
//         console.log(data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degrees out.')
//     }
// })