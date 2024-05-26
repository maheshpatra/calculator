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
import Modal from "react-native-modal";
const HeaderBack = ({ menuClicks,title,icon,custom }) => {
    const {StatusBarManager} = NativeModules;

    const height = StatusBarManager.HEIGHT;
    const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (

        <LinearGradient colors={['#fff', '#fff']}  end={{x: 1, y: 0}}  style={{ height: 59, width: '100%', backgroundColor: Colors.backgroundcolor, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,}}>
            <TouchableOpacity onPress={()=>navigation.pop()}>
                <Feather name="arrow-left" color={'#999'} size={responsiveFontSize(3.5)} />  
            </TouchableOpacity>
            <Image

                source={{ uri: 'https://picsum.photos/id/456/200/200' }}
                style={{ height: responsiveFontSize(5.5), width: responsiveFontSize(5.5), marginLeft: responsiveFontSize(1), borderRadius: responsiveFontSize(3) }}
            />
            <View style={{marginLeft:5}}>
            <Text style={{color:'#000',fontSize:responsiveScreenFontSize(2),letterSpacing:.5,fontFamily:Calibri.bold,}}>Beverly Gray</Text>
            <Text style={{color:'#000',fontSize:responsiveFontSize(1.5),letterSpacing:.5,}}>Online</Text>
            </View>
            <View style={{width:'34%',flexDirection:'row',position:'absolute',right:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('VideoCall')} style={{  width: '32%', alignItems: 'center',  }}>
                <Feather color={'#999'} name='video' size={responsiveFontSize(2.9)} style={{  borderRadius: 25, }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AudioCall')} style={{  width: '30%', alignItems: 'center',  }}>
                <Feather color={'#999'} name='phone-call' size={responsiveFontSize(2.8)} style={{   }} />
              </TouchableOpacity> 
              <TouchableOpacity onPress={toggleModal} style={{  width: '30%', alignItems: 'center',  }}>
                <Entypo color={'#999'} name='dots-three-vertical' size={responsiveFontSize(2.9)} style={{  }} />
              </TouchableOpacity>
              </View>
              <Modal isVisible={isModalVisible}>
                <Pressable onPress={toggleModal} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ height: responsiveScreenWidth(20), width: responsiveScreenWidth(38), backgroundColor: '#fff', alignSelf: 'center', position: 'absolute', top: responsiveScreenWidth(10), right: 10, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>

                        <Text style={{ padding: 5 }} onPress={() => setModalVisible(false)}>Remove Account</Text>
                        <Text style={{ padding: 5 }} onPress={() => setModalVisible(false)}>Logout</Text>

                    </View>
                </Pressable>
            </Modal>

        </LinearGradient>
    )
}

export default HeaderBack