import { registerRootComponent } from 'expo';
import Amplify from 'aws-amplify'
import App from './src/App';
import {awsExports} from '@theraply/lib'

Amplify.configure({
    ...awsExports,
    Analytics: {
      disabled: true,
    },
  })
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
