import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCall } from '../context/callcontext';
import SocketIOClient from 'socket.io-client';

const Wrapper = ({ children }) => {
     const [user, setuser] = useState(null)
     const { setIncomingCall } = useCall();
     const socket = useRef(null);
     const remoteRTCMessage = useRef(null);
     const otherUserId = useRef(null);
     const getData = async () => {
          try {
               const value = await AsyncStorage.getItem('USER_DATA');
               if (value !== null) {
                    setuser(JSON.parse(value))
                    // console.log(value)
               }
          } catch (e) {

          }
     };

     useEffect(() => {
          getData()
     }, [])

     useEffect(() => {
          socket.current = SocketIOClient('http://192.168.31.57:4000', {
               query: {
                    callerId: user?.id,
               },
          });

          socket.current.on('newCall', data => {
               remoteRTCMessage.current = data.rtcMessage;
               otherUserId.current = data.callerId;
               setIncomingCall({
                    callerId: data.callerId,
                    rtcMessage: data.rtcMessage,
               });
          });

          

          // Other socket event handlers

          return () => {
               socket.current.disconnect();
          };
     }, [user]);
     return (
          <View style={styles.container}>
               {children}
          </View>
     )
}

export default Wrapper

const styles = StyleSheet.create({
     container: {
          flex: 1
     }
})