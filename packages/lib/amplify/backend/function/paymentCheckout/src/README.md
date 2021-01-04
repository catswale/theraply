# export env variables
set -o allexport
source .env
set +o allexport

# run the app
node ./index.js