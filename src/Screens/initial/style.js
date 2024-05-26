//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

// create a component
const Styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: responsiveWidth(100),
      width: responsiveWidth(100),
      backgroundColor: '#fff'
    },
    splashLogo: {
      height: responsiveWidth(30), width: responsiveWidth(30)
    },
    splashBg: {                    
      height:'80%', width: '100%', position: 'absolute', left: -responsiveWidth(10)
    },
    logobg: {
      position: 'absolute',
      width: responsiveWidth(50),
      height: responsiveWidth(50),
      backgroundColor: '#000000',
      borderRadius: responsiveWidth(40),
      borderWidth: 8,
      borderColor: '#EF7D02',
      alignItems:'center',
      justifyContent:'center'
    }
  });
};
export default Styles;