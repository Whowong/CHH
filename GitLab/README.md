# Compete Hack Hours Demo: GitLab

## Overview
In this tutorial we will be going over at a high level the features within GitLab.  You will use their planning tools to see how it maps to sprint planning, followed by checking in a sample application and building a pipeline by hand to build and deploy your application to Azure App Service.  Lastly we will see some of the integrated features built into GitLab such as creating a Kubernetes cluster and leveraging their Auto DevOps capabilities. 

## Prerequisites:
-	Level 200 understanding of DevOps as a concept and GitHub
-	Free GitLab Account. The free account credits will cover this exercise, assuming you clean-up.
-	Go to https://about.gitlab.com/free-trial/ 
-	Select “Continue with SaaS” 
-	Enter your information (Name, Email, Username, Password) or continue with Google/GitHub account 
-	Confirm account through your email. 
-	GitLab will ask questions about your role and your goals for the trial followed by questions on your company name, number of employees and a telephone number.  Creative information worked in these areas. 
-	You will now be taken to create your first organization/group.  Provide a name and continue. 
-	Your organization is now created, it will prompt you to create your first project.  Provide a name and continue. 
-	A prompt will show that a project called “Learn GitLab - Ultimate trial” is created to show you the features of GitLab, continue to get to the GitLab Interface. 
-	Azure Subscription or Azure account via MSDN
-	GitHub access


## 0 (Optional) – This will be to validate your account for free runners, You can do this in advance or take care of this when you run your pipeline.
1.	On the top left, select the GitLab logo to take you to all the projects.
2.	Select the project you created
3.	You are now in your project home page.  On the left hand side navigator, hover over “CI/CD” then select “Editor”
4.	Select “Create new CI/CD pipeline”
5.	Accept the default file and select “Commit Change” at the bottom.
6.	This will now give you a basic pipeline, on the left hand side under “CI/CD” select “Pipelines”
7.	Select “Run Pipeline”
8.	A prompt to Validate your account should come up.  Select “Validate” then enter your credit card information.  This is only to prevent abuse with Crypto miners, you will not be charged for normal use.
9.	Your pipelines across all projects should be allowed to run now and you are ready for the demo.


## 1 Track your work in project boards

Overview: Here we are going to go over the high level features that can enable you to sprint plan.  We wont go through every single feature but by the end we hope this will help you get an idea of how this could work for your group.

GitLab/Agile Lingo Map - Below is a lingo map to translate agile terminology to the respective GitLab feature so that you can leverage their tools for sprint planning.

|Agile Terminology     | GitLab feature                    |
|----------------------|-----------------------------------|
|User story            |	Issues                         |
|Task	               |  Task lists                       |
|Epic	               |     Epics                         |
|Points and estimation |	Weights                        |
|Product backlog       |Issue lists and prioritized labels |
|Sprint/iteration	   |  Milestones                       |
|Burndown chart	       |  Burndown charts                  |
|Agile board	       |  Issue boards                     |


Please ensure you are using your own project that was created when you setup your trial.  Do not use the "Learn GitLab - Ultimate Trial" project as it is pre-populated with other content that may conflict what what we do here.

1.1	 Go to “menu” at the top of the screen, hover over “Groups” then select “Your Groups”

1.2	 Select your group that you created when you signed up.  This must be used as it has the ultimate license.

1.3	 On the left hand side select “Epic”

1.4	 Select “New Epic” on the top right hand side.

1.5	 Enter a name and description of your Epic.  Then select “Create Epic”

1.6  Go back to you project that you created when you signed up.  You can return by going to the “Menu” then “Project” followed by “Your Projects”

1.7	 Now that you are back in your project, hover over “Issues” and select “Milestones”

1.8	 Select “New Milestone” which will create us a new sprint.

1.9	 Enter a name, start, and end date then click “Create Milestone”

1.10 In this screen you will see your sprint along with any tickets and the burndown/up chart.  

1.11	On the left click on “List”

1.12	On the top right click on “New Issue”

1.13	Fill in the title, description

1.14	Select the epic that you created from the dropdown.

1.15	Select the milestone we just created from the dropdown

1.16	Enter a number under weight.  This represents story points.

1.17	Click “Create Issue”

1.18	If you return to the milestone you can now see the issue tied to the sprint along with the total points in the sprint, burndown charts populating.

1.19	Return to epics and go to roadmap.  You should now see your roadmaps based on epics populating now.

You just finished the first section, hopefully this gave you a taste of how you could use GitLab to plan your sprints.

## 2.	Centralize code with GitLab Repos

