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
expo publish // not working atm

# Release to app stores
## Google Play Store
Build build in android studio
Build -> Generate Signed Bundle

## Apple Store