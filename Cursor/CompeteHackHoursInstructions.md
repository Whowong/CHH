# Cursor AI Demo Guide
## Pre-Req
1. Install Cursor - https://www.cursor.com/ - Free version is sufficient

## 1. Opening the Project
1. Open the **HTML_CSS_JS** folder in Cursor.
   - This repository contains multiple hacks, so ensure you are working in the correct folder.
2. Cursor AI should prompt you to open the repository.
   - Click **Yes** to proceed.

---

## 2. Chat & Codebase Answers
### Goal: Understand how chat interacts with the indexed codebase.

1. Open the **Chat side window** using `Ctrl + I`.
2. Ensure you are on the **Chat** tab (not **Composer** or **Bug**).
3. Ask: **"What does this app do?"** and compare:
   - **Press Enter** → Provides a general response.
   - **Press Ctrl + Enter** → Uses the indexed codebase for a more precise answer.
4. **Best practice**: Keep all files closed while testing for a clear comparison.

---

## 3. Referencing Documentation
### Goal: Use indexed documentation for more accurate responses.

1. Open **Settings** (gear icon on the top right).
2. Navigate to the **Features** section.
3. Scroll down to **Docs** and click **Add new doc**.
4. Paste the Bicep Documentation from below **Enter**.
5. Enter Bicep as the name then **Confirm**
6. Now, test the difference:
   - Ask: **"How do I use the Bicep Kubernetes extension?"**
     - The response might be outdated as the model was trained on **Oct 2023** data.  You will likely find information on creating a cluster which has been supported.
   - Now, try: **"@Bicep How do I use the Bicep Kubernetes extension?"**
     - This will provide updated instructions based on indexed documentation.  Notice how it mentions enabling the experimental feature which you will also find in the documentation.

📌 **Reference Links:**
- [Bicep Documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/)
- [Bicep Kubernetes Extension](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-kubernetes-extension)

---

## 4. Tab & Cursor Prediction
### Goal: Use AI-assisted autocomplete for coding.

1. Start adding a **new feature** to play a sound when the mole gets whacked.
2. Type the folling into the script.js file above the first function:  
   ```javascript
   function playBeep()
   ```
   - See if Cursor AI autocompletes the function.  It does not have to get everything perfectly correct but if most of it is in the right direction we can accept and update.
   - If not, **nudge** it by adding more of the expected function you can reference below.
3. In the event the autocomplete is not correct, go back and nudge it back in the right direction.  See if it start noticing the pattern.
4. Go to the Whack function and move the cursor to it.  Cursor should recommend the playBeep function to be called when a whack is confirmed.

#### Expected Function:
```javascript
function playBeep() {
    const beep = new Audio("C:\\Windows\\Media\\chimes.wav");
    beep.play();
}
```

---

## 5. Cmd + K (Local Edits)
### Goal: Quickly generate code changes within the current file.

1. Press `Cmd + K` (Mac) or `Ctrl + K` (Windows) when you are on the index.html file
2. Enter the prompt:  
   - **"Add an emoji as the logo for the game"**
3. Review the suggested changes and apply them.  Notice that the suggestions are only in the area you are in.

---

## 6. Terminal Cmd + K (Folder-Wide Edits)
### Goal: Automate bulk edits across multiple files. Help with terminal commands that you may not remember such as pattern matching.

1. Open the **terminal**.
2. Press `Ctrl + K` to open the command popup.
3. Enter:  
   - **"Replace all instances of 'mole' with 'gopher' in this folder"**
4. Cursor AI should generate a command suggestion.
5. Press **Enter** to execute the change.

---

## 7. Composer (Adding a Restart Button)
### Goal: Use AI to implement a new feature.

1. Open **Composer** (`Ctrl + I`) and switch to the **Composer** tab.
2. Enter the prompt:  
   - **"Add a game restart button so I can play again"**
3. Composer will suggest multiple changes.
4. Review and apply the suggested updates.

---

## 8. Agent Mode (Converting to a Python Web App)
### Goal: Use Agent Mode to explore app transformation.

1. Open a **fresh chat**.
2. Toggle **Agent Mode**.
3. Enter the prompt:  
   - **"This is currently a basic HTML site, can we convert it to a Python web app and host it separately?"**
4. Observe how the agent:
   - Analyzes the application.
   - Suggests changes across multiple files.
   - Asks if you want to **deploy**.
5. You are not required to accept all changes, this is more to understand how Agent mode interacts.

---

## 9. AI-Generated Commit Message
### Goal: Use AI to summarize changes for version control.

1. Open the **Source Control tab** (Git branch icon).
2. Locate the comment box.
3. Click the **sparkle icon ✨** next to it.
4. Cursor AI will generate a commit message summarizing your changes.
5. Review and commit your updates.

---
