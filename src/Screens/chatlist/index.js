import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, Image, Pressable, TouchableOpacity, Alert, StyleSheet,RefreshControl,
  ActivityIndicator
} from "react-native";
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../Component/Header';
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import Styles from './style';
import { Colors } from '../../Constants/Colors';
import notifee, { AndroidImportance } from '@notifee/react-native';

import { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn'
const ChatList = ({ route, navigation }) => {
  const [listViewData, setListViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = route?.params?.user;

  useEffect(() => {
    fetchUsersList(user?.id);
    console.log(user)
  }, [user]);

  const _onRefresh = () => {
    console.log('_onRefresh')
    setLoading(true);
    fetchUsersList(user?.id);
};

  const fetchUsersList = async (mid) => {
     setLoading(true)
    try {
      let bodyContent = new FormData();
       bodyContent.append("user_id",mid);
       
       let response = await fetch("https://calculator.acuitysoftware.co/Calculator/calculator-admin/api/user-list", { 
         method: "POST",
         body: bodyContent
       });
       
       let res = await response.json();
       console.log(res)
      if (res.status === true) {
        setListViewData(res.data);
        console.log(res.data)
        setLoading(false)
      }else{
        Alert.alert('Error Meassage',res.message )
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

 

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        user={user}
        // handelLogout={route?.params?.handelLogout}
        handelSearchData={(query) => { }}
      />

{/* {loading && 
        <ActivityIndicator size={'large'} color={'#555'}  style={{alignSelf:'center'}} />
        
        } */}
      
        <SwipeListView
          data={listViewData}
          renderItem={(data) => (
            <Pressable onPress={() => navigation.navigate('ChatDetails', { user: data.item, userId: user?.id, recipientId: data.item.id, UserName: user?.name })} style={styles.listItem}>
              <Image
              resizeMode='stretch'
                source={{ uri: data.item.profile_image ?? 'https://calculator.acuitysoftware.co/Calculator/calculator-admin/public/assets/no_image.png' }}
                style={styles.profileImage}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{data.item.first_name} {data.item.last_name}</Text>
                <Text style={styles.userMessage}><MaterialCommunityIcons size={responsiveFontSize(2.2)} name='check-all' color={'#2FBFFF'} />{" Hii , 7:05 PM"}</Text>
              </View>
              {/* <Text style={styles.messageCount}>1</Text> */}
            </Pressable>
          )}
          renderHiddenItem={(data) => (
            <LinearGradient start={{ x: 0, y: 1 }} colors={['#8C228A', '#DF0D89']} style={styles.hiddenButtonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ChatDetails', { user: data.item, userId: user?.id, recipientId: data.item.id, UserName: user.first_name })} style={styles.hiddenButton}>
                <Ionicons color={'#fff'} name='chatbubble-ellipses-outline' size={responsiveFontSize(2.8)} />
              </TouchableOpacity>
              <ZegoSendCallInvitationButton
                invitees={[{ userID: String(data.item.id), userName: data.item.first_name }]}
                isVideoCall={false}
                resourceID={"calculator_video_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
              />

              <ZegoSendCallInvitationButton
                invitees={[{ userID: String(data.item.id), userName: data.item.first_name }]}
                isVideoCall={true}
                resourceID={"calculator_video_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
              />
              {/* <TouchableOpacity onPress={() => startVideoCall(data.item.id,data.item.first_name,data.item.remember_token)} style={styles.hiddenButton}>
                <Feather color={'#fff'} name='video' size={responsiveFontSize(2.8)} />
              </TouchableOpacity> */}
            </LinearGradient>
          )}
          rightOpenValue={-responsiveWidth(35)}
          refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={_onRefresh}
            tintColor="#F8852D"/>}
        />

        
      
    </View>
  );
};

const styles = StyleSheet.create({
  rtcView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  listItem: {
    backgroundColor: '#fff',
    width: '108%',
    alignSelf: 'center',
    padding: 12,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: '#ddd',
  },
  profileImage: {
    height: responsiveFontSize(5.5),
    width: responsiveFontSize(5.5),
    marginLeft: responsiveFontSize(3),
    borderRadius: responsiveFontSize(13),
  },
  userInfo: {
    marginLeft: responsiveWidth(2.5),
    width: '68%',
  },
  userName: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: responsiveFontSize(2),
  },
  userMessage: {
    color:'#555'
  },
  messageCount: {
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.9),
  },
  hiddenButtonsContainer: {
    height: '100%',
    width: '35%',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatList;
