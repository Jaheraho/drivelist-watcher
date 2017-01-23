drivelist-watcher
=================

setting callbacks that fires when a device is added or removed

Installation
------------

```sh
$ npm i --save drivelist-watcher
```

Examples
------------

```js
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
```


Support
-------

If you're having any problem or question or improvement-suggestion feel free [raise an issue](https://github.com/jaheraho/drivelist-watcher/issues/new)

License
-------

The project is licensed under the MIT license.