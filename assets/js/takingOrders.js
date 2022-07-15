const request = require("request");


const fetchingOrders = (url, callback) => {
    request(url, function (error, response, body) {
        let data = JSON.parse(body);
    
        callback(data)

    });
}

const readyOrders = (url, callback) => {
    request(url, function (error, response, body) {
        data = JSON.parse(body)
        order_no = data["order_no"]

        callback(order_no)
    });
}


module.exports = {
    fetchingOrders,
    readyOrders
}