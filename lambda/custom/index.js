'use strict';
const Alexa = require("alexa-sdk");
const Particle = require('particle-api-js');

const publishName = "patriot";
//const deviceId = "<your photon device id>";
var token;

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

/* Helper methods */
function log(title, msg) {
  console.log('**** ' + title + ': ' + JSON.stringify(msg) + '\n');
}

var handlers = {
    'LaunchRequest': function () {
      log('Launch', 'Saying hello');
        this.emit('SayHello');
    },
    'SayHello': function () {

        this.response.speak('You can tell me to turn on or off the light')
                     .cardRenderer('my photon', 'You can tell me to turn on or off the light');
        this.emit(':responseReady');
    },
  'TurnOnIntent': function () {
      log('Turn On', 'Turn on intent calling publish');
      let token = event.session.user.accessToken;
      publish(publishName, "blue:100", token);
    this.response.speak('Ok, the light is now on')
      .cardRenderer('Turn On', 'The Photon blue LED has been turned on');
    this.emit(':responseReady');
  },
  'TurnOffIntent': function () {
    log('Turn Off', 'Turn off intent calling publish');
    let token = event.session.user.accessToken;
    publish(publishName, "blue:0", token);
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

function publish(name, data, token) {
  let args = { name: name, data: data, auth: token, isPrivate: true };
  return particle.publishEvent(args).then(function(response){
    let result = response.body.ok;
    return result;
  });
}
