/*-----------------------------------------------------------------------------
This is a simple implementation of LUIS within the Microsoft Bot Framework. 
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })

// Add intent handlers
intents.matches('Intro', [
    function(session) {
        session.send('Hi, what do you want to know about me?');
    }
]);

intents.matches('GetJob',[
    function (session, args, next) {
        builder.Prompts.text(session, 'I currently work at Microsoft as data insights consultant. Want to know more?', answer);
        // session.send();
    },
    function (session, results) {
        if (results.response == 'yes') {
            session.send('I focus on advanced analytics - so topics like machine learning and deep learning. Sounds fancy, right?');
        } else {
            session.send('Okay, not here to make friends anyway.');
        }
    }
]);

intents.matches('GetLocation', builder.DialogAction.send('I am in Munich, Germany. We have lots of beer and schnitzel.'));
intents.matches('GetName', builder.DialogAction.send('I am surprised you found this website without knowing my name, but here you go : Martin Antoine Kayser.'));
intents.matches('GetOrigin', builder.DialogAction.send('I am from Luxembourg, Luxembourg.'));

intents.matches('Exit', [
    function(session) {
        session.send('Okay, bye I guess.');
    }
]);
intents.onDefault((session) => {
    session.send('I\'m sorry - I am only allowed to talk about myself. \'%s\'.', session.message.text);
});


bot.dialog('/', intents);    

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}