Overview: Here we plan to walk through checking out and checkin in your code with GitLab.  If you have experience with Github this should feel very familiar as they behave very similarily.

2.1	Go to your project, on the left hand side, select “Repository”

2.2	Select the “Clone” button on the top right and choose your preference for cloning the repository.  We will continue here by copying the https url.

2.3	Clone the repository locally

2.4	Checkin the code/IAC templates from the Application.zip

We just finished the second section, at this point we should have a project with the application source code checked in.

## 3.	Continuous Integration

Overview: Now that we have code checked in, lets start working on our pipeline.  We will first focus on building our app first(Continuous Integration).  Later we will build upon the pipeline that we start with here.

3.1	Go to CI/CD section then “Editor”.  This is your pipeline editor.

3.2	Replace your template with the following:

```
image: mcr.microsoft.com/dotnet/core/sdk:latest

stages:          # List of stages for jobs, and their order of execution
  - build

build-job:       # This job runs in the build stage, which runs first.
  stage: build
  rules:
    - if: $CI_MERGE_REQUEST_IID
    - if: $CI_COMMIT_BRANCH == 'main'
      changes:
        - Application/**/*
  script:
    - echo "Starting to build the application"
    - dotnet restore ./Application/src/RazorPagesTestSample/RazorPagesTestSample.csproj
    - dotnet build --no-restore ./Application/src/RazorPagesTestSample/RazorPagesTestSample.csproj
    - dotnet test --no-build --verbosity normal ./Application/tests/RazorPagesTestSample.Tests/RazorPagesTestSample.Tests.csproj
```
3.3	You can now run the pipeline and this will build your application only when you make a change to the application directory.  If you have not validated your account from step 0, you will now be prompted to enter your credit card information for validation.  This is GitLabs way of ensuring there is no abuse from crypto mining.

At the end of this section you should now be able to build your code that you checked in through the pipeline.  Lets extend the pipeline in the next few sections.

## 4.	Build and push docker image to container registry

Overview: Building upon the pipeline we are going to take it a step further and build a docker container then store it in the GitLab container registry.

4.1	Return back to the pipeline editor.  Go to CI/CD section then “Editor”. 

4.2	Update your template with the following:

4.2.1	Add an additional stage, your stages section should look like this:
```
stages:   
  - build
  - dockerBuild
```

4.2.2	Copy and add this job to the end of your file.  
```
docker-build-job:   
  stage: dockerBuild   
  image: docker:stable
  only:
    changes:
      - Application/**/*
  except:
    - merge_requests
  services:
  - docker:dind 
  script:
    - echo "Building Docker Container"
    - docker login registry.gitlab.com/$CI_PROJECT_NAMESPACE -u $CI_REGISTRY_USER  -p $CI_REGISTRY_PASSWORD 
    - docker build -t registry.gitlab.com/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/razorpagestestsample -t registry.gitlab.com/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/razorpagestestsample:$CI_COMMIT_SHA ./Application/src/RazorPagesTestSample
    - docker push registry.gitlab.com/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/razorpagestestsample
```

4.3	You can now run another pipeline which will build your code and push your container.  To verify this, after the pipeline completes, look for your container under "Packages & Registries" then "Container Registry".

Awesome, as a checkpoint you should now have a pipeline that is building the application, creating a container, and storing it in the container registry.  If everything looks good lets continue on this journey.  

To add some additional context for our pipeline we copied in.  You can see that we leveraged multiple variables so that it could be copied and pasted easily.  The registry URL for example needed your project group/namespace and project name which will be unique for all of you.  Using these pre-defined variables you can not worry about these URLs if you were to share this job as we did here.  For a full list of pre-defined variables you can use, please go here: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html

## 5.	Infrastructure as code

Overview: We now have our application built in a container and stored in our container registry.  Now lets move on to infrastructure as code so we can create our infrastructure in Azure that we will deploy to.

5.1	First we need an Azure SP for our pipeline automation.

  5.1.1	In Azure Portal go to “App Registrations”

  5.1.2	Select “New Registration” on the top left.

  5.1.3	Enter a name for your app registration and click “Register”

  5.1.4	After the app registration is created, on the left hand side go to “Certificates & Secrets”

  5.1.5	Click on “New Client Secret”.  You can set the secret date range for how long its valid.  We recommend the minimum needed, so it can just be today.

  5.1.6 Save the secret value as it will be needed shortly. You will also need your Application (client) ID and Directory (Tenant) ID which is located on your app registration overview.

