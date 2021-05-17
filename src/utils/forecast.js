const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=948072e6375f83a15f60ae9b62119e7a&query=' + latitude + ',' + longitude
    request ({ url, json: true }, (error, { body } = {}) => {
        if (error){
            callback('Unable to Connect to Weather services', undefined)
        } else if (body.error){
            callback(body.error.info, undefined)
        } else {
            callback(undefined, 
                (body.current.weather_descriptions[0] + ', It is currently ' + body.current.temperature + ', and feels like ' + body.current.feelslike)
            ) 
        }
    })
}

module.exports = foreCast