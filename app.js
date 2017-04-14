var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Setup intents
//var intents = new builder.IntentDialog();
//bot.dialog('/', intents);

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/ce5c4d91-784e-457a-a09b-f27c9fa88d8e?subscription-key=b46b563f753f4af3a63e3441ccfb0417&timezoneOffset=0.0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);



//=========================================================
// Bots Dialogs
//=========================================================

// intents.matches(/^change name/i, [
//     function (session) {
//         session.beginDialog('/profile');
//     },
//     function (session, results) {
//         session.send('Ok... Changed your name to %s', session.userData.name);
//     }
// ]);

// intents.onDefault([
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.beginDialog('/profile');
//         } else {
//             next();
//         }
//     },
//     function (session, results) {
//         session.send('Hello %s!', session.userData.name);
//     }
// ]);

// bot.dialog('/profile', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function (session, results) {
//         session.userData.name = results.response;
//         session.endDialog();
//     }
// ]);

// Add intent handlers
dialog.matches('GetJob',[
    function (session) {
        builder.DialogAction.send('I currently work at Microsoft as data insights consultant.');
    }
]);
dialog.matches('GetLocation', builder.DialogAction.send('Getting Location'));
dialog.onDefault(builder.DialogAction.send("I'm sorry - I am only allowed to talk about Martin."));

