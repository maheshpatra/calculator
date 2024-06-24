/**
 * @format
 */
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

notifee.getInitialNotification().then((value) => {
     console.log(value);
}, (reason) => {
     console.log(reason);
})
notifee.onBackgroundEvent(async ({ type, detail }) => {
     const { notification, pressAction } = detail;
   
     console.log(pressAction)
   
       // Remove the notification
     //   await notifee.cancelNotification(notification.id);
     
   });

//    messaging().setBackgroundMessageHandler(async remoteMessage => {
//      // Handle the message
//      console.log(remoteMessage);
//  });

AppRegistry.registerComponent(appName, () => App);
