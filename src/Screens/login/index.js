import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style";FontAwesome
import { Colors } from '../../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Calibri } from "../../Constants/Fonts";
import messaging from '@react-native-firebase/messaging' ;
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
  const [email, setEmail] = useState('Acuity');
  const [pass, setPass] = useState('Acuity##22');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 

  const getDeviceTocket = async ()=>{
    let tocken = await messaging().getToken();
    setToken(tocken)
    console.log(token)
} 

useEffect(()=>{
   getDeviceTocket();
},[])


const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('USER_DATA', jsonValue);
    setUser(value);
    navigation.navigate('ChatList', {user:value, handelLogout: handelLogout})
    
  } catch (e) {
    // saving error
    console.log(e)
  }
};



  const handelLogin = async () => {
	  
	  if(!email || email === ''){
		  Alert.alert('Calculator App', 'Please enter username');
		  return;
	  }
	  if(!pass || pass === ''){
		  Alert.alert('Calculator App', 'Please enter password');
		  return;
	  }
    
		  try {
       
			     setIsLoading(true);
				 let res = await fetch('https://calculator.acuitysoftware.co/Calculator/login.php', {
				  method: 'post',
				  headers: {
					  'Accept': 'application/json',
					  'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: JSON.stringify({
					  email: email,
					  password: pass,
            remember_token:token
				  })
			  });
			  let resultData = await res.json();
			  console.log(resultData)
			  setIsLoading(false);
			  if(resultData.error === false){
          storeData(resultData.data)
			  }else{
				  Alert.alert('Calculator App', resultData.error);
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
     <Image source={require('../../assets/images/loginbg.png')} style={{height:'100%',width:'100%', position:'absolute'}} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: responsiveWidth(5), }}>

        <View style={{ width: "100%", marginTop: '25%',justifyContent:'center' }}>
          <View >
            <View style={styles.inputContainer}>
            <Text style={{fontSize:responsiveFontSize(1.8)}}>User Id</Text>
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
              <Text style={{fontSize:responsiveFontSize(1.8)}}>Password</Text>
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
              <Image resizeMode={'cover'} source={require('../../assets/images/btn.png')} style={{height:'100%',width:'100%', }} />

            <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(2), color: "#fff", fontFamily: Calibri.bold,position:'absolute',bottom:responsiveWidth(11) }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        

        
         
        </View>
      </ScrollView>
     
    </View>
  )
}

export default Login;