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

// "Hi... I am here to represent Martin as he is very lazy and anti-social.

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/ce5c4d91-784e-457a-a09b-f27c9fa88d8e?subscription-key=b46b563f753f4af3a63e3441ccfb0417&timezoneOffset=0.0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);



//=========================================================
// Bots Dialogs
//=========================================================

// Add intent handlers
dialog.matches('Intro', [
    function(session) {
        session.beginDialog('/getname');
    },
    function(session, results) {
        session.send('Hi %s, as you know, I am here to represent Martin as he is very lazy and anti-social.', session.userData.name);
    }
]);

dialog.matches('ChangeName', [
    function (session) {
        session.beginDialog('/getname');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

dialog.matches('GetJob',[
    function (session) {
        session.send('I currently work at Microsoft as data insights consultant. Want to know more?');
    },
    function (session, results) {
        session.send('I focus on advanced analytics - so topics like machine learning and deep learning. Sounds fancy, right?');
    }
]);
dialog.matches('GetLocation', builder.DialogAction.send('I am in Munich, Germany. We have lots of beer and schnitzel.'));

bot.dialog('/getname', [
    function (session) {
        builder.Prompts.text(session, 'Hi... I am here to represent Martin as he is very lazy and anti-social. What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);
dialog.onDefault(builder.DialogAction.send("I'm sorry - I am only allowed to talk about Martin."));


// dialog.matches(/^say something else/i, [
//     function (session) {
//         session.beginDialog('/changesentence');
//     },
//     function (session, results) {
//         session.send('Ok, I will say the following sentence from now on: %s', session.userData.sentence);
//     }
// ]);

// dialog.onDefault([
//     function (session, args, next) {
//         if (!session.userData.sentence) {
//             session.beginDialog('/changesentence');
//         } else {
//             next();
//         }
//     },
//     function (session, results) {
//         session.send(session.userData.sentence);
//     }
// ]);

// bot.dialog('/changesentence', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi, I am version 2.0 of the Microsoft Chatbot! I am already a lot smarter now! What would you like me to say?');
//     },
//     function (session, results) {
//         session.userData.sentence = results.response;
//         session.endDialog();
//     }
// ]);


// dialog.matches(/^hi/i, [
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.send(session, 'Hi... I am here to represent Martin as he is very lazy and anti-social. What is your name?');
//         } else {
//            session.send(session, 'Hi %s, as you know, I am here to represent Martin as he is very lazy and anti-social.', session.userData.name);
//         }
//     },
//     function (session, results) {
//         session.userData.name = results.response;
//         session.endDialog();
//     }
// ]);

// dialog.matches(/^change name/i, [
//     function (session) {
//         session.beginDialog('/profile');
//     },
//     function (session, results) {
//         session.send('Ok... Changed your name to %s', session.userData.name);
//     }
// ]);

// dialog.onDefault([
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





