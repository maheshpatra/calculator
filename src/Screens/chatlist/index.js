import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, Image, Pressable, TouchableOpacity, Alert, StyleSheet
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
import notifee,{AndroidImportance} from '@notifee/react-native';
const ChatList = ({ route, navigation }) => {
  const [listViewData, setListViewData] = useState(null);
  const user = route?.params?.user;

  useEffect(() => {
    fetchUsersList();
    console.log(user)
  }, []);

  const fetchUsersList = async () => {
    try {
      let res = await fetch('https://calculator.acuitysoftware.co/Calculator/get_users.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ user_id: user?.id })
      });
      let resultData = await res.json();
      if (resultData.error === false) {
        setListViewData(resultData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startAudioCall = (recipientId) => {
    navigation.navigate('CallScreen', { userId: recipientId, isVideo: false, localUserId: user.id });
  };

  const startVideoCall = (recipientId,userfname,fcmtoken) => {
    navigation.navigate('VideoCall', { 
      userId: recipientId, 
      isVideo: true, 
      localUserId: user.id,
      type:'OUTGOING_CALL' });
    // console.log(user)
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default2',
      name: 'Default Channel 2',
      importance:AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
      title: '<p style="color: #4caf50;"><b>Incomming Call</span></p></b></p> ',
      subtitle: '&#129395;',
      body:
        'Incomming Video Call from mahesh',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<p style="color: #f44336;"><b>Reject...</b></p>',
            pressAction: { id: 'reject' },
          },
          {
            title: '<b>Accept</b>',
            pressAction: { id: 'accept' },
          }
          
        ],
      },
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        user={user}
        handelLogout={route?.params?.handelLogout}
        handelSearchData={(query) => handelSearchData(query)}
      />
      <ScrollView>
        <SwipeListView
          data={listViewData}
          renderItem={(data) => (
            <Pressable onPress={() => navigation.navigate('ChatDetails', {user:data.item, userId:user?.id, recipientId: data.item.id, UserName: user.first_name})} style={styles.listItem}>
              <Image
                source={{ uri: data.item.profile }}
                style={styles.profileImage}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{data.item.first_name} {data.item.last_name}</Text>
                <Text style={styles.userMessage}><MaterialCommunityIcons size={responsiveFontSize(2.2)} name='check-all' color={'#2FBFFF'} />{" Hii , 7:05 PM"}</Text>
              </View>
              <Text style={styles.messageCount}>1</Text>
            </Pressable>
          )}
          renderHiddenItem={(data) => (
            <LinearGradient start={{ x: 0, y: 1 }} colors={['#8C228A', '#DF0D89']} style={styles.hiddenButtonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ChatDetails', {user:data.item, userId:user?.id, recipientId: data.item.id, UserName: user.first_name})} style={styles.hiddenButton}>
                <Ionicons color={'#fff'} name='chatbubble-ellipses-outline' size={responsiveFontSize(2.8)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => startAudioCall(data.item.id)} style={styles.hiddenButton}>
                <Feather color={'#fff'} name='phone-call' size={responsiveFontSize(2.6)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => startVideoCall(data.item.id,user.first_name,data.item.remember_token)} style={styles.hiddenButton}>
                <Feather color={'#fff'} name='video' size={responsiveFontSize(2.8)} />
              </TouchableOpacity>
            </LinearGradient>
          )}
          rightOpenValue={-responsiveWidth(35)}
        />
      </ScrollView>
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
    borderRadius: responsiveFontSize(3),
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
  userMessage: {},
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
