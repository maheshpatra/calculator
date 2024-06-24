import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import TextInputContainer from '../../Component/TextInputContainer';
import SocketIOClient from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

import IconContainer from '../../Component/IconContainer';
import InCallManager from 'react-native-incall-manager';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useCall } from '../../context/callcontext';
const VideoCall = ({ route, navigation }) => {
  const { userId, isVideo, localUserId, f_name, fcm_token, rtcMessage, typec } = route.params;
  const [localStream, setLocalStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [type, setType] = useState('JOIN');
  const [localMicOn, setLocalMicOn] = useState(true);
  const [localWebcamOn, setLocalWebcamOn] = useState(true);
  const [processcall, setprocesscall] = useState(null);
  console.log(route.params)
  const otherUserId = useRef(null);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const remoteRTCMessage = useRef(null);
  const { setIncomingCall } = useCall();


  const ICE_SERVERS = {
    iceServers: [
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      { urls: 'stun:stun.stunprotocol.org:3478' },
      { urls: 'stun:stun.sipgate.net' },
      { urls: 'stun:stun.ideasip.com' },
      { urls: 'stun:stun.iptel.org' },
    ],
  };







  useEffect(() => {
    socket.current = SocketIOClient('http://192.168.31.57:4000', {
      query: {
        callerId: localUserId,
      },
    });


    socket.current.on('newCall', data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });

    socket.current.on('callAnswered', async data => {
      remoteRTCMessage.current = data.rtcMessage;
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );
      setType('WEBRTC_ROOM');
    });



    socket.current.on('ICEcandidate', data => {
      const candidate = new RTCIceCandidate(data.rtcMessage);
      peerConnection.current.addIceCandidate(candidate).catch(err => {
        console.error('Error adding received ICE candidate', err);
      });
    });

    const setupPeerConnection = () => {
      peerConnection.current = new RTCPeerConnection(ICE_SERVERS);

      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          sendICEcandidate({
            calleeId: otherUserId.current,
            rtcMessage: {
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate,
            },
          });
        } else {
          console.log('End of candidates.');
        }
      };

      peerConnection.current.ontrack = event => {
        setRemoteStream(event.streams[0]);
      };

      let isFront = true;

      mediaDevices.enumerateDevices().then(sourceInfos => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind == 'videoinput' &&
            sourceInfo.facing == (isFront ? 'user' : 'environment')
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }

        mediaDevices
          .getUserMedia({
            audio: true,
            video: {
              mandatory: {
                minWidth: 800,
                minHeight: 480,
                minFrameRate: 30,
              },
              facingMode: isFront ? 'user' : 'environment',
              optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
          })
          .then(stream => {
            setLocalStream(stream);
            stream.getTracks().forEach(track => {
              peerConnection.current.addTrack(track, stream);
            });
          })
          .catch(error => {
            console.error('Error accessing media devices:', error);
          });
      });
    };

    setupPeerConnection();

    return () => {
      socket.current.disconnect();
      peerConnection.current.close();
    };
  }, [localUserId]);

  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);

  const sendICEcandidate = data => {
    socket.current.emit('ICEcandidate', data);
  };

  const processCall = async () => {
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  };

  const processAccept = async () => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  };

  const answerCall = data => {
    socket.current.emit('answerCall', data);
  };

  const sendCall = data => {
    socket.current.emit('call', data);
  };


  useEffect(() => {
    if (typec === "INCOMING_CALL")

      remoteRTCMessage.current = rtcMessage
    otherUserId.current = userId
    setType('WEBRTC_ROOM');
    processAccept();

  }, [rtcMessage])

  useEffect(() => {
    const initiateCall = async () => {
      if (typec === 'OUTGOING_CALL') {
        otherUserId.current = userId;
        setType('OUTGOING_CALL');
        try {
          const sessionDescription = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(sessionDescription);
          setTimeout(() => {
            sendCall({
              calleeId: userId,
              rtcMessage: sessionDescription,
            });
          }, 2000);
        } catch (error) {
          console.error('Error creating offer or setting local description:', error);
        }
      }
    };
  
    initiateCall();
  }, [typec, userId]);




  const JoinScreen = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: '#050A0E',
        justifyContent: 'center',
        paddingHorizontal: 42,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View
            style={{
              padding: 35,
              backgroundColor: '#1A1C22',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 14,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#D0D4DD',
              }}>
              Your Caller ID
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 32,
                  color: '#ffff',
                  letterSpacing: 6,
                }}>
                {localUserId}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#1A1C22',
              padding: 40,
              marginTop: 25,
              justifyContent: 'center',
              borderRadius: 14,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#D0D4DD',
              }}>
              Enter call id of another user
            </Text>
            {/* <TextInputContainer
              placeholder={'Enter Caller ID'}
              value={otherUserId.current}
              setValue={text => {
                otherUserId.current = text;
                console.log('TEST', otherUserId.current);
              }}
              keyboardType={'number-pad'}
            /> */}
            <TextInput
        style={{
          margin: 8,
          padding: 8,
          width: '90%',
          textAlign: 'center',
          fontSize: 16,
          color: '#FFFFFF',
        }}
        multiline={true}
        numberOfLines={1}
        cursorColor={'#5568FE'}
        placeholder={'id'}
        placeholderTextColor={'#9A9FA5'}
        onChangeText={(text) => 
          otherUserId.current = text}
        value={otherUserId.current}
        keyboardType={'number-pad'}
      />
            <TouchableOpacity
              onPress={() => {
                setType('OUTGOING_CALL');
                processCall();
              }}
              style={{
                height: 50,
                backgroundColor: '#5568FE',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 16,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                }}>
                Call Now
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  const OutgoingCallScreen = () => (
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
          {loading ? "Connecting Please Wait.." : "Calling"}
        </Text>
        <Text
          style={{
            fontSize: 28,
            color: '#5568FE',
            fontWeight: 'bold',
            marginTop: 12,
          }}>
          {otherUserId.current}
        </Text>
      </View>
      <IconContainer
        backgroundColor={'#FF5D5D'}
        onPress={() => {
          setType('JOIN');
        }}
        Icon={() => {
          return <MaterialIcons name="call-end" color={'#fff'} size={responsiveFontSize(2.8)} />;
        }}
      />

    </View>
  );

  const IncomingCallScreen = () => (
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
          {otherUserId.current}
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
          onPress={() => {
            setType('JOIN');
          }}
          Icon={() => {
            return <MaterialIcons name="call-end" color={'#fff'} size={responsiveFontSize(2.8)} />;
          }}
        />

        <IconContainer
          backgroundColor={'#4AC76D'}
          onPress={() => {
            setType('WEBRTC_ROOM');
            processAccept();
          }}
          Icon={() => {
            return <Feather name="check" color={'#fff'} size={responsiveFontSize(2.8)} />;
          }}
        />

      </View>
    </View>
  );

  const WebrtcRoomScreen = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050A0E',

      }}>

      <View
        style={{
          flex: 1,
          backgroundColor: '#D0D4DD',

        }}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={{ width: '48%', height: '32%', position: 'absolute', top: 20, right: 5, zIndex: 1 }}
          />
        )}
        {remoteStream ? (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={{ width: '100%', height: '90%', }}
          />
        ) : (
          <Text>No remote stream available</Text>
        )}

      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute', bottom: 0, alignSelf: 'center', width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 15, backgroundColor: '#000', padding: 15
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: localWebcamOn ? '#4AC76D' : 'red',
            padding: 12,
            borderRadius: 30,
          }}
          onPress={() => {
            localStream.getVideoTracks().forEach(track => {
              track.enabled = !track.enabled;
              setLocalWebcamOn(track.enabled);
            });
          }}>
          <Ionicons name="videocam" size={30} color={'#D0D4DD'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: localMicOn ? '#4AC76D' : 'red',
            padding: 12,
            borderRadius: 30,
          }}
          onPress={() => {
            localStream.getAudioTracks().forEach(track => {
              track.enabled = !track.enabled;
              setLocalMicOn(track.enabled);
            });
          }}>
          <Ionicons name="mic" size={30} color={'#D0D4DD'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF5D5D',
            padding: 12,
            borderRadius: 30,
          }}
          onPress={() => {
            setType('JOIN');
          }}>
          <MaterialIcons name="call-end" size={30} color={'#D0D4DD'} />
        </TouchableOpacity>
      </View>




    </View>
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      {type === 'JOIN' && <JoinScreen />}
      {type === 'OUTGOING_CALL' && <OutgoingCallScreen />}
      {type === 'INCOMING_CALL' && <IncomingCallScreen />}
      {type === 'WEBRTC_ROOM' && <WebrtcRoomScreen />}
    </View>
  );
};

export default VideoCall;
