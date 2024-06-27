/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { MainNavigation } from "./src/Navigations/MainNavigation";
import 'react-native-gesture-handler';
import { Alert, StatusBar,AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { showNotification } from './src/utils/notifications';
import { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [currentUser, setUser]=useState(null)
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(()=>{
    getData()
  },[])
  const getData = async () => {
		try {
			const value = await AsyncStorage.getItem('USER_DATA');
			if (value !== null) {
				const udata= JSON.parse(value)
        setUser(udata?.id)
				
			}
		} catch (e) {

		}
	}
  

  useEffect(() => {
    const updateUserStatus = async (status) => {
      await firebase.firestore().collection('users').doc(currentUser).update({
        status: status,
      });
    };

    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        updateUserStatus('online');
      } else if (nextAppState.match(/inactive|background/)) {
        updateUserStatus('offline');
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Set the status to 'online' when the app starts
    updateUserStatus('online');

    // Clean up the listener and set status to 'offline' when the app stops
    return () => {
      subscription.remove();
      updateUserStatus('offline');
    };
  }, [currentUser, appState]);



  return (

    <NavigationContainer>
      <ZegoCallInvitationDialog />

        <MainNavigation />
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
       
    </NavigationContainer>

  );
}

export default App;
