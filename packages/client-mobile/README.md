# Setup
yarn
pod install --project-directory=ios
# Run 
yarn start
yarn ios
or 
yarn android

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