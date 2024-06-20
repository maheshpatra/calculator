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
import { StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { CallProvider } from './src/context/callcontext';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

}

async function onMessageReceived(message) {
  // Handle the message and extract necessary data
  const { title, body } = message.notification;
  const { callerId, rtcMessage } = message.data;

  // Create a notification with Notifee
  const notification = await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default3',
      color: 'green',
      // smallIcon: 'ic_launcher', 
      actions: [
        {
          title: '<b>Accept</b> ',
          pressAction: { id: 'accept' },
        },
        {
          title: '<p style="color: #f44336;"><b>ReJect</b> &#128557;</p>',
          pressAction: { id: 'reject' },
        },
      ],
    },
    data: {
      callerId,
      rtcMessage,
    },
  });

  // Display the notification
  await notifee.displayNotification(notification);
}



notifee.onBackgroundEvent(async (remoteMessage) => {
  await onMessageReceived(remoteMessage);
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
  await onMessageReceived(remoteMessage);
});

// Listen for notifications when the app is in the foreground
messaging().onNotificationOpenedApp(remoteMessage => {
  onMessageReceived(remoteMessage);
});


function App() {

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification', detail.notification);

          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
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
