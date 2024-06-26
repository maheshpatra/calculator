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
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn'
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






messaging().setBackgroundMessageHandler(async remoteMessage => {
  showNotification(
    "Incomming Call",
    "You Have an Incomming call",
    // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
  )
   
});




function App() {
 
  



  return (

    <NavigationContainer>
      <ZegoCallInvitationDialog />

        <MainNavigation />
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
       
    </NavigationContainer>

  );
}

export default App;
