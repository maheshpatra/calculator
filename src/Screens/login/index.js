import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style"; FontAwesome
import { Colors } from '../../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Calibri } from "../../Constants/Fonts";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useFocusEffect(
		React.useCallback(() => {
			getData()
		}, [])
	);




	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem('USER_DATA');
			if (value !== null) {
				const udata= JSON.parse(value)
				  navigation.replace('ChatList',{user:udata})
				
			}
		} catch (e) {

		}
	}






  const getDeviceTocket = async () => {
    let tocken = await messaging().getToken();
    setToken(tocken)
    console.log(token)
  }

  useEffect(() => {
    getDeviceTocket();
  }, [])


  const _storeData = async (value) => {
    const jsonValue = JSON.stringify(value);
    try {
      await AsyncStorage.setItem(
        'USER_DATA',
        jsonValue,
      );
      
      onUserLogin(String(value.id), String(value.user_name))
      setIsLoading(false)
      navigation.replace('ChatList', { user: value })
    } catch (error) {
      setIsLoading(false)
      // Error saving data
    }

  };



  const onUserLogin = async (userID, userName) => {
    return ZegoUIKitPrebuiltCallService.init(
      1454304930,
      "b4ff08109be39e8f1b77d70a52847ac94062a743ce47f9b9dfd3ad23ca66e6f8",
      userID, // It can be any valid characters, but we recommend using a phone number.
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.wav',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        androidNotificationConfig: {
          channelID: "CalculatorVideoCall",
          channelName: "CalculatorVideoCall",
        },
       
      }).then(() => {
        // /////////////////////////
        ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
          message: 'We need your consent for the following permissions in order to use the offline call function properly',
          allow: 'Allow',
          deny: 'Deny',
        });
        // /////////////////////////
      });
  }





  const handelLogin = async () => {

    if (!email || email === '') {
      Alert.alert('Calculator App', 'Please enter username');
      return;
    }
    if (!pass || pass === '') {
      Alert.alert('Calculator App', 'Please enter password');
      return;
    }
    setIsLoading(true);
    try {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let bodyContent = new FormData();
       bodyContent.append("email", email);
       bodyContent.append("password", pass);
       
       let response = await fetch("https://calculator.acuitysoftware.co/Calculator/calculator-admin/api/login", { 
         method: "POST",
         body: bodyContent
       });
       
       let res = await response.json();
       
       console.log(res)
      if(res.status === true){
        _storeData(res.data)
       
      }else{
        Alert.alert('Calculator App', res.message);
        setIsLoading(false);
      	  return;
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handelLogout = () => {
    console.log("logout")
    setUser(null);

  };


  return (
    <View style={styles.container}>

      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <Image source={require('../../assets/images/loginbg.png')} style={{ height: responsiveHeight(100), width: '100%', position: 'absolute', top: 0 }} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: responsiveWidth(5), }}>

        <View style={{ width: "100%", justifyContent: 'center', height: responsiveHeight(100) }}>
          <View >
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: responsiveFontSize(2), color: '#ccc' }}>User Id</Text>
              {/* <FontAwesome style={{ marginLeft: responsiveWidth(2.5) }} name="user" color={Colors.primary} size={responsiveWidth(6)} /> */}
              <TextInput
                value={email}
                cursorColor={Colors.primary}
                onChangeText={(txt) => setEmail(txt)}
                selectionColor={'#ccc'}
                // placeholder="User Name"
                // placeholderTextColor={Colors.grey}
                style={styles.inputfild}
              />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>

            <View style={styles.inputContainer}>
              <Text style={{ fontSize: responsiveFontSize(2), color: '#ccc' }}>Password</Text>
              {/* <FontAwesome style={{ marginLeft: 10 }} name="lock" color={Colors.primary} size={responsiveWidth(6)} /> */}
              <TextInput
                value={pass}
                cursorColor={Colors.primary}
                placeholderTextColor={Colors.grey}
                onChangeText={(pas) => setPass(pas)}
                // placeholder="Password"
                secureTextEntry
                style={styles.inputfild}
              />
            </View>

          </View>


          <TouchableOpacity
            style={styles.button}
            onPress={handelLogin}>
            <Image resizeMode={'cover'} source={require('../../assets/images/btn.png')} style={{ height: '100%', width: '100%', }} />

            <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(2), color: "#fff", fontFamily: Calibri.bold, position: 'absolute', bottom: responsiveWidth(11) }}>
              LOGIN
            </Text>
          </TouchableOpacity>




        </View>
      </ScrollView>

    </View>
  )
}

export default Login;