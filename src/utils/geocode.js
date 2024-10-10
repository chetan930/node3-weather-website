const request=require('postman-request');
const geocode=function(address,callback){
    const geocodeURL = 'https://api.positionstack.com/v1/forward?access_key=e3e736261d11f8ad091114adf6c93863&limit=1&query='+encodeURIComponent(address)
    request({url:geocodeURL,json:true},(error,response)=>{
     if(error){
         callback("Unable to connect to geocode service",undefined)
     }else if(response.body.error){
        callback("Unable to find location!,Try again",undefined)
     }
     else if(response.body.data.length === 0){
         callback("Unable to find location!",undefined)
     }else{
         callback(undefined,{
             latitude:response.body.data[0].latitude,
             longitude:response.body.data[0].longitude,
             location:response.body.data[0].name+','+response.body.data[0].region+','+response.body.data[0].country,
         })
     }
    })
}


module.exports=geocode