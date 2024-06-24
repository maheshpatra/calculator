/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { MainNavigation } from "./src/Navigations/MainNavigation";
import 'react-native-gesture-handler';
import { Alert, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { CallProvider } from './src/context/callcontext';
import { showNotification } from './src/utils/notifications';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
 return requestUserPermission()
}

// async function onMessageReceived(message) {
//   // Handle the message and extract necessary data
//   const { title, body } = message.notification;
//   const { callerId, rtcMessage } = message.data;

//   // Create a notification with Notifee
//   const notification = await notifee.displayNotification({
//     title,
//     body,
//     android: {
//       channelId: 'default3',
//       color: 'green',
//       // smallIcon: 'ic_launcher', 
//       actions: [
//         {
//           title: '<b>Accept</b> ',
//           pressAction: { id: 'accept' },
//         },
//         {
//           title: '<p style="color: #f44336;"><b>ReJect</b> &#128557;</p>',
//           pressAction: { id: 'reject' },
//         },
//       ],
//     },
//     data: {
//       callerId,
//       rtcMessage,
//     },
//   });

//   // Display the notification
//   displayIncomingCallNotification(notification);;
// }



// notifee.onBackgroundEvent(async (remoteMessage) => {
//   await displayIncomingCallNotification(remoteMessage);
// });
messaging().setBackgroundMessageHandler(async remoteMessage => {
  showNotification(
    "Incomming Call",
    "You Have an Incomming call",
    // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
  )
   
});

// // Listen for notifications when the app is in the foreground
// messaging().onNotificationOpenedApp(remoteMessage => {
//   onMessageReceived(remoteMessage);
// });


function App() {
 
  // useEffect(() => {
  //   messaging().onMessage(async remoteMessage => {
  //    console.log(remoteMessage)
  //    await showNotification(
  //     "Incomming Call",
  //    "You Have an Incomming call",
  //      // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
  //    );

  //     messaging().onBackgroundEvent(async remoteMessage => {
  //      console.log(remoteMessage)
  //      notifee.onBackgroundEvent(event =>
  //          showNotification(
  //          "Incomming Call",
  //          "You Have an Incomming call",
  //          // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
  //        )
  //      )
  //     })
  //  //   navigation.navigate('VideoCall', {
  //  //     userId: incomingCall.callerId,
  //  //     rtcMessage: incomingCall.rtcMessage,
  //  //     isVideo: true,
  //  //     localUserId: user.id,
  //  //     typec:'INCOMING_CALL'
  //  // });
  //  });
  
  //   }, []);




  return (

    <NavigationContainer>
      <CallProvider>
        <MainNavigation />
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      </CallProvider>
    </NavigationContainer>

  );
}

export default App;
