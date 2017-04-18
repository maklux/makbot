/*-----------------------------------------------------------------------------
This is a simple implementation of LUIS within the Microsoft Bot Framework. 
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

// Declare emulator for testing
var useEmulator = (process.env.NODE_ENV == 'development');

// Microsoft App Connector Setup
var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

// Initiate Bot
var bot = new builder.UniversalBot(connector);

// LUIS API Connection Setup
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';
const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

// Start Dialogue
bot.dialog('/', intents);   

// ***Add intent handlers
// Introduction
intents.matches('Intro', [
    function(session) {
        session.send('Hi stranger! What do you want to know about me?');
    }
]);
// Response to GetJob
intents.matches('GetJob',[
    function (session, args, next) {
        session.send('I currently work at Microsoft as data insights consultant.');
        session.beginDialog('/more');
    },
    function (session, results) {
        if (results.response == 'yes') {
            session.send('I focus on advanced analytics - so topics like machine learning and deep learning. Sounds fancy, right?');
        } else {
            session.send('Okay, not here to make friends anyway.');
        }
    }
]);
//Response to GetLocation
intents.matches('GetLocation', [
    function (session) {
          session.send('I am based in Munich, Germany but my work takes me around Europe, and sometimes even beyond.');
          session.beginDialog('/more');
    },
    function (session, results) {
        if (results.response == 'yes') {
            session.send('I moved here in January 2017 for my job at Microsoft.');
        } else {
            session.send('Okay. What else do you want to know?');
        }
    }
]);
//Response to GetName
intents.matches('GetName', [
    function (session) {
          session.send('I am surprised you found this website without knowing my name, but here you go : Martin Antoine Kayser.');
    }
]);
//Response to GetOrigin
intents.matches('GetOrigin', builder.DialogAction.send('I am from Luxembourg, Luxembourg.'));
//Response to Exit
intents.matches('Exit', [
    function(session) {
        session.send('Okay, bye I guess.');
    }
]);

//Additional Dialogue
bot.dialog('/more', [
    function (session) {
        builder.Prompts.text(session, 'Want to know more?');
    }
])

//Catch for unknowns
intents.onDefault((session) => {
    session.send('I\'m sorry - I am only allowed to talk about myself. \'%s\'.');
}); 


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

/*
TODO :
- Prompt to send email
- Store conversations
- Prompt to submit questions  
*/