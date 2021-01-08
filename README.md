# Theraply Monorepo
Therapist: A psychologist who provides mental health support to their clients
Client: A customer who needs mental health support

# Projects
## mobile-app
This is the frontend for clients to interact with their therapists. It is a mobile app
## therapists-web
This is the frontend web app for the therapists to interact with their clients
## lib
This is the shared library which hosts shared code. It also hosts the backend code (for now)

# How does this monorepo work?
This monorepo contains all projects relating to Theraply (found in /packages). This is so that these projects can share code
and configuration easily.

# Getting Started
`yarn` // this builds the node_modules for all the projects in /packages
See each readme for further instructions running each package

# Environments (https://docs.amplify.aws/cli/teams/overview)
## Local Branch
Create and commit to local branches when you are working on a particular task
eg git checkout -b feature/sign-up

## Dev
git checkout dev
amplify env checkout <env> // dev or prod

amplify push
git merge <>


## Prod
When you commit code to this branch (main), the web frontend automatically updates. You need to be amplifies dev environment when committing. You should only merge code from dev to main. No manual commits directly to this branch.
Test the changes in the dev environment before merging to prod.
amplify env checkout prod