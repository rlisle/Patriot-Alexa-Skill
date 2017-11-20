'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'SayHello': function () {
        this.response.speak('You can tell me to turn on or off the light')
                     .cardRenderer('my photon', 'You can tell me to turn on or off the light');
        this.emit(':responseReady');
    },
  'TurnOnIntent': function () {
    this.response.speak('Ok, the light is now on')
      .cardRenderer('Turn On', 'The Photon blue LED has been turned on');
    this.emit(':responseReady');
  },
  'TurnOffIntent': function () {
    this.response.speak('Ok, the light is now off')
      .cardRenderer('Turn Off', 'The Photon blue LED has been turned off');
    this.emit(':responseReady');
  },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak('You can tell me to turn on or off the light');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};
