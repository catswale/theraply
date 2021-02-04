# Setup
yarn
pod install --project-directory=ios
# Run on Simulator
yarn start
yarn ios
or 
yarn android

# Run on Device
yarn start
adb devices // Get deviceId
react-native run-android --deviceId <deviceId>
adb reverse tcp:8081 tcp:8081
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