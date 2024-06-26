import React from 'react';
import { View, StyleSheet } from 'react-native';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
export default function VideoCall({route,navigation}) {
  const { userId, isVideo, localUserId, f_name, fcm_token, rtcMessage, typec } = route.params;
    const u_data = String(userId)
    const l_data = String(localUserId)
    console.log(u_data,l_data)
    return (
        <View style={styles.container}>
          {localUserId &&  <ZegoUIKitPrebuiltCall
                appID={1454304930}
                appSign="b4ff08109be39e8f1b77d70a52847ac94062a743ce47f9b9dfd3ad23ca66e6f8"
                userID={l_data} // userID can be something like a phone number or the user id on your own user system. 
                userName={f_name}
                callID={"videocall"} // callID can be any unique string. 

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onCallEnd: (callID, reason, duration) => { 
                      
                     },
                }}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
  },
});
