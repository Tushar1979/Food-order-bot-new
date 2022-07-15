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


let dateObj = new Date();
let folder_name = dateObj.getDate() + "-" + dateObj.getDay() + "-" + dateObj.getFullYear();
log.transports.file.resolvePath = () => path.join(local_directory + main_folder + folder_name, 'logs/main.log');

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
                    visible: false,
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
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

setInterval(function () {
   
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
 
    let data = {
        "storenumber": StoreNumber,
        "date": date,
        "position":position_number
    }
    sendRequest(data)
}, 600000)