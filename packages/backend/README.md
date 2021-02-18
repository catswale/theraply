# export env variables
set -o allexport
source .env
set +o allexport
# Setup
npm i
npm i -g nodemon
# run the app locally
nodemon

# Push changes to the dev environment
`aws configure` // configure with the aws account sent to you from. Only needs to be done once
(Set the default region name as ap-southeast-2)

yarn build
aws lambda update-function-code --function-name paymentCheckout-dev --zip-file fileb://archive.zip