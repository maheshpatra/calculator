import React,{useState} from 'react'
import { View,Image, Text, TouchableOpacity, Alert,NativeModules, Pressable } from 'react-native'
import {Colors} from '../../Constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { Calibri } from '../../Constants/Fonts';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import Modal from "react-native-modal";
import { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import AsyncStorage from '@react-native-async-storage/async-storage';
const HeaderBack = ({ menuClicks,title,icon,custom, user,status }) => {
    const {StatusBarManager} = NativeModules;

    const height = StatusBarManager.HEIGHT;
    const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
	
	const handelRemovedAccount = async () => {
		console.log(user?.id)
   
      
        setIsLoading(true);
        try {
          let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
           }
           
           let bodyContent = new FormData();
           bodyContent.append("user_id", user?.id);
           
           let response = await fetch("https://calculator.acuitysoftware.co/Calculator/calculator-admin/api/user-delete", { 
             method: "POST",
             body: bodyContent
           });
           
           let res = await response.json();
           
           console.log(res)
          if(res.status === true){
            ZegoUIKitPrebuiltCallService.uninit()
            try {
              await AsyncStorage.removeItem('USER_DATA')
              navigation.replace('Login')
           } catch (error) {
             console.log(error)
             // Error saving data
           }
    
          }else{
            Alert.alert('Calculator App', res.message);
              return;
          }
        } catch (err) {
          console.log(err)
        }
      
    
  }
	
	const handelLogoutUser = async () => {
    try {
      await AsyncStorage.removeItem('USER_DATA')
      navigation.replace('Initial')
   } catch (error) {
     console.log(error)
     // Error saving data
   }
	  };
	
    return (

        <LinearGradient colors={['#fff', '#fff']}  end={{x: 1, y: 0}}  style={{ height: 59, width: '100%', backgroundColor: Colors.backgroundcolor, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,}}>
            <TouchableOpacity onPress={()=>navigation.pop()}>
                <Feather name="arrow-left" color={'#999'} size={responsiveFontSize(3.5)} />  
            </TouchableOpacity>
            <Image

                source={{ uri:user?.profile_image ?? 'https://calculator.acuitysoftware.co/Calculator/calculator-admin/public/assets/no_image.png' }}
                style={{ height: responsiveFontSize(5.5), width: responsiveFontSize(5.5), marginLeft: responsiveFontSize(1), borderRadius: responsiveFontSize(3) }}
            />
            <View style={{marginLeft:5}}>
            <Text style={{color:'#000',fontSize:responsiveScreenFontSize(2),letterSpacing:.5,fontFamily:Calibri.bold,}}>{user?.first_name} {user?.last_name}</Text>
            <Text style={{color:'#000',fontSize:responsiveFontSize(1.5),letterSpacing:.5,}}>{status}</Text>
            </View>
            <View style={{width:'34%',flexDirection:'row',position:'absolute',right:5}}>
            <ZegoSendCallInvitationButton
                invitees={[{ userID: String(user?.id), userName: user?.first_name }]}
                isVideoCall={false}
                resourceID={"calculator_video_call"}
                backgroundColor={'#fff'}
                marginLeft={10}
                // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
              />

              <ZegoSendCallInvitationButton
                invitees={[{ userID: String(user?.id), userName: user?.first_name }]}
                isVideoCall={true}
                backgroundColor={'#fff'}
                marginLeft={10}
                
                resourceID={"calculator_video_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
              /> 
              <TouchableOpacity onPress={toggleModal} style={{  width: '30%', alignItems: 'center',justifyContent:'center' }}>
                <Entypo color={'#999'} name='dots-three-vertical' size={responsiveFontSize(2.9)} style={{  }} />
              </TouchableOpacity>
              </View>
              <Modal isVisible={isModalVisible}>
                <Pressable onPress={toggleModal} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ height: responsiveScreenWidth(20), width: responsiveScreenWidth(38), backgroundColor: '#fff', alignSelf: 'center', position: 'absolute', top: responsiveScreenWidth(10), right: 10, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>

                        <Text style={{ padding: 5 }} onPress={handelRemovedAccount}>Remove Account</Text>
                        <Text style={{ padding: 5 }} onPress={() => handelLogoutUser()}>Logout</Text>

                    </View>
                </Pressable>
            </Modal>

        </LinearGradient>
    )
}

export default HeaderBack