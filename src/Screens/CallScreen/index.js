import React, { useEffect, useState, useRef } from 'react';
import { View,TextInput, TouchableOpacity, StyleSheet, Alert, Button,Text } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, MediaStream } from 'react-native-webrtc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Peer from 'peerjs';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.31.57:4000';
const CallScreen = ({ route, navigation }) => {
  const {  isVideo, localUserId } = route.params;
  const ws = useRef(null);
  const pc = useRef(new RTCPeerConnection());
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [userId, setUserId] = useState(null);
  const socket = io('http://192.168.31.57:4000');
  let peerConnection;


  useEffect(() => {
    const init = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (!storedUserId) {
        const newUserId = generateUniqueId(); // Replace with your unique ID generation logic
        // await AsyncStorage.setItem('userId', newUserId);
        setUserId(newUserId);
        socket.emit('register', newUserId);
      } else {
        setUserId(storedUserId);
        socket.emit('register', storedUserId);
      }
      const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
      setLocalStream(stream);
    };
    init();

    

    socket.on('incomingCall', (data) => {
      // PushNotification.localNotification({
      //   title: 'Incoming Call',
      //   message: `Call from ${data.from}`,
      //   actions: ['Accept', 'Reject'],
      //   userInfo: { from: data.from }
      // });
    });

    // PushNotification.configure({
    //   onNotification: (notification) => {
    //     const { from } = notification.userInfo;
    //     if (notification.action === 'Accept') {
    //       acceptCall(from);
    //     } else if (notification.action === 'Reject') {
    //       rejectCall(from);
    //     }
    //   }
    // });

    socket.on('offer', async (data) => {
      if (!peerConnection) await createPeerConnection(data.from);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', { to: data.from, answer });
    });

    socket.on('answer', async (data) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on('iceCandidate', async (data) => {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    });

    return () => {
      socket.disconnect();
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  const createPeerConnection = async (remoteUserId) => {
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('iceCandidate', { to: remoteUserId, candidate: event.candidate });
      }
    };
    peerConnection.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
  };

  const acceptCall = async (from) => {
    setIsCalling(true);
    await createPeerConnection(from);
    socket.emit('acceptCall', { from });
  };

  const rejectCall = (from) => {
    socket.emit('rejectCall', { from });
  };

  const initiateCall = async (to) => {
    setIsCalling(true);
    await createPeerConnection(to);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { to, offer });
  };

  const renderVideo = () => (
    <View style={{ flex: 1 }}>
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ flex: 1 }} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ flex: 1 }} />}
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isCalling ? (
        renderVideo()
      ) : (
        <TouchableOpacity
          onPress={() => initiateCall('88888888')}
          style={{ padding: 20, backgroundColor: 'blue', borderRadius: 10 }}
        >
          <Text style={{ color: 'white' }}>Call</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtcView: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  controlButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 50,
  },
  endCallButton: {
    backgroundColor: '#f00',
  },
  localStream: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
  },
  remoteStream: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
  },input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default CallScreen;
