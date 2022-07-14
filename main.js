const {app, BrowserWindow, dialog, Menu, ipcRenderer,ipcMain} = require('electron')
const prompt = require('electron-prompt');
const path = require('path');
const log = require('electron-log');
const $ = require('jquery')
const local_directory = "C:\\Users\\public"
const main_folder = "\\foodorderbot\\"
const request = require('request');

let StoreNumber
let position_number

ipcMain.on('storenumber', function (evt, url) {
    StoreNumber = url['data'];
    if (StoreNumber === null || StoreNumber === undefined || StoreNumber===""){
        StoreNumber = "Wait For Store Number fetch"
    }
});
if (StoreNumber === null || StoreNumber === undefined || StoreNumber===""){
    StoreNumber = "wait we are fetching store Number"
}

ipcMain.on('position_number', function (evt, url) {
    position_number = url['data'];
    if (position_number === null || position_number === undefined || position_number===""){
        position_number = "Wait For Position Number fetch"
    }

});
if (position_number === null || position_number === undefined || position_number===""){
    position_number = "wait we are fetching Position Number"
}
else {
    console.log(position_number);
}

console.log(StoreNumber)
let dateObj = new Date();
let folder_name = dateObj.getDate() + "-" + dateObj.getDay() + "-" + dateObj.getFullYear();
log.transports.file.resolvePath = () => path.join(local_directory + main_folder + folder_name, 'logs/main.log');

// const setting_prompt = (title, label, callback) => {
//     prompt({
//         title: title,
//         label: label,
//         value: "",
//         inputAttrs: {
//             type: "tel"
//         },
//         type: 'input'
//     })
//         .then((r) => {
//             if (r === null) {
//                 log.info('user cancelled in line 19 in main.js')
//                 callback(false)
//             } else {
//                 log.info('result in line 23 in main.js ', r)
//                 callback(r)
//             }
//         })
//         .catch(log.error)
// }
//
// function valid_number(data) {
//     let arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
//     for (let i = 0; i < data.length; i++) {
//         let flag = false
//         for (let j = 0; j < arr.length; j++) {
//             if (data[i] === arr[j]) {
//                 flag = true
//             }
//         }
//         if (!flag) {
//
//             return false
//         }
//     }
//     return true
// }
//
// function checkUrl(str) {
//     let pattern = "^https?:\/\/."
//     if (str.match(pattern)) {
//         log.info("user enter valid url in line 51 in main.js " + str)
//         return true
//     } else {
//         log.error("user enter Invalid url in line 51 in main.js " + str)
//         return false
//     }
// }

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        width: 1200,
        height: 1000,
        icon: __dirname + '/assets/images/bot.png',
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, '/preload.js')
        },
    })

    let menu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            click() {
                mainWindow.webContents.send("Settings")
            }

        },
        // {
        //     label: 'Settings',
        //     submenu: [
        //         {
        //             label: 'OrderBotUrl',
        //             click() {
        //                 title = "OrderBotUrl"
        //                 label = "Url"
        //                 setting_prompt(title, label, function (url) {
        //                     if (checkUrl(url)) {
        //                         mainWindow.webContents.send('getOrderFromUrl', {'getOrderFromUrl': url});
        //                     } else {
        //                         dialog.showErrorBox("warning", "Please enter valid url!")
        //                     }
        //                 })
        //             },
        //         },
        //
        //         {
        //             label: 'Store Number',
        //             click() {
        //                 title = "Store Number"
        //                 label = "Number"
        //                 setting_prompt(title, label, function (num) {
        //                     if (valid_number(num)) {
        //                         mainWindow.webContents.send('storenumber', {'storenumber': num});
        //                     } else {
        //                         dialog.showErrorBox("warning", "Please enter valid number!")
        //                     }
        //                 })
        //             },
        //         },
        //         {
        //             label: "Start On Full Screen",
        //             click() {
        //                 mainWindow.setFullScreen(true)
        //             }
        //         },
        //         {
        //             label: 'Font Size',
        //             click() {
        //                 title = "Font Size"
        //                 label = "Number (range : 80-450)"
        //                 setting_prompt(title, label, function (num) {
        //
        //                     if (valid_number(num)) {
        //                         if (num > 79 && num < 551) {
        //                             mainWindow.webContents.send('FontSize', {'fontsize': num});
        //
        //                         } else {
        //                             dialog.showErrorBox("warning", "Please enter number between 80 to 550!")
        //
        //                         }
        //
        //                     } else {
        //                         dialog.showErrorBox("warning", "Please enter valid number!")
        //                     }
        //                 })
        //             },
        //         },
        // {
        //     label: 'Order Refresh Rate',
        //     click() {
        //         title = "Order Refresh Rate"
        //         label = "Seconds"
        //         setting_prompt(title, label, function (num) {
        //
        //             if (valid_number(num)) {
        //                 num = parseInt(num) * 1000;
        //                 mainWindow.webContents.send('orderRefreshRate', {'orderrefreshrate': num});
        //             } else {
        //                 dialog.showErrorBox("warning", "Please enter valid number!")
        //             }
        //         })
        //     },
        // },
        //     {
        //         label: 'Image Refresh Rate',
        //         click() {
        //             title = "Image Refresh Rate"
        //             label = "Seconds"
        //             setting_prompt(title, label, function (num) {
        //
        //                 if (valid_number(num)) {
        //                     num = parseInt(num) * 1000;
        //                     mainWindow.webContents.send('imageRefreshRate', {'imageRefreshRate': num});
        //                 } else {
        //                     dialog.showErrorBox("warning", "Please enter valid number!")
        //                 }
        //             })
        //         },
        //     },

        {
            label: 'Tools',
            submenu: [
                {
                    label: 'ToggleDevTools',
                    role: 'toggleDevTools',
                },
                {
                    label: 'About',
                    click() {
                        mainWindow.webContents.send("About")
                    }
                },
                {
                    label: "Run at Startup  in Full Screen",
                    click() {
                        mainWindow.setFullScreen(true)
                    }
                },
                {
                    label: 'Exit Fullscreen',
                    click() {
                        if(mainWindow.isFullScreen()){
                            mainWindow.setFullScreen(false)
                        }
                       
                    },
                    accelerator: 'esc',
                    role: 'exitFullscreen'
                },
              
                {
                    
                          label: 'Reload',
                          accelerator: 'CommandOrControl+r',
                          role: 'forceReload',
                        
                },
               
                {
                    label: 'Exit',
                    accelerator: 'CommandOrControl+w',
                    role: 'close',
                } ,
                
                {
                    label: 'Minimize',
                    click() {
                            mainWindow.minimize()
                         },
                    accelerator: 'Down',
                    role: 'Minimize'
                }
               
            ]
        }
    ])
    Menu.setApplicationMenu(menu);
    mainWindow.loadFile('index.html');
}


