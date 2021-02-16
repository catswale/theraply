# Lib
This repo contains shared code and the Amplify backend of Theraply.

# Get Started
`yarn` (Builds node_modules for the entire mono repo)

# Push changes to the dev environment
`aws configure` // configure with the aws account sent to you from 
(Set the default region name as ap-southeast-2)

`npm install -g @aws-amplify/cli`
`amplify init` // choose existing env dev
Make changes to schema.graphql or any other backend file
`amplify push --yes` // pushes these changes to the dev environment