5.2	We now need to grant contributor access to the App Registration

  5.2.1	Go to your subscription you plan on creating the resource group in.

  5.2.2	On the left hand side, select “Access Control (IAM)”

  5.2.3	On the main screen select “Add” followed by “Add Role Assignments”

  5.2.4	Select “Contributor” then “Next”

  5.2.5	Select “Select members” and enter the name of your App Registration and select the name.  Then press “Select”

  5.2.6	Select “Review + assign” at the bottom of the screen.

5.3	We will now add the SP to the variables in GitLab.  While in the project go to “Settings” then “CI/CD”

5.4	Go to the section called “Variables” then expand by clicking the “Expand” button on the right hand side.

5.5	Select “Add Variable” at the bottom.

5.6	Enter the following for the keys and enter the respective values.  If they are sensitive, ensure the “Mask Variable” checkbox is checked.  Once completed, select “Add Variable”

  5.6.1	AZSPLogin – Application (Client) ID

  5.6.2	AZSPPassword – Secret Value

  5.6.3	AZSPTenant – Directory ID/Tenant

  5.6.4	AZResourceGroup – Name of resource group you want to create/use

  5.6.5	AppServiceName – Name of your app service

5.7	We are now going to return to the pipeline editor. Go to CI/CD section then “Editor”.  

5.8 We will now update your template with the following:

  5.8.1	Replace the stages section with the following:

    
    stages:   
      - buildAzureEnvironment       # List of stages for jobs, and their order of execution
      - build
      - dockerBuild
  


  5.8.2	Add the following Job at the end.  


  
    buildAzureEnvironment-job:      
      stage: buildAzureEnvironment 
      image: mcr.microsoft.com/azure-cli
      when: manual
      
      script:
        - az login --service-principal -u $AZSPLogin -p $AZSPPassword --tenant $AZSPTenant
        - az group create --location westus --resource-group $AZResourceGroup
        - az deployment group create --name GitLabPipeline --resource-group $AZResourceGroup --template-file ./ARM-Templates/main.bicep --mode incremental -o json --parameters siteName=$AppServiceName dockerRegistryHost='https://registry.gitlab.com' username=$CI_REGISTRY_USER password=$CI_REGISTRY_PASSWORD
 

5.9	This stage is only set to run manually.  You can create a new pipeline then trigger this stage.  To do this, go to CI/CD then "Pipelines".  You will see a pipeline with the stage pending which you can trigger manually.

Congrats!  After your job has finished you should have a new resource group along with an app service inside of it.  We are going to continue expanding on your pipeline next by deploying your code to the app service.

## 6.	Continuous Delivery

Overview: Now that we have the infrastructure built out, we are now going to work on deploying the container to the app service.  You will need a deployment token first so we will get that created then use the token in our new deploy job.

6.1	First we need to create a deploy token.  In your project go to “Settings” followed by “Repository”

6.2	Expand the Deploy Tokens section and enter “gitlab-deploy-token” for the name and check the “Read_registry” scope checkbox.  Please note the name MUST be “gitlab-deploy-token” as it is referenced by the pipeline provided to you in the later steps.

6.3	Click “Create deploy token”

6.4	Return to the pipeline editor.  Go to CI/CD section then “Editor”.  

6.5	Update the following in your pipeline:

  6.5.1 Update your stages to what you see below:
    
    stages:   
      - buildAzureEnvironment      
      - build
      - dockerBuild
      - deploy
    
  6.5.2	Add the additional deployment job to the end of the file.  
    
    deploy-job:      # This job runs in the deploy stage.
      stage: deploy 
      environment:
        name: Production
      when: manual
      image: mcr.microsoft.com/azure-cli
      only:
        changes:
          - Application/**/*
      except:
        - merge_requests
      script:
        - echo "Deploying application..."
        - az login --service-principal -u $AZSPLogin -p $AZSPPassword --tenant $AZSPTenant
        - az webapp config container set --docker-custom-image-name https://registry.gitlab.com/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/razorpagestestsample:$CI_COMMIT_SHA --docker-registry-server-password $CI_DEPLOY_PASSWORD --docker-registry-server-url https://registry.gitlab.com --docker-registry-server-user $CI_DEPLOY_USER --name $AppServiceName --resource-group $AZResourceGroup
        - az webapp restart --name $AppServiceName --resource-group $AZResourceGroup
        - echo "Application successfully deployed."Start a new pipeline to run your build and deployment.
    

6.5.3 You can now create a new pipeline and run your deployment once the build has completed.  As a reminder, you will need to manually trigger the deploy job as it is set as manual step. 

