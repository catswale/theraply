# Run 
yarn
expo start

# Deploy to App Stores through Expo
## android 
expo build:android -t app-bundle
expo upload:android

## ios
expo build:ios
expo upload:ios

# Publish OTA Update

expo publish