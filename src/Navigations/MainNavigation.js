import React, { useEffect, useRef, useState } from "react";
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/native-stack';
import {
  Forgot,
  Initial,
  Login,
  Otp,
  ReturnDetails,
  Main,
  Print,
  ChatList,
  ChatDetails,
  VideoCall,
  AudioCall,
  CallScreen
} from "../Screens";
import { StatusBar } from "react-native";
import IncomingCallModal from '../Component/IncomingCallModal';
import { showNotification } from '../utils/notifications';
import notifee,{ AndroidNotificationSetting } from "@notifee/react-native";
import { useCall } from "../context/callcontext";
import { useNavigation } from "@react-navigation/native";
import SocketIOClient from 'socket.io-client';
import messaging from '@react-native-firebase/messaging' ;
const Stack = createNativeStackNavigator();

const MainNavigation = (props) => {

  const horizontalAnimation = {
    gestureDirection: "horizontal",
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };


  const otherUserId = useRef(null);
  const socket = useRef(null);
  const remoteRTCMessage = useRef(null);
  const { setIncomingCall } = useCall(null);
  const { incomingCall } = useCall(null);


  const [user,setuser]=useState(null)
  const navigation = useNavigation();
  useEffect(()=>{
       getData()
  },[])
 

  


  const getData = async () => {
       try {
         const value = await AsyncStorage.getItem('USER_DATA');
         if (value !== null) {
            setuser(JSON.parse(value))
         }
       } catch (e) {
         
       }
     };
    
     useEffect(() => {
       messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage)
        await showNotification(
         "Incomming Call",
        "You Have an Incomming call",
          // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
        );

         messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log(remoteMessage)
          notifee.onBackgroundEvent(event =>
              showNotification(
              "Incomming Call",
              "You Have an Incomming call",
              // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
            )
          )
         })
      //   navigation.navigate('VideoCall', {
      //     userId: incomingCall.callerId,
      //     rtcMessage: incomingCall.rtcMessage,
      //     isVideo: true,
      //     localUserId: user.id,
      //     typec:'INCOMING_CALL'
      // });
      });
     
       }, []);

  useEffect(() => {
		 notifee.onForegroundEvent(event =>
      console.log(event)
      //  showNotification(
      //   "Incomming Call",
      //   "You Have an Incomming call",
      //   // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
      // )
    )

     notifee.onBackgroundEvent(event =>
      console.log(event)
      //  showNotification(
      //   "Incomming Call",
      //   "You Have an Incomming call",
      //   // remoteMessage?.data?.imageUrl || remoteMessage?.notification?.imageUrl
      // )
    )
  
    
	   }, []);
     const acceptCall = () => {
      Alert.alert('Accept Token Arrive')
    };
  
    const rejectCall = () => {
      Alert.alert('Reject Token Arrive')
    };

    
  

  return (
    <>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '',
        },
        headerShadowVisible: false,
      }}
    >
   
     <Stack.Screen
        name="Initial"
        component={Initial}
        options={horizontalAnimation}
      /> 
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerTitle: 'Login', headerShown: false}}
      />
      
      <Stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={horizontalAnimation}
      />
     
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={horizontalAnimation}
      />
	  <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={horizontalAnimation}
      /> 
      <Stack.Screen
      name="AudioCall"
      component={AudioCall}
      options={horizontalAnimation}
    />
     
    </Stack.Navigator>
    <IncomingCallModal />
    </>
  );
};


export { MainNavigation };
