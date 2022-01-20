const config = require("./package.json")
const $ = require("jquery");
const InternetConnection = require('./assets/js/InternetConnection');
const {fetchImage, download, slideshow} = require('./assets/js/headerImage');
const {fetchingOrders} = require('./assets/js/takingOrders')
const {FontSize} = require('./assets/js/fontsize')
const {ipcRenderer, dialog} = require("electron");
const {fetchSettings, changeSettings} = require("./assets/js/setting")
const {about_template} = require("./assets/js/about")
const {settings_template} = require("./assets/js/settings")
const {default_setting} = require("./assets/js/default_setting")
const {create_dir} = require("./assets/js/food-order-directory")
const log = require('electron-log');
const path = require("path");
const fs = require('fs');
const url = require("url");
const {computeScreenAwareSize} = require("custom-electron-titlebar/common/dom");
const local_directory = "C:\\Users\\public"
const main_folder = "\\foodorderbot\\"


$('#dashboard').show();
$('#slideshow').hide();
$('#settings').hide()


let dateObj = new Date();
let folder_name = dateObj.getDate() + "-" + dateObj.getDay() + "-" + dateObj.getFullYear();
let STORE_NO;
let Size;
let GET_ORDER_URL;
let imageRefreshRateInterval;
let imagedownload;
let settingdata = local_directory + main_folder + "/setting_data.json"
let defaultsettingdata = local_directory + main_folder + "/default_setting_data.json"
let url_from_json
let boturl_from_json
let fontsize_from_json
let store_number_from_json
let image_theme_from_json
let image_theme_from_json_value
let irr_from_json
let s_size
let position_num_from_json

create_dir(local_directory + main_folder).then(r => console.log(r))
create_dir(local_directory + main_folder + '\\logs').then(r => console.log(r))
const imgpath = local_directory + main_folder + '\\'

default_setting()


// ipcRenderer.on('getOrderFromUrl', function (evt, url) {
//     let Url = url['getOrderFromUrl'];
//     log.info('this is a url from line 31 in renderer.js --> ' + Url);
//     if (Url !== undefined && Url !== null && Url) {
//         GET_ORDER_URL = Url;
//     }
// });

// ipcRenderer.on('storenumber', function (evt, number) {
//     let storenumber = number['storenumber'];
//     log.info('this is a storenumber from line 44 in renderer.js --> ' + storenumber);
//     if (storenumber !== undefined && storenumber !== null && storenumber) {
//         STORE_NO = storenumber;
//         dashboard(storenumber);
//     } else {
//         log.error('error for storenumber in line number 51 in renderer.js --> ' + storenumber)
//     }
// });
// ipcRenderer.on('FontSize', function (evt, number) {
//     Size = number['fontsize'];
//     log.info('log for Font Size in line number 57 from renderer.js --> ' + Size)
//     if (Size !== undefined && Size !== null && Size) {
//         let setting_url = "http://localhost:5000/setting?storenumber=" + STORE_NO + "&fontsize=" + Size;
//         console.log(Size)// whenever user change value from setting
//
//         FontSize(Size)
//         // change setting in when user change from setting manually.
//         changeSettings(setting_url, (response, body) => {
//             if (response === 200) {
//                 log.info('Setting changed for font size order refresh rate by user --> ' + body)
//             } else {
//                 log.warn('Setting for font size is not changed in line 70 in --> renderer.js ' + response, body)
//             }
//         });
//     }
// });

ipcRenderer.on('About', function () {

    $("#dashboard").hide()
    $("#slideshow").hide()
    $("#settings").hide()
    $("#about").html(about_template)
    let c_v = process.versions['chrome']
    $("#chrome_version").html(c_v)
    $("#app_version").html(config.version)
    $("#about").show()

});

ipcRenderer.on('Settings', function () {
    console.log("seetings")
    $("#dashboard").hide()
    $("#slideshow").hide()
    $("#about").hide()
    $("#settings").html(settings_template)
    $("#settings").show()
});

// ipcRenderer.on('orderRefreshRate', function (evt, number) {
//     let Rate = number['orderrefreshrate'];
//     log.info('log for order refresh rate in line number 57 from renderer.js --> ' + Rate)
//     if (Rate !== undefined && Rate !== null && Rate) {
//         let setting_url = "http://localhost:80/setting?storenumber=" + STORE_NO + "&orderrefreshrate=" + Rate;
//         orderRefreshRate(Rate)  // whenever user change value from setting
//         // change setting in when user change from setting manually.
//         changeSettings(setting_url, (response, body) => {
//             if (response === 200) {
//                 log.info('Setting changed for order refresh rate by user --> ' + body)
//             } else {
//                 log.warn('Setting is not changed in line 70 in --> renderer.js ' + response, body)
//             }
//         });
//     }
// });