function sendRequest(data) {
    console.log(JSON.stringify(data))
    var options = {
        'method': 'POST',
        // 'url': 'https://thestuff.io/api/1.1/wf/heartbeat',
        'headers': {
            'Content-Type': 'application/json'
        },
        agentOptions: {
            rejectUnauthorized: false
        },
        body: JSON.stringify(data)

    };
    request(options, function (error, response) {
        // if (error) throw new Error(error);
        if(response){
            console.log(response.body);
        }
    });


}


app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
            log.info("window create successfully in line 198 in main.js")
        }
    })
})

app.on('browser-window-created', (event) => {
    // let data = {
    //         "message": "App Is Start, please wait we are fetching Store Number",
    //         "live": "yes",
    //         "date": date
    //
    //     }
        // sendRequest(data)

    }
)

app.on('browser-window-focus', () => {
        // let data = {
        //     "message": "App Is Started Running ",
        //     "live": "yes",
        //     "storenumber": StoreNumber,
        //     "date": date
        //
        // }
        // sendRequest(data)
    }
)

app.on('before-quit', (event) => {
    // let data = {
    //     "message": "App Is Quit ",
    //     "live": "no",
    //     "storenumber": StoreNumber,
    //     "date": date
    //
    // }
    // sendRequest(data)
    // event.preventDefault()
});

app.on('browser-window-blur', () => {
        // let data = {
        //     "message": "App Is Running in background ",
        //     "live": "yes",
        //     "storenumber": StoreNumber,
        //     "date": date
        //
        // }
        // sendRequest(data)
    }
)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

setInterval(function () {
    console.log(position_number)
    var time = new Date();
    var dd = time.getUTCDate()
    var mm = time.getUTCMonth() + 1;
    var yyyy = time.getUTCFullYear();
    var min = time.getUTCMinutes()
    var hours = time.getUTCHours()
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;
    var FinalTime = hours + ':' + min + ' ' + ampm;
    var date = mm + "/" + dd + "/" + yyyy + " " + FinalTime
    console.log(date)
    let data = {
        "storenumber": StoreNumber,
        "date": date,
        "position":position_number
    }
    sendRequest(data)
}, 600000)