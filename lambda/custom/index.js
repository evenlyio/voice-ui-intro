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
    'RaiseShieldsIntent': function () {
        
        if (this.event.request.intent.slots["percent"]) {
            let percent = this.event.request.intent.slots.percent.value;
            if (percent >= 100) {
                this.response.speak('Shields are at maximum, Captain!')
                             .cardRenderer('Shields are at maximum, Captain!', 'Shield status 100%.');    
            } else {
                this.response.speak('Shields are at' + percent + ' percent, Captain!')
                             .cardRenderer('Shields are up, Captain!', 'Shield status' + percent + '%.');    
            }            
        } else {
        
            this.response.speak('Shields are up, Captain!')
                         .cardRenderer('Shields are up, Captain!', 'Shield status 100%.');
        }
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
        this.response.speak("Captain, I can raise the shields. Say: 'Raise shileds' to put up the shields");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, open enterprise'");
    }
};