// $("#default").hide()

// function defaultImageSlideShow() {
//     var i = 0
//     fs.readdir(local_directory + main_folder + "/screensaver/rosascafe", (err, files) => {
//         if (err) {
//             $(".default_image").attr('src', './assets/images/screensaver1.png')
//         } else {
//
//             let defult_slider_image = files
//             let defult_slider_image_path = local_directory + main_folder + "/screensaver/rosascafe/"
//             $(".default_image").attr('src', defult_slider_image_path + defult_slider_image[0])
//
//             setInterval(function () {
//                 console.log(local_directory + main_folder + "/screensaver/rosascafe")
//                 if (i === 0) {
//                     $(".default_image").attr('src', defult_slider_image_path + defult_slider_image[i])
//                 } else if (i === 1) {
//                     $(".default_image").attr('src', defult_slider_image_path + defult_slider_image[i])
//                 } else if (i === 2) {
//                     $(".default_image").attr('src', defult_slider_image_path + defult_slider_image[i])
//                 } else if (i === 3) {
//                     $(".default_image").attr('src', defult_slider_image_path + defult_slider_image[i])
//                 } else {
//                     $(".default_image").attr('src', defult_slider_image_path + defult_slider_image[0])
//                 }
//                 if (i >= 3) {
//                     i = 0
//                 } else {
//                     i = i + 1
//                 }
//             }, 3000)
//         }
//     })
// }

fs.readFile(settingdata, (err, data) => {
    if (err) {
        fs.readFile(defaultsettingdata, (err, data) => {
            if (err) {
                throw err
            } else {
                let data_from_default_setting = JSON.parse(data.toString())
                url_from_json = data_from_default_setting['orderboturl']
                boturl_from_json = data_from_default_setting['orderboturl']
                GET_ORDER_URL = url_from_json
                store_number_from_json = data_from_default_setting['store_number']
                ipcRenderer.send('storenumber', {
                    data: store_number_from_json
                })
                ipcRenderer.send('position_number', {
                    data: position_num_from_json
                })
                irr_from_json = data_from_default_setting['irr']
                position_num_from_json = data_from_default_setting['position_number']
                image_theme_from_json = data_from_default_setting['image_theme']
                image_theme_from_json_value = "Rosascafe"
                dashboard(store_number_from_json)
            }
        })


    } else {
        let json_data = JSON.parse(data.toString())
        console.log("JII")
        url_from_json = json_data['orderboturl']
        boturl_from_json = json_data['orderboturl']
        position_num_from_json = json_data['position_number']
        irr_from_json = json_data['irr']
        console.log(url_from_json)
        fontsize_from_json = json_data['fontsize']
        if (fontsize_from_json !== "") {
            FontSize(fontsize_from_json)
        } else {
            console.log("font size not change")
        }
        store_number_from_json = json_data['store_number']
        image_theme_from_json = json_data['image_theme']
        if (image_theme_from_json === 'rosascafe') {
            image_theme_from_json_value = "Rosascafe"
        } else if (image_theme_from_json === 'texasburger') {
            image_theme_from_json_value = "Texas Burger"
        } else if (image_theme_from_json === 'tacovilla') {
            image_theme_from_json_value = "Tacovilla"
        } else {
            image_theme_from_json_value = "Rosascafe"
        }
        ipcRenderer.send('storenumber', {
            data: store_number_from_json
        })
        ipcRenderer.send('position_number', {
            data: position_num_from_json
        })
        if (url_from_json !== "") {
            GET_ORDER_URL = url_from_json
            STORE_NO = store_number_from_json
            dashboard(STORE_NO)
        }
    }
})

