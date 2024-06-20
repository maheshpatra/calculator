import React from "react";
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

// export default MainNavigation;
export { MainNavigation };
