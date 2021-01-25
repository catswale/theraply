# Run 
yarn
expo start

# Publish OTA Update

expo publish

# Release to app stores
## Google Play Store
cd android
### Apple
./gradlew assembleRelease 
### Windows
gradlew assembleRelease 

## Apple Store