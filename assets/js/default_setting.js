const f = require('fs');
const paths = require("path");
const localdirectory = "C:\\Users\\public"
const mainfolder = "\\foodorderbot\\"
function default_setting() {
    let setting_dict = {
        "orderboturl": "http://127.0.0.1:5000/orders",
        "store_number": 16,
        "image_theme": "rosascafe",
        "irr": 5
    }
    f.writeFileSync(paths.resolve(localdirectory + mainfolder, 'default_setting_data.json'), JSON.stringify(setting_dict));
}


module.exports = {
    default_setting
}