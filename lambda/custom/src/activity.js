'use strict';

const particle = require('src/particle');

function setActivity() {
    console.log("Request setActivity: " + JSON.stringify(this));

    const {event: {request: {intent: {slots: {activity: {value: activity}}}}}} = this;
    const {event: {request: {intent: {slots: {startStop: {value: startStop}}}}}} = this;
    let token = this.event.session.user.accessToken;
    if (token === undefined) {
        this.response.speak("Sorry, you must link this skill to your particle.io account before using it. "
            + "Create a free particle.io account that you can log into. "
            + "Then reinstall this skill, and log into your particle.io account when prompted.");
        this.emit(":responseReady");
    }

    // map startStop to simple 0 or 100
    var percent = 100;
    const startingTerms = ["start", "starting", "begin", "beginning", "commence", "commencing"];
    if (startingTerms.indexOf(startStop) == -1) {
        const stoppingTerms = ["stop", "stopping", "end", "ending", "finish", "finishing", "finished"];
        if (stoppingTerms.indexOf(startStop) == -1) {
            //TODO: prompt user for start or stop, not have to say the whole thing over.
            this.response.speak("Sorry, I didn't understand whether you want to start or stop activity " + activity);
            this.emit(":responseReady");
            return;
        }
        percent = 0;
    }

    // See if activity exists already
    particle.isActivitySupported(activity, token).then((isSupported) => {

        if( isSupported ) {

            // The activity already exists, so go ahead and start/stop it.
            particle.publish(activity + ":" + percent, token).then((result) => {
                console.log("Result = " + JSON.stringify(result));
                this.response.speak("Ok, the activity " + activity + " is now " + (percent == 0 ? 'stopped' : 'started'));
                this.emit(":responseReady");
            }, (err) => {
                console.log("Error from publish: " + JSON.stringify(err))
                this.response.speak("Sorry, there was an error with the particle.io API: " + err);
                this.emit(":responseReady");
            });

        }else{
            console.log("Activity " + activity + " is new and does not exist");

            this.response.speak("The activity " + activity + " is not supported by any of your devices, so there's nothing to do.");
            this.emit(":responseReady");

        }

    });
}

module.exports = {
    setActivity: setActivity
};
