'use strict';

function handleYes() {
    this.response.speak("Ok, I heard you say 'yes'")
    this.emit(":responseReady");
}

function handleNo() {
    this.response.speak("Ok, I heard you say 'no'")
    this.emit(":responseReady");
}

module.exports = {
    handleYes: handleYes,
    handleNo: handleNo
};
