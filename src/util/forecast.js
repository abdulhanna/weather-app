const request = require('request')


// console.log("hello")




// const forecast = (lang,lati,callback)=>{
//     const url = 'http://api.weatherstack.com/forecast?access_key=9388eab59d39f49b17e622b46ae95c54&query=' + encodeURIComponent(lang ) + ',' + encodeURIComponent(lati) + ''

// request({url:url,json:true},(error,response)=>{
//    if(error){
//        callback('unable to find',undefined)
//    }else if(response.body.error){
//        callback('unable to find loaction',undefined)
//    }else{
//        callback(undefined,{
//         lang:response.body.current.temperature
//        })
//    }

// })

// }

// module.exports = forecast




const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=9388eab59d39f49b17e622b46ae95c54&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast