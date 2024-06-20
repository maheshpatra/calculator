import io from 'socket.io-client';

export const initSocket = localUserId => {
  const socket = io('http://your-server-url', {
    query: {
      userId: localUserId,
    },
  });
  return socket;
};

export const handleSocketEvents = (socket, peerConnection, remoteRTCMessage, setType, setIncomingCall) => {
  socket.current.on('call', data => {
    remoteRTCMessage.current = data;
    setType('INCOMING_CALL');
    setIncomingCall(true);
  });

  socket.current.on('accept', data => {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    setType('WEBRTC_ROOM');
  });

  socket.current.on('ICEcandidate', data => {
    const candidate = new RTCIceCandidate(data.candidate);
    peerConnection.current.addIceCandidate(candidate);
  });
};

export const disconnectSocket = socket => {
  socket.current.disconnect();
};
