const request = require('request');


const changeSettings = (url, callback) => {
    request.get(url, function (error, response, body) {
        console.log(error)
        console.log(response)
        console.log(body)
        callback(response,body);

    });
}


const fetchSettings = (url, callback) => {
    request.get(url, function (error, response, body) {
        console.log("hii")
        console.log(body)
        console.log("hii")
        callback(error, response, body)
    });
}

module.exports = {
    changeSettings,
    fetchSettings
}