function imageRefreshRateFunction1(number) {

    let rate = number
    let path_of_image
    let concept
    let previous_saved_image
    let newPath
    let imagesUrl
    let list_of_url_images = []
    if (imagedownload !== undefined || null) {
        clearInterval(imagedownload)
    }

    if (imageRefreshRateInterval !== undefined || null) {
        clearInterval(imageRefreshRateInterval)
    }
    if (rate !== undefined && rate !== null && rate) {
        let mediaType = ["screensaver"];
        mediaType.forEach(async (value, index) => {
            concept = image_theme_from_json;
            let imageUrl = `https://itdesk.bubbleapps.io/api/1.1/obj/Media?constraints=[ { "key": "concept", "constraint_type": "equals", "value": "${concept}" } ]`;

            const smallpath = imgpath + value + "\\";
            path_of_image = smallpath
            console.log(smallpath)
            create_dir(smallpath + "/" + concept).then(r => console.log(r))
            await create_dir(smallpath)
            console.log(imageUrl)
            await fetchImage(imageUrl, (response) => {
                let data = JSON.parse(response);
                console.log("hiii data")
                console.log(data)
                fs.readdir(smallpath + concept, (err, files) => {
                    if (err) {
                        console.log(err)
                    } else {
                        previous_saved_image = files
                    }
                    console.log(concept)


                    imagesUrl = data.response.results[0].screensavers;
                    console.log(imagesUrl)
                    imagesUrl.forEach(async (link, index) => {
                        var to = imagesUrl[index].lastIndexOf('/');
                        var imagename = imagesUrl[index]
                        var savedimage = imagename.substring((to + 1),);
                        newPath = smallpath + concept + "/" + savedimage;
                        log.info('this log is for new path in line number 108 in renderer.js --> ' + newPath)
                        console.log(previous_saved_image)
                        if (previous_saved_image.length === 0 || previous_saved_image === undefined) {
                            console.log("download")
                            await download("https:" + link, newPath, function () {
                                log.info('image downloaded successfully in line number 275 in renderer.js');
                            });
                        }
                        // }
                    })
                })


                imagedownload = setInterval(() => {
                    console.log("set interval start")

                    fs.readdir(smallpath + concept, (err, files) => {
                        if (err) {
                            console.log("errr in line 284")
                            fs.mkdirSync(smallpath + concept, {
                                recursive: true
                            });
                        }
                        previous_saved_image = files
                        log.info('this log is from line number 102 in renderer.js of image refresh rate --> ' + data)
                        console.log(concept)
                        imageUrl = `https://itdesk.bubbleapps.io/api/1.1/obj/Media?constraints=[ { "key": "concept", "constraint_type": "equals", "value": "${concept}" } ]`;

                        fetchImage(imageUrl, (response) => {
                            let data = JSON.parse(response);
                            imagesUrl = data.response.results[0].screensavers;
                            console.log(imagesUrl)
                            list_of_url_images=[]
                            console.log(list_of_url_images)
                            imagesUrl.forEach(async (link, index) => {
                                var to = imagesUrl[index].lastIndexOf('/');
                                var imagename = imagesUrl[index]
                                var savedimage = imagename.substring((to + 1),);
                                console.log(list_of_url_images)
                                console.log(savedimage)
                                if (list_of_url_images.includes(savedimage)) {
                                    console.log("already exists")
                                } else {
                                    list_of_url_images.push(savedimage)
                                }
                                console.log(list_of_url_images)
                                newPath = smallpath + concept + "/" + savedimage;
                                log.info('this log is for new path in line number 108 in renderer.js --> ' + newPath)
                                console.log(previous_saved_image)
                                if (previous_saved_image === undefined || previous_saved_image.length === 0) {
                                    console.log("download")
                                    await download("https:" + link, newPath, function () {
                                        log.info('image downloaded successfully in line number 308 in renderer.js');
                                    });
                                }
                            })
                            previous_saved_image.sort()
                            list_of_url_images.sort()
                            console.log(previous_saved_image)
                            console.log(list_of_url_images)
                            if ((previous_saved_image.join(',') === list_of_url_images.join(',')) || (previous_saved_image.length === 0)) {
                                console.log("not to download")

                            } else {
                                fs.rmdir(smallpath + concept, {recursive: true}, async (err) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        fs.readdir(smallpath + concept, (err, files) => {
                                            if (err) {
                                                console.log("errr in line 325")
                                                fs.mkdirSync(smallpath + concept, {
                                                    recursive: true
                                                });
                                            }
                                            console.log("downlaod new images")
                                            var previous_saved_image = files
                                            var imagesUrl = data.response.results[0].screensavers;
                                            imagesUrl.forEach(async (link, index) => {
                                                var to = imagesUrl[index].lastIndexOf('/');
                                                var imagename = imagesUrl[index]
                                                var savedimage = imagename.substring((to + 1),);
                                                newPath = smallpath + concept + "/" + savedimage;
                                                log.info('this log is for new path in line number 108 in renderer.js --> ' + newPath)
                                                console.log(previous_saved_image)
                                                if (previous_saved_image === undefined || previous_saved_image.length === 0) {
                                                    console.log("download")
                                                    await download("https:" + link, newPath, function () {
                                                        log.info('image downloaded successfully in line number 342 in renderer.js');
                                                    });
                                                }
                                                // }
                                            })
                                        })
                                        log.info("previous image was deleted and new images are saved successfully!");

                                    }
                                });
                            }

                        });

                    });
                    console.log("set interval end")

                }, 300000)

            })
        })
    }
    slideshow(path_of_image + concept + "/", function (imgsrc) {
        log.warn("this is the warning for image in line 166 in renderer.js --> " + imgsrc)
        $('#slideshowImage').attr('src', imgsrc);
    })
    imageRefreshRateInterval = setInterval(() => {
        console.log(rate)
        if ($('#slideshow').css('display') !== 'none') {
            slideshow(path_of_image + concept + "/", function (imgsrc) {
                log.warn("this is the warning for image in line 118 in renderer.js --> " + imgsrc)
                $('#slideshowImage').attr('src', imgsrc);
            })
        }
    }, rate)
}


