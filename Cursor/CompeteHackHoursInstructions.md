I recommend opening the HTML_CSS_JS Folder as there are other hacks in this repo.  Cursor should prompt if you want to open the repo, you can say yes.


- Chat/Codebase Answers - Ctrl + I to open Chat side window.  Make sure you are on the Chat Tab and not Composer or Bug. Chat and ask "What does this app do?", notice the difference when you use the standard(enter) vs with codebase(ctrl + enter) which leverages the indexed codebase.  Best experience is with no files open to show the comparison.


- Referencing Documentation - We are going to show here the benefits of chatting while having Docs indexed.  To add the docs, you can go to settings which is the gear on the top right.  Then go to the features section.  Scroll down until you see Docs.  Select "Add new doc".  Press Enter and give it a name such as Bicep, then continue.  Go to the Chat and first ask "How do I use the Bicep Kubernetes extension?".  You will see that it talks about installing bicep and then creating a cluster.  This is because the model only has data from Oct 2023 but this feature was in preview Dec 2024.  If you now do "@Bicep How do I use the Bicep Kubernetes extension?" you will see that it mentions how to enable the preview feature and shows the latest information. Please note, if you are following instructions with a model that has newer training data, this exercise may not work.
	- Bicep Documentation URL: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/
	- Feature we will be discussing - https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-kubernetes-extension



- Tab/CursorPrediction - Lets start by adding a new feature to play a sound when the mole gets whacked.  Start by typing function playBeep() and see if it autocompletes.  Nudge it along if you need to.  When typing in a file if it hasn't yet, do single \ and then fix it later.  See how it helps you in that scenario.  Sometimes when going to the whack section a tab comes up, at min you should see the suggestion come up.

function playBeep() {
    const beep = new Audio("C:\\Windows\\Media\\chimes.wav");
    beep.play();
}


- Cmd K - This is something only local to where you are at.  Prompt "Add an emoji as the logo for the game"


- Terminal Cmd K - In your terminal press Ctrl + K to open up a popup.  In there enter "Replace all instances of 'mole' with 'gopher' in this folder".  Cmd K should suggest a command and you can enter again to run it.


- Composer - We currently have to refresh the browser to restart the game.  Lets add a button to allow us to restart the game.  Ask Composer to help us.  Start with going to Composer (Ctrl + I) and ensure you are on the Composer tab.  Then ask "Add a game restart button so I can play again".  Composer will suggest multiple changes in the script.js file to implement the feature.


- Agent - You need to open a fresh chat.  Toggle to agent mode this time.  Prompt: "This is currently a basic html site, can we convert to a python web app and hosted separately?".  You should see how the agent starts to reason what is in the application and slowly start suggesting changes across the application.  It will likely ask if you want to deploy, say "Deploy Locally" and you should see some commands in the terminal to help in that scenario.



- AI Commit Message - After all these changes, go to the source control tab which is the git branch icon.  Next to the box for the comment, click on the sparkle to generate a commit comment for all the awesome things you have done!



