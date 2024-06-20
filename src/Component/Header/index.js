import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, Alert, NativeModules, TextInput, Pressable } from 'react-native'
import { Colors } from '../../Constants/Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Calibri } from '../../Constants/Fonts';
import Modal from "react-native-modal";
const Header = ({user, menuClicks, title, icon, handelSearchData }) => {

    const { StatusBarManager } = NativeModules;
    const navigation = useNavigation();
    const height = StatusBarManager.HEIGHT;
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
	
	const handelRemovedAccount = async () => {
		console.log(user?.id)
    try {
      let res = await fetch('https://calculator.acuitysoftware.co/Calculator/disabled_users.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ user_id: user?.id })
      });
      let resultData = await res.json();
		console.log(resultData)
      if (resultData.error === false) {
        handelLogoutUser()
      }
    } catch (err) {
      console.log(err);
    }
  };
	
	const handelLogoutUser = () => {
		navigation.navigate('Login');
	  };

    return (
        <LinearGradient colors={['#fff', '#fff']} end={{ x: 1, y: 0 }} style={{ height: 59, width: '100%', backgroundColor: Colors.backgroundcolor, flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveScreenWidth(4), justifyContent: 'space-between', borderBottomWidth: .5, borderColor: '#ddd' }}>

            <Image

                source={{ uri: user?.profile_photo_path ?? 'https://picsum.photos/id/456/200/200' }}
                style={{ height: responsiveFontSize(5.5), width: responsiveFontSize(5.5), marginLeft: responsiveFontSize(1), borderRadius: responsiveFontSize(3) }}
            />
            <View style={{ width: '80%', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: '82%', alignSelf: 'center', flexDirection: 'row', borderRadius: 5, backgroundColor: '#F8F8F8', height: responsiveScreenWidth(10), alignItems: 'center' }}>
                    <Fontisto name="search" color={'#ccc'} size={responsiveFontSize(2.5)} style={{ marginLeft: 8 }} />
                    <TextInput cursorColor={Colors.primary} placeholder='Search..' placeholderTextColor={'#ccc'} style={{ paddingLeft: 10, color: '#555' }} onChangeText={(txt) => handelSearchData(txt)} />
                </View>

                <Entypo onPress={toggleModal} name="dots-three-vertical" color={'#555'} size={responsiveFontSize(3)} style={{ marginLeft: responsiveFontSize(2), padding: responsiveFontSize(.8), }} />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile')
                }}>

                </TouchableOpacity>

                {/* <Image  source={require('../../assets/images/logo.png')} style={{height:30,width:30,alignSelf:'center'}} /> */}
            </View>

            <Modal isVisible={isModalVisible}>
                <Pressable onPress={toggleModal} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ height: responsiveScreenWidth(20), width: responsiveScreenWidth(38), backgroundColor: '#fff', alignSelf: 'center', position: 'absolute', top: responsiveScreenWidth(10), right: 10, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>

                        <Text style={{ padding: 5 }} onPress={() => handelRemovedAccount()}>Remove Account</Text>
                        <Text style={{ padding: 5 }} onPress={() => handelLogoutUser()}>Logout</Text>

                    </View>
                </Pressable>
            </Modal>

        </LinearGradient>
    )
}

export default Header