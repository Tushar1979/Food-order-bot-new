const request = require('request');


const changeSettings = (url, callback) => {
    request.get(url, function (error, response, body) {
       
      
      
        callback(response,body);

    });
}


const fetchSettings = (url, callback) => {
    request.get(url, function (error, response, body) {
       
        callback(error, response, body)
    });
}

module.exports = {
    changeSettings,
    fetchSettings
}