# Cursor AI Demo Guide

## 1. Opening the Project
1. Open the **HTML_CSS_JS** folder.
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
4. Enter a name (e.g., **Bicep**) and press **Enter**.
5. Now, test the difference:
   - Ask: **"How do I use the Bicep Kubernetes extension?"**
     - The response might be outdated as the model was trained on **Oct 2023** data.
   - Now, try: **"@Bicep How do I use the Bicep Kubernetes extension?"**
     - This will provide updated instructions based on indexed documentation.

📌 **Reference Links:**
- [Bicep Documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/)
- [Bicep Kubernetes Extension](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-kubernetes-extension)

---

## 4. Tab & Cursor Prediction
### Goal: Use AI-assisted autocomplete for coding.

1. Start adding a **new feature** to play a sound when the mole gets whacked.
2. Type:  
   ```javascript
   function playBeep()
