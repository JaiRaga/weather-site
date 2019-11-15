const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d1103a18746858e2e1d4fe9c3b77e9ed/${latitude},${longitude}?units=si`
 
    request({ url, json: true }, (error, { body }) => {
       if (error) {
          callback("Unable to connect to weather service!")
       } else if (body.error) {
          callback("Unable to find location. Try another search")
       } else {
          callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} degrees with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability} percent chance of rain`)
       }
    })
 }

 module.exports = forecast