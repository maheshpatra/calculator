import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconContainer from '../../Component/IconContainer';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const OutgoingCallScreen = ({ otherUserId, setType }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#050A0E' }}>
      <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: '#ffff' }}>Calling</Text>
        <Text style={{ fontSize: 28, color: '#5568FE', fontWeight: 'bold', marginTop: 12 }}>{otherUserId}</Text>
      </View>
    </View>
  );
};

export default OutgoingCallScreen;