function fontsize() {
    s_size = $("#font_size").val()
    var s_url = $("#url").val()
    var s_number = $("#store_number").val()
    var s_imagetheme = $("#image_theme").val()
    var s_irr = $("#irr").val()
    var irrcheck = (parseInt(s_irr)) * 1000
    var positionNum = $("#position").val()
    console.log(positionNum);
    let pattern = "^https?:\/\/."
    if ((s_url.match(pattern)) && ((s_size.match("(?<![\\d.])[0-9]+(?![\\d.])")) || s_size == "") && (s_number.match("(?<![\\d.])[0-9]+(?![\\d.])")) && (parseInt(s_number) > 0) && (parseInt(s_number) < 1000)) {
        $("#msg").text("")
        if (s_size !== "") {
            FontSize(s_size)
        } else {
            $("#msg").text("")
        }
    } else {
        $("#msg").text("Invalid FontSize or StoreNumber or url ").css({color: "red"})
    }

    var msg = $("#msg").text()

    if (s_url === "" || s_number === "" || positionNum === "") {
        $("#msg").text("Url, Store Number and position Number Required").css({color: "red"})
    } else {
        if (msg === "") {
            $("#msg").text("")
        } else {
            $("#msg").text(msg)
        }
    }
    if ((((irrcheck % 1000) === 0) && (parseInt(s_irr) > 0)) || (s_irr === "")) {
        console.log(true)
    } else {
        $("#msg").text("invalid refresh Rate").css({color: "red"})
    }
    msg = $("#msg").text()
    if (msg === "") {
        let setting_dict = {
            "orderboturl": s_url,
            "fontsize": s_size,
            "store_number": s_number,
            "image_theme": s_imagetheme,
            "irr": s_irr,
            "position_number": positionNum
        }
        fs.writeFileSync(path.resolve(local_directory + main_folder, 'setting_data.json'), JSON.stringify(setting_dict));
        GET_ORDER_URL = s_url
        $("#msg2").text("Settings Saved Successfully").css({color: "green"})
        setTimeout(function () {
            $("#msg").text("")
            $("#msg2").text("")
        }, 2000)
        dashboard(s_number)
    } else {
        $("#msg2").text("Error please Check ").css({color: "red"})
        setTimeout(function () {
            $("#msg").text("")
            $("#msg2").text("")
        }, 2000)
    }

}

