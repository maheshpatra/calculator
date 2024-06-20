import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RTCView } from 'react-native-webrtc';
import IconContainer from '../../Component/IconContainer';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const WebrtcRoomScreen = ({
  localStream,
  remoteStream,
  localMicOn,
  localWebcamOn,
  setLocalMicOn,
  setLocalWebcamOn,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#050A0E' }}>
      {remoteStream && (
        <RTCView streamURL={remoteStream.toURL()} style={{ flex: 1 }} objectFit="cover" />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
        <TouchableOpacity onPress={() => setLocalMicOn(!localMicOn)}>
          <IconContainer>
            <MaterialIcons name={localMicOn ? 'mic' : 'mic-off'} size={40} color="white" />
          </IconContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLocalWebcamOn(!localWebcamOn)}>
          <IconContainer>
            <MaterialIcons
              name={localWebcamOn ? 'videocam' : 'videocam-off'}
              size={40}
              color="white"
            />
          </IconContainer>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WebrtcRoomScreen;
