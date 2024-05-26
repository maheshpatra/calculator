/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { MainNavigation } from "./src/Navigations/MainNavigation";
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

function App(){

  useEffect(() => {
			  
	  }, []);

  return (
   
      <NavigationContainer>
        <MainNavigation  />
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      </NavigationContainer>
  );
}

export default App;