// function orderRefreshRate(rate) {
//     if (orderInterval !== undefined) clearInterval(orderInterval);
//     orderInterval = setInterval(() => {
//         if (order_queue.length === 0) {
//             display_index = 1
//         } else if (order_queue.length <= 9 && order_queue.length >= 1 && pending_order_queue.length === 0) {
//
//             setTimeout(() => {
//                 let val = order_queue.shift()
//                 if (val !== undefined) {
//                     display_index--;
//
//                     for (let i = 1; i <= 9; i++) {
//                         if (order_queue[i - 1] !== undefined) {
//                             $(`#order_no_${i}`).html(order_queue[i - 1])
//                             log.info("this is from line 154 in renderer.js the order value is --> " + val)
//                         } else {
//                             $(`#order_no_${i}`).text("");
//                         }
//                     }
//                 }
//
//             }, 1000)
//         } else {
//             setTimeout(() => {
//
//                 order_queue.shift()
//                 let next_order_no = pending_order_queue.shift()
//                 if (next_order_no !== undefined) {
//                     order_queue.push(next_order_no);
//
//                     for (let i = 1; i <= 9; i++) {
//                         if (order_queue[i - 1] !== undefined) {
//                             $(`#order_no_${i}`).html(order_queue[i - 1])
//                         }
//                     }
//                 }
//             }, 1000)
//         }
//     }, rate)
// }


const dashboard = (storenumber) => {
    $('#about').hide()
    if ($('#settings').is(":hidden")) {
        $('#settings').hide()
    } else {
        $('#settings').show()
    }
    let irr_value
    if (irr_from_json === "") {
        irr_value = 5000
    } else {
        irr_value = irr_from_json * 1000
    }
    setInterval(() => {
        fetchingOrders(GET_ORDER_URL, function (order_no) {
                log.info('url and store number in 164 render.js -->' + GET_ORDER_URL + ',' + storenumber)
                if (order_no.length > 0) {
                    if ($('#about').is(":hidden") && $('#settings').is(":hidden")) {
                        for (let i = 1; i <= 9; i++) {
                            let num = order_no[i - 1].number
                            if (num === undefined) {
                                $(`#order_no_${i}`).html('A');
                            } else {
                                $('#slideshow').hide();
                                $('#dashboard').show();
                                if (order_no.length === 1) {
                                    for (let x = 2; x <= 9; x++) {
                                        $(`#order_no_${x}`).html(' ');
                                    }
                                }
                                if (order_no.length === 2) {
                                    for (let x = 3; x <= 9; x++) {
                                        $(`#order_no_${x}`).html(' ');
                                    }
                                }
                                if (order_no.length === 3) {
                                    for (let x = 4; x <= 9; x++) {
                                        $(`#order_no_${x}`).html(' ');
                                    }
                                }
                                $(`#order_no_${i}`).html(num);
                            }
                        }
                        // for (let i = 0; i <= order_no.length; i++) {
                        //     let num = order_no[i].number
                        //     $(`#order_no_${display_index}`).html(num);
                        //
                        //     if (order_verify.has(num) === false) {
                        //         order_verify.add(num)
                        //         if (order_queue.length < 9) {
                        //             order_queue.push(num);
                        //             $(`#order_no_${display_index}`).html(num);
                        //             display_index++;
                        //
                        //         } else {
                        //             pending_order_queue.push(num)
                        //         }
                        //     }
                        //
                        //
                        // }
                        // while(order_queue.pop());
                        // while(pending_order_queue.pop());
                        // order_verify.clear();
                    } else {
                        $('#dashboard').hide();
                        $('#slideshow').hide();
                        if ($('#settings').is(":hidden")) {
                            $('#about').show();
                        } else {
                            $('#settings').show();
                        }
                    }
                } else {
                    if ($('#about').is(":hidden") && $('#settings').is(":hidden")) {
                        if (order_no.length === 0) {
                            $('#dashboard').hide();
                            // imageRefreshRateFunction1(irr_value)
                            $('#slideshow').show();
                        } else {
                            if ($('#dashboard').css('display') === 'none') {
                                $('#dashboard').show();
                                $('#slideshow').hide();
                            }
                        }
                    } else {
                        $('#dashboard').hide();
                        $('#slideshow').hide();
                        if ($('#settings').is(":hidden")) {
                            $('#about').show();
                        } else {
                            $('#settings').show();
                        }
                    }
                }
            }
        )
    }, 2000);
    imageRefreshRateFunction1(irr_value)
    // let Ort = 2000 //Ort = order refresh rate

    //below code is useful if required
    // fetchSettings("http://localhost:80/setting" + "?storenumber=" + storenumber, function (error, response, body) {
    //     let data = JSON.parse(body)
    //     // ImageRefreshRate = parseInt(data['imageRefreshRate']);
    //     // OrderRefreshRate = parseInt(data['orderRefreshRate']);
    //     ImageRefreshRate = 3000
    //     OrderRefreshRate = "1000"
    //
    //     if (ImageRefreshRate !== undefined && ImageRefreshRate !== null) {
    //         log.info("This is for Image refresh rate " + ImageRefreshRate + " in line 213 in renderer.js ")
    //         let imageNum = {"imageRefreshRate": ImageRefreshRate}
    //         imageRefreshRate(null, imageNum) // API refresh rate
    //     }
    //
    //     if (OrderRefreshRate !== undefined && OrderRefreshRate !== null) {
    //         log.info("This is for Order refresh rate " + OrderRefreshRate + " in line 218 in renderer.js ")
    //         orderRefreshRate(OrderRefreshRate) // API Refresh rate
    //     }
    //
    // });

    // setTimeout(() => {
    //     setInterval(() => {
    //         console.log(order_queue.length)
    //         if (order_queue.length === 0) {
    //             $('#dashboard').hide();
    //             $('#slideshow').show();
    //         } else {
    //             if ($('#dashboard').css('display') === 'none') {
    //                 $('#dashboard').show();
    //                 $('#slideshow').hide();
    //             }
    //         }
    //     }, 500)
    // }, 10000)
}

