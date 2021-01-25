# export env variables
set -o allexport
source .env
set +o allexport

# Setup
npm i
npm i -g nodemon
# run the app
nodemon ./index.js