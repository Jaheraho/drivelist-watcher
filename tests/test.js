const DrivelistWatcher = require('./driverlist-watcher')

let drivelistWatcher = new DrivelistWatcher({
    callbackDeviceAdded: callbackDeviceAdded,
    callbackDeviceRemoved: callbackDeviceRemoved,
    intervalTime: 500
})

function callbackDeviceAdded (drives, letterOfAddedDevice, descriptionOfAddedDevice) {
    console.log('added device: ', letterOfAddedDevice, ',', descriptionOfAddedDevice)
}

function callbackDeviceRemoved (drives, letterOfRemovedDevice, descriptionOfRemovedDevice) {
    console.log('removed device: ', letterOfRemovedDevice, ',', descriptionOfRemovedDevice)
}