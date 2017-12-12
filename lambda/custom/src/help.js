'use strict';

const text = 'You can start or stop and activity by saying, for example, "tell activity watching TV to start". '+
    'You can also change the devices controlled by an activity by saying, for example, "tell activity washing dishes to turn on sink light".' +
    'Then the next time you start the washing dishes activity, the sink light will also come on';

function handle() {
    this.response.speak(text)
        .cardRenderer("Activity", text);
    this.emit(":responseReady");
}

function unhandled() {
    this.response.speak("Sorry, I didn't get that. " + text);
    this.emit(":responseReady");
}

module.exports = {
    handle: handle,
    unhandled: unhandled
};
