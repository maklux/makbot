# makbot
Chatbot developed in Node.js, powered by LUIS and Microsoft Azure.

LUIS: https://www.luis.ai
Chatbot: https://dev.botframework.com/ 
Azure: https://ms.portal.azure.com/ 

## Tutorial
Consider this a quick start guide to building a simple chatbot with Microsoft.
Difficulty level: beginner.

What we will build: a simple web embeded chatbot that uses advanced machine learning techniques for language understanding (LUIS). 

### What you need
- Azure subscription. Get yours here (incl. free spend for first time users): https://azure.microsoft.com/en-us/free/
- Text editor of your choice. Visual Studio 2017 or similar. I recommend Visual Studio Code https://code.visualstudio.com/
- LUIS account: https://www.luis.ai
- Bot services account: https://ms.portal.azure.com/ 
- Git repository: https://github.com/

### Where to begin
1. (If not already present) Install Visual Studio Code (VSC).
2. (If not already present) Get an Azure subscription and log into the Azure portal.
3. Within the Azure portal, create a new bot service and Microsoft app ID. Follow the tutorial linked below. Note: In step 3, select Node.js and the language understanding template. Within this step, you will also create your LUIS account, which will be directly linked to your bot service and app account.
- https://docs.botframework.com/en-us/azure-bots/build/first-bot/
4. We will be working with continuous integration; this links your bot directly to your git repository of choice - automatically updating the live bot with ever change you commit to the repo. To do this, first create a git repository and then follow the following instructions: 
- https://docs.botframework.com/en-us/azure-bot-service/manage/setting-up-continuous-integration/
5. Now that your bot is set up, you can start personalizing it and building conversations. Make sure to open your repository in VSC, so that you can directly push and pull changes.
6. Get an understanding of the structure of bot conversions by reading throught the following documentation:
- UniversalBot (Brain): https://docs.botframework.com/en-us/node/builder/chat/UniversalBot/
- Dialogs: https://docs.botframework.com/en-us/node/builder/chat/dialogs/
- Session: https://docs.botframework.com/en-us/node/builder/chat/session/
- Prompts: https://docs.botframework.com/en-us/node/builder/chat/prompts/
- IntentDialog: https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/
 
 To be completed.

## Additional Material
- See further examples here: https://github.com/Microsoft/BotBuilder/tree/master/Node/examples

## Why
You may be wondering why I wrote this quick start guide. The answer is simple: there are a lot of great guides out there, yet many are already outdated or do not show the whole picture for this, simple, use case. With this tutorial I hope to enable you to build a working bot in not more than 1 hour.

#### Disclaimer: these are my personal opinions and learnings, they do not represent Microsoft. Same goes for any recommendations I make in terms of frameworks, tools and services.