Your code should now be deployed to the app service.  You can validate this by looking for the URL in the app service inside Azure Portal.  Now that you created your deploy token and deployment pipeline I wanted to add some context.  There are some pre-defined variables such as $CI_DEPLOY_USER and $CI_DEPLOY_PASSWORD similar to the $CI_PROJECT_NAME we used before.  These are built in to GitLab that you can leverage.  When we created the deploy token we had to use “gitlab-deploy-token” as the name.  GitLab will automatically use the values in that token when you reference it with $CI_DEPLOY_USER and $CI_DEPLOY_PASSWORD.


## 7.	Security

Overview: We now have a CI/CD pipeline, but we should take it a step further.  Lets go over how easy it is to integrate security scanning into your pipeline.

7.1	Return back to the pipeline editor.  Go to CI/CD section then “Editor”. 

7.2 We will be updating your pipeline templates with the following:
  7.2.1	Replace the stages with the following:
  ```
  stages:   
    - buildAzureEnvironment       
    - build
    - test
    - dockerBuild
    - deploy
    - dast
  ```
  7.2.2	Add in the following templates into your pipeline file.
  ```
  include:
    - template: Security/Dependency-Scanning.gitlab-ci.yml
    - template: Security/License-Scanning.gitlab-ci.yml
    - template: Security/SAST.gitlab-ci.yml
    - template: Security/Secret-Detection.gitlab-ci.yml
    - template: Security/DAST.gitlab-ci.yml
    - template: Security/Container-Scanning.gitlab-ci.yml
  ```

7.3	Run your pipeline again, you should see the security scans in your pipeline going forward.


## 8.	Branching and policies

Overview: During this time you have been able to commit directly to the main branch which is not a good best practice.  Here we will go over how you can lock that down to make your pipelines more stable.

8.1	Here we are going to protect the branches so you cant check in directly.

8.2	In your project go to “Settings” then “Repository”

8.3	Expand the “Protected Branches” section

8.4	In the branch section the main branch is already protected but we want to enhance this.  Change “Allowed to push” from “Maintainers” to “No one”

Now that you have set the protection, you should not be able to checkin directly to the main branch.  This is a great way to protect your main branch and ensure only merge requests are the route to bring in new code.


## 9.	How to Create Kubernetes Cluster and Install Prometheus (Optional going forward as this requires Google Cloud or Amazon Cloud account)

Overview: So far everything we have built was done with manual scripting and creating the pipeline by hand.  Lets take another aproach by leveraging GitLabs integration with Google Kubernetes Engine and see how quick we can spin up our infrastructure and pipeline.

9.1	Go to Infrastructure/Kubernetes

9.2	Click on “Connect cluster with certificate”

9.3	Select Google GKE 

9.4	Populate the cluster name and project

9.5	Select “Create Kubernetes Cluster”

9.6	Go to Google cloud console and run the following lines

```
kubectl create ns gitlab-managed-apps
wget https://gitlab.com/gitlab-org/project-templates/cluster-management/-/raw/master/applications/prometheus/values.yaml
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus -n gitlab-managed-apps --values values.yaml
```

9.7	Once installed, return to GitLab, and return to your Kubernetes cluster, under the integrations tab, select the “Enable Prometheus Integration” checkbox and save.

9.8	Metrics should begin to populate after a few minutes.


## 10.	Auto DevOps

Overview: Creating the kubernetes cluster and configuring with Prometheus should have been relatively painless.  But wait there is more!  Now we can take it up another notch by having a pipeline automagically created without a pipeline file.

10.1	Install Ingress
```
helm repo add stable https://charts.helm.sh/stable
helm repo update
helm install ingress stable/nginx-ingress -n gitlab-managed-apps
kubectl get service ingress-nginx-ingress-controller -n gitlab-managed-apps
```
10.2	Configure base domain 

  10.2.1	Get the IP address by running the following a few mins after ingress service is installed.
    
    kubectl get service ingress-nginx-ingress-controller -n gitlab-managed-apps -ojson | jq -r '.status.loadBalancer.ingress[].ip'
    
  10.2.2	Return to GitLab cluster information and enter “<IP address from above>.nip.io”

10.3	Go back to your project homepage and there will be a button to “Enable Auto DevOps”

10.4	Check the box to “Default to Auto DevOps pipeline”, you can leave the deployment strategy as default.  Then save changes.

10.5	Checkin and replace the code from the zip file called AutoDevOps-Application.zip
  
10.6  Your pipeline should automatically run after the checkin.  It should contain all of the features that come with AutoDevOps
  
## 11. Cleanup
  
Your GitLab account should revert to free once the trial is over.  If you prefer you can also delete your account.  You will need to delete the group first by going to the settings within the group.  Then by going to your account icon on the top right, then select "Account" followed by "Delete Account"
  
You will also need to delete the resource group in Azure.
  





