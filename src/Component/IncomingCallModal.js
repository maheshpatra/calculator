import React, { useEffect, useState,useRef  } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCall } from '../context/callcontext';
import InCallManager from 'react-native-incall-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import IconContainer from './IconContainer';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const IncomingCallModal = () => {

  const [user,setuser]=useState(null)
  const navigation = useNavigation();
  useEffect(()=>{
       getData()
  },[])
 


  const getData = async () => {
       try {
         const value = await AsyncStorage.getItem('USER_DATA');
         if (value !== null) {
            setuser(JSON.parse(value))
         }
       } catch (e) {
         
       }
     };
    
  const { incomingCall, setIncomingCall } = useCall();

  const handleAcceptCall = () => {
      setIncomingCall(null);
      navigation.navigate('VideoCall', {
          userId: incomingCall.callerId,
          rtcMessage: incomingCall.rtcMessage,
          isVideo: true,
          localUserId: user.id,
      });
  };

  const handleRejectCall = () => {
      setIncomingCall(null);
      InCallManager.stop();
  };

  if (!incomingCall) {
      return null;
  }

    return (
        <Modal transparent visible>
            <View
      style={{
        flex: 1,
        backgroundColor: '#050A0E',
      }}>
      <View
        style={{
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#ffff',
          }}>
          Incoming call from
        </Text>
        <Text
          style={{
            fontSize: 28,
            color: '#5568FE',
            fontWeight: 'bold',
            marginTop: 12,
          }}>
          {incomingCall?.callerId}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '60%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 50,
        }}>
           <IconContainer
            backgroundColor={'#FF5D5D'}
            onPress={handleRejectCall}
            Icon={() => {
              return <MaterialIcons name="call-end" color={'#fff'}  size={responsiveFontSize(2.8)} />;
            }}
          />
        
        <IconContainer
            backgroundColor={'#4AC76D'}
            onPress={handleAcceptCall}
            Icon={() => {
              return <Feather name="check" color={'#fff'}  size={responsiveFontSize(2.8)} />;
            }}
          />
        
      </View>
    </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default IncomingCallModal;
