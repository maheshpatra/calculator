import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';

export const setupPeerConnection = (peerConnection, setLocalStream, setRemoteStream, ICE_SERVERS) => {
  peerConnection.current = new RTCPeerConnection(ICE_SERVERS);

  peerConnection.current.onicecandidate = event => {
    if (event.candidate) {
      // send the candidate to the remote peer
      sendICEcandidate(event.candidate);
    }
  };

  peerConnection.current.ontrack = event => {
    setRemoteStream(event.streams[0]);
  };

  mediaDevices.getUserMedia({
    audio: true,
    video: true,
  }).then(stream => {
    setLocalStream(stream);
    stream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, stream);
    });
  });
};

export const sendICEcandidate = candidate => {
  // send candidate to the server
};

export const processCall = (peerConnection, otherUserId, sendCall) => {
  peerConnection.current.createOffer().then(offer => {
    return peerConnection.current.setLocalDescription(new RTCSessionDescription(offer));
  }).then(() => {
    sendCall({
      offer: peerConnection.current.localDescription,
      to: otherUserId.current,
    });
  });
};

export const processAccept = (otherUserId, setType) => {
  // process the acceptance of the call
  setType('WEBRTC_ROOM');
};
