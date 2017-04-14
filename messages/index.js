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
        session.beginDialog('/getname');
    },
    function(session, results) {
        session.send('Hi %s, as you know, I am here to represent Martin as he is very lazy and anti-social.', session.userData.name);
    }
]);

intents.matches('ChangeName', [
    function (session) {
        session.beginDialog('/getname');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.matches('GetJob',[
    function (session) {
        session.send('I currently work at Microsoft as data insights consultant. Want to know more?');
    },
    function (session, results) {
        session.send('I focus on advanced analytics - so topics like machine learning and deep learning. Sounds fancy, right?');
    }
]);
intents.matches('GetLocation', builder.DialogAction.send('I am in Munich, Germany. We have lots of beer and schnitzel.'));

bot.dialog('/getname', [
    function (session) {
        builder.Prompts.text(session, 'Hi... I am here to represent Martin as he is very lazy and anti-social. What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);
// intents.onDefault(builder.DialogAction.send("I'm sorry - I am only allowed to talk about Martin."));
intents.onDefault((session) => {
    session.send('I`\'m sorry - I am only allowed to talk about Martin. \'%s\'.', session.message.text);
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

