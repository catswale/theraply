# export env variables
set -o allexport
source .env
set +o allexport
# Setup
npm i
npm i -g nodemon
# run the app locally
nodemon

# Deploy the app to the dev environment
yarn build
aws lambda update-function-code --function-name paymentCheckout-dev --zip-file fileb://archive.zip