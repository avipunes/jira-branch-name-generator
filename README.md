# jira-branch-name-generator
Tampermonkey script for creating branch name out of the jira id and name.

# Installaion
* Download Tampermonkey [here](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
* once installed, open the app `Dashboard`

  ![Dashboard](./1.PNG "Dashboard")

* click on `Utilities` on the top right hand side

  ![Utilities](./2.PNG "Utilities")

* paste the raw url `https://raw.githubusercontent.com/avipunes/jira-branch-name-generator/master/jira-branch-name-generator.js` at the import from URL section

  ![Import from URL](./3.PNG "Import from URL")
  
* and click `Install`

  ![Install](./4.PNG "Install")
  
* go to jira story and you will see the `Create branch name` button next to the jira id

  ![Create branch name](./5.PNG "Create branch name")

  ![Create branch name](./6.PNG "Create branch name")

now the the branch name is in your clipboard: `PAP-252-some-story-name`
