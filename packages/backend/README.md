# export env variables
set -o allexport
source .env
set +o allexport
# Setup
npm i
npm i -g nodemon
# run the app locally
yarn start

# Test locally
Test the API with a frontend by changing aws-exports.js paymentAPI endpoint to http://localhost:3000"

# Push changes to the dev environment
`aws configure` // configure with the aws account sent to you from. Only needs to be done once
(Set the default region name as ap-southeast-2)

yarn deploy:dev