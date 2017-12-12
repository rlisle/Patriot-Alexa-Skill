'use strict';

var config = {

    /**
     * Alexa Smart Home skill id
     */
    AppId           : '<your-skill-id-here>',

    /**
     * In the future this may be programmable from the device and
     * exposed as a variable, but for now just use a fixed name.
     */
    EventName       : 'patriot',

    PublishEndPoint : 'https://api.particle.io/v1/devices/events'

};
module.exports = config;
