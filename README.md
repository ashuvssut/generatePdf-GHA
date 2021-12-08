# generatePdf-GHA

This GitHub Action is used by me to generate my Resume PDF using web-scraping (puppeteer) and then update my Resume pdf present in the [Resume Repository](https://github.com/ashuvssut/ashuvssut-resume/tree/download).
After Updating my Resume PDF, I can share my Resume PDF to anyone.

This GitHub action will work everytime I update and push my Resume to my Resume Repository.

The `workflow.yml` file I use in Resume Repo:
```yml
name: GeneratePDF

on:
  push:
    branches:
      - main

jobs:
  generate_pdf:
    runs-on: ubuntu-latest

    steps:
      - name: Use Node.js v15.x
        uses: actions/setup-node@v2
        with:
          node-version: 15.x

      - name: Generate PDF Action
        uses: ashuvssut/generatePdf-GHA@v1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}

```

**As of now, this Action can't be used by other people.**
But to use this action to generate you own PDF, you need to fork this, edit four variables present in `src/action.js`. Those four variables are:
- OWNER
- REPO
- BRANCH
- PDF_PATH

after doing this, you have created your own action that only works for your repo.

I am really sorry I was very lazy to put code to get these variable automatically and through workflow env variables.

If you want to contribute to this issue:
It is very easy: 
- use @action/core for OWNER and REPO variables
- we can use workflow env variables for BRANCH and PDF_PATH variables

Make the PR! I will be ready to help you out if you get stuck :)

Thankyou for reading this out!

