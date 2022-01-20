const request = require('request');
const fs = require('fs');

const fetchImage = (url, callback) => {
    request.get(url, (err, res, body) => {
        callback(body)
    })
}

const download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


const lastImage = (folderPath, callback) => {
    fs.readdir(folderPath, (err, files) => {
        let index = Math.floor(Math.random() * parseInt(files.length));
        callback(folderPath + files[index])
    });
}
const slideshow = (folderPath, callback) => {

    fs.readdir(folderPath, (err, files) => {
        let index = Math.floor(Math.random() * parseInt(files.length));
        callback(folderPath + files[index])
    });
}

module.exports = {
    fetchImage,
    download,
    lastImage,
    slideshow
}