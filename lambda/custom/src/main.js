/**
 * main.js
 *
 * Handles incoming events from Alexa Custom Skill APIs
 *
 * 12/7/17 Initial files.
 */
"use strict";

const Alexa = require("alexa-sdk");
const activity = require('src/activity');
const device = require('src/device');
const yesno = require('src/yesno');
const help = require('src/help');

/**
 * Main entry point.
 *
 * Incoming events from Alexa custom skill are processed via this method
 * after having configuration info injected by index.js and passed in via the config argument
 *
 * @param event   passed by Alexa API
 * @param context passed by Alexa API
 * @param config  configuration info
 */

exports.handler = function(event, context, config) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.appId = config.AppId;
    alexa.execute();
};

const handlers = {
    "LaunchRequest": function () {
        help.handle.call(this);
    },
    "DoActivityIntent": function () {
        activity.setActivity.call(this);
    },
    "DeviceOnIntent": function () {
        device.setDevicePercent.call(this, 100);
    },
    "DeviceOffIntent": function () {
        device.setDevicePercent.call(this, 0);
    },
    "DevicePercentIntent": function () {
        let percent = this.event.request.intent.slots.percent.value;
        device.setDevicePercent.call(this, percent);
    },
    "SessionEndedRequest" : function() {
        console.log("Session ended with reason: " + this.event.request.reason);
    },
    "AMAZON.StopIntent" : function() {
        this.response.speak("Bye");
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent" : function() {
        help.handle.call(this);
    },
    "AMAZON.CancelIntent" : function() {
        this.response.speak("Bye");
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent" : function() {
        yesno.handleYes.call(this);
    },
    "AMAZON.NoIntent" : function() {
        yesno.handleNo.call(this);
    },
    "Unhandled" : function() {
        help.unhandled.call(this);
    }
};