window.addEventListener('online', function () {
    status = InternetConnection.updateOnlineStatus();
    $('#connectionStatus').html(status);
    $('#connectionStatus').css({
        'background-color': 'green',
        'color': 'white',
    });

    M.toast({
        html: 'Comeback To Online',
        classes: '#00897b teal darken-1',
        inDuration: 1000
    })
})

window.addEventListener('offline', function () {
    status = InternetConnection.updateOnlineStatus()
    $('#connectionStatus').html(status);
    $('#connectionStatus').css({
        'background-color': 'red',
        'color': 'white',
    });

    M.toast({
        html: 'Lost Internet Connection',
        classes: '#e53935 red darken-1',
        inDuration: 1000
    });
})

function Home() {
    $("#about").hide()
    $("#settings").hide()
    if (url_from_json === "" || url_from_json === undefined) {
        console.log("error")
    } else {
        $("#dashboard").show()
        fetchingOrders(GET_ORDER_URL, function (order_no) {
            if (order_no.length === 0) {
                $("#slideshow").show()
            } else if (GET_ORDER_URL === null) {
                $("#dashboard").show()
            } else {
                $("#dashboard").show()
            }
        })

    }
}

// var jsonfile=fs.readFile(path.resolve(local_directory + main_folder + folder_name, 'setting_data.json'));

function Clear() {
    $("#url").val("")
    $("#font_size").val("")
    $("#store_number").val("")
    $("#irr").val("")
    $("#default_theme").text("Select Theme")
    $('#image_theme').val(image_theme_from_json)
}


// if (previous_saved_image.includes(savedimage)) {
//
//     console.log(previous_saved_image)
//     console.log()
//     console.log(newPath)
//     // fs.rmdir(smallpath+concept, { recursive: true }, (err) => {
//     //     if (err) {
//     //         throw err;
//     //     }
//     //
//     //     console.log("is deleted!");
//     // });
//
//
//
//     console.log(newPath)
// } else {
//     // fs.unlinkSync()
//     // await download("https:" + link, newPath, function () {
//     //     log.info('image downloaded successfully in line number 110 in renderer.js');
//     // });
//
// }


//     let diff = list_of_url_images.filter(x => !previous_saved_image.includes(x)); //download
//     console.log(diff)
//     imagesUrl.forEach(async (link, index) => {
//         var indexofimagename = imagesUrl[index].lastIndexOf('/');
//         var nameofimage = imagesUrl[index]
//         var checkedimage = nameofimage.substring((indexofimagename + 1),);
//         if (diff.includes(checkedimage)) {
//             console.log("downlaod", checkedimage)
//             await download("https:" + link, newPath, function () {
//                 log.info('image downloaded successfully in line number 110 in renderer.js ', link);
//             });
//             console.log(previous_saved_image)
//
//         } else {
//             console.log("not to dwonload")
//         }
//     })
//
//     let diff2 = previous_saved_image.filter(x => !list_of_url_images.includes(x)); //delete
//     diff2.forEach(async (link, index) => {
//         console.log(link)
//         console.log(smallpath + concept + "/" + link)
//
//         // fs.unlinkSync(smallpath + concept + "/" + link)
//
//     })
//
//     console.log(diff)
//     console.log(diff2)
//
