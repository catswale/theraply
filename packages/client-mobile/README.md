# Setup
yarn
## IOS
pod install --project-directory=ios

# Run the App
yarn start
## Run on Simulator
yarn ios
or 
yarn android

## Run on Device
### Android
adb devices // Get deviceId
react-native run-android --deviceId <deviceId>
adb reverse tcp:8081 tcp:8081
## Clean
./gradlew clean // Apple
gradle clean // Windows

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