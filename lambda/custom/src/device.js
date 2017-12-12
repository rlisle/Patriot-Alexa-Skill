'use strict';
const particle = require('src/particle');

/**
 * Set Device Percent for a specified activity
 * @param percent
 */
function setDevicePercent(percent)
{
    console.log("Request setDevicePercent: " + JSON.stringify(this));

    // Get token value
    let token = this.event.session.user.accessToken;
    if(token === undefined) {
        this.response.speak("Sorry, you must link this skill to your particle.io account before using it. "
            + "Create a free particle.io account that you can log into. "
            + "Then reinstall this skill, and log into your particle.io account when prompted.");
        this.emit(":responseReady");
    }

    // Get device slot value
    const {event: {request: {intent: {slots: {device: {value: device } = {} }}}}} = this;
    if(device === undefined) {
        //TODO: Prompt the user for the device name
        this.response.listen("Sorry, I didn't recognize the device name. Please tell me again");
        this.emit(":responseReady");
    }

    // Get activity slot value
    const {event: {request: {intent: {slots: {activity: {value: activity } = {} }}}}} = this;
    if(activity === undefined) {
        //TODO: Prompt the user for the activity name
        this.response.listen("Sorry, I didn't recognize the activity name. Please tell me again");
        this.emit(":responseReady");
    }

    // Locate the device
    particle.getDeviceIdForDevice(device, token).then((deviceId) => {

        if(deviceId == undefined) {
            this.response.speak("Sorry, device ID error");
            this.emit(":responseReady");

        } else {
            // Send device:activity:compare:value:percent string
            let argument = device + ":" + activity + ":>:0:" + percent;
            let functionName = "program";
            particle.callFunction(deviceId, functionName, argument, token).then((result) => {
                console.log("Called function, response = " + result);
                this.response.speak("Ok, from now on when you say '" + activity + "' I will set " + device + " to " + percent + " percent");
                this.emit(":responseReady");
            }, (err) => {
                console.log("Error from function call: " + JSON.stringify(err));
                this.response.speak("Sorry, there was an error with the particle.io API: "+err);
                this.emit(":responseReady");

            });
        }
    })
}


module.exports = {
    setDevicePercent: setDevicePercent
};
