import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, NativeModules, TextInput, Pressable, ActivityIndicator } from 'react-native'
import { Colors } from '../../Constants/Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Calibri } from '../../Constants/Fonts';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ({user, menuClicks, title, icon, handelSearchData }) => {

    const { StatusBarManager } = NativeModules;
    const navigation = useNavigation();
    const height = StatusBarManager.HEIGHT;
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    console.log(user)
	
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
              setIsLoading(false)
              try {
                await AsyncStorage.removeItem('USER_DATA')
                navigation.replace('Login')
             } catch (error) {
               console.log(error)
               // Error saving data
             }
              ZegoUIKitPrebuiltCallService.uninit()
              
      
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
        <LinearGradient colors={['#fff', '#fff']} end={{ x: 1, y: 0 }} style={{ height: 59, width: '100%', backgroundColor: Colors.backgroundcolor, flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveScreenWidth(4), justifyContent: 'space-between', borderBottomWidth: .5, borderColor: '#ddd' }}>

            <Image

                source={{ uri: user?.profile_image ?? 'https://calculator.acuitysoftware.co/Calculator/calculator-admin/public/assets/no_image.png' }}
                style={{ height: responsiveFontSize(5.5), width: responsiveFontSize(5.5), marginLeft: responsiveFontSize(1), borderRadius: responsiveFontSize(3) }}
            />
            <View style={{ width: '80%', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: '82%', alignSelf: 'center', flexDirection: 'row', borderRadius: 5, backgroundColor: '#F8F8F8', height: responsiveScreenWidth(10), alignItems: 'center' }}>
                    <Fontisto name="search" color={'#ccc'} size={responsiveFontSize(2.5)} style={{ marginLeft: 8 }} />
                    <TextInput cursorColor={Colors.primary} placeholder='Search..' placeholderTextColor={'#ccc'} style={{ paddingLeft: 10, color: '#555' }} onChangeText={(txt) => handelSearchData(txt)} />
                </View>

                <Entypo onPress={toggleModal} name="dots-three-vertical" color={'#555'} size={responsiveFontSize(3)} style={{ marginLeft: responsiveFontSize(2), padding: responsiveFontSize(.8), }} />
                <TouchableOpacity onPress={() => {
                    // navigation.navigate('Profile')
                }}>

                </TouchableOpacity>

                {/* <Image  source={require('../../assets/images/logo.png')} style={{height:30,width:30,alignSelf:'center'}} /> */}
            </View>

            <Modal isVisible={isModalVisible}>
                <Pressable onPress={toggleModal} style={{ flex: 1, justifyContent: 'center' }}>
                    {!loading ? <View style={{ height: responsiveScreenWidth(23), width: responsiveScreenWidth(45), backgroundColor: '#fff', alignSelf: 'center', position: 'absolute', top: responsiveScreenWidth(10), right: 10, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>
                       <TouchableOpacity onPress={() => handelRemovedAccount()} style={{justifyContent:'center',alignItems:'center'}}>
                       <Text style={{ padding: 5,color:'#555' }} >Remove Account</Text>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={handelLogoutUser} style={{justifyContent:'center',alignItems:'center'}}>
                        
                       <Text style={{ padding: 5,color:'#555' }} >Logout</Text>
                       </TouchableOpacity>

                    </View> :
                    <ActivityIndicator  color={'#555'} size={'large'} />
                    }
                </Pressable>
            </Modal>

        </LinearGradient>
    )
}

export default Header