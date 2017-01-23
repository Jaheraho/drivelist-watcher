/**
 * drivelist-watcher
 * watcher for drivelist that fires callbacks on changes in drives (e.g. USB adding/removing)
 * (just checked on windows atm)
 * @version 0.1
 * @date 20.01.2017
 * @author Jaheraho
 */

module.exports = class DrivelistWatcher {

    constructor (options = {}) {

        const drivelist = require('drivelist')
        const _ = require('lodash')

        this.drives = null

        let defaults = {
            callbackDeviceAdded: null,
            callbackDeviceRemoved: null,
            intervalTime: 1000
        }

        //extend options
        this._settings = _.defaults(options, defaults)

        //set interval
        this.interval = setInterval(intervalFn.bind(this), this._settings.intervalTime)

        function intervalFn () {
            drivelist.list(listFn.bind(this))
            function listFn (error, drivesNew) {

                // has anything changed?
                // first run get ignored, because we set drives = null
                if (this.drives && drivesNew && this.drives.length != drivesNew.length) {
                    if (this.drives.length > drivesNew.length) {

                        // if device was removed
                        this._fireCallbackRemovedDevice(drivesNew)
                    } else {

                        // if device was added
                        this._fireCallbackAddedDevice(drivesNew)
                    }
                }
                this.drives = drivesNew
            }
        }
    }

    /**
     * fires the callback for an added device
     * @param drivesNew
     * @private
     */
    _fireCallbackAddedDevice (drivesNew) {

        // when defined -> fire
        if (this._settings.callbackDeviceAdded) {

            // detect added drive
            let addedDevice = drivesNew.filter(function (elm) {
                let found = false

                // check if its existing anywhere
                this.drives.forEach(function (elm2) {

                    // does it already exist?
                    if (JSON.stringify(elm) === JSON.stringify(elm2)) {
                        found = true
                    }
                })

                // if it was not found -> we have found our new device!
                return !found

            }.bind(this))

            // get letter and description of added drive
            // if we can detect -> set null
            let letterOfAddedDevice = null
            let descriptionOfAddedDevice = null
            if (
                addedDevice
                && addedDevice.length > 0
                && addedDevice[0].mountpoints
                && addedDevice[0].mountpoints.length > 0
                && addedDevice[0].mountpoints[0].path
            ) {
                descriptionOfAddedDevice = addedDevice[0].description
                letterOfAddedDevice = addedDevice[0].mountpoints[0].path
            }

            this._settings.callbackDeviceAdded(drivesNew, letterOfAddedDevice, descriptionOfAddedDevice)
        }
    }

    /**
     * fires the callback for a removed device
     * @param drivesNew
     * @private
     */
    _fireCallbackRemovedDevice (drivesNew) {

        //when defined -> fire
        if (this._settings.callbackDeviceRemoved) {

            // detect new drive
            let removedDevice = this.drives.filter(function (elm) {
                let found = false

                // check if its existing anywhere
                drivesNew.forEach(function (elm2) {

                    // does it already exist?
                    if (JSON.stringify(elm) === JSON.stringify(elm2)) {
                        found = true
                    }
                })

                // if it was not found -> we have found our new device!
                return !found

            }.bind(this))

            // get letter and description of removed drive
            // if we can detect -> set null
            let letterOfRemovedDevice = null
            let descriptionOfRemovedDevice = null
            if (
                removedDevice
                && removedDevice.length > 0
                && removedDevice[0].mountpoints
                && removedDevice[0].mountpoints.length > 0
                && removedDevice[0].mountpoints[0].path
            ) {
                descriptionOfRemovedDevice = removedDevice[0].description
                letterOfRemovedDevice = removedDevice[0].mountpoints[0].path
            }

            this._settings.callbackDeviceRemoved(drivesNew, letterOfRemovedDevice, descriptionOfRemovedDevice)
        }
    }

    /**
     * kills the watcher -> needs to init
     */
    killWatcher () {
        clearInterval(this.interval)
    }
}
