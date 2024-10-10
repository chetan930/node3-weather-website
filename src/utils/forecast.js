const request=require('postman-request');
const forecast = function (latitude, longitude, callback) {
    // const url = 'http://api.weatherstack.com/current?access_key=5d95d180e22bb37dc5b2173e6f2f8099&query='+latitude+','+longitude;
    const url = 'http://api.weatherstack.com/forecast?access_key=5d95d180e22bb37dc5b2173e6f2f8099&query='+latitude+','+longitude+'&forecast_days = 1&hourly = 1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            // console.log("Unable to connect to weather services!")
            callback("Unable to connect to weather services!",undefined)
        } else if (response.body.error) {
            // console.log("Unable to find location!")
            callback("Unable to find location!",undefined)
        }
        else {
            // console.log(response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature + " degree out. feelslike " + response.body.current.feelslike + " out.")
            // callback(undefined,response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature + " degree out. feelslike " + response.body.current.feelslike + " out.")
            callback(undefined,{
                time:response.body.location.localtime,
                current:response.body.current,
                forecast:response.body.forecast
            })
        }
    })

}


module.exports=forecast