import React, { useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Actions, Composer, Send, Bubble } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import { firebase } from '../../../firebase';

const Chat = ({ userId, recipientId, UserName }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt?doc.data().createdAt.toDate():new Date(),
          user: {
            _id: doc.data().user._id
          },
        }));
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, []);


  const onSend = async (newMessages = []) => {
    const text = newMessages[0].text;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const uid = recipientId;
    const displayName = UserName;

    await firebase.firestore().collection('messages').add({
      text,
      createdAt,
      user: {
        _id: uid
      },
    });
  };

 

  return (
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId
        }}
        renderSend={props => (
          <Send {...props}>
            <View style={{ marginRight: 10, height:'100%',width:'90%',justifyContent:'center',alignItems:'center' }}>
              <Text style={{ color: '#007AFF', fontSize: 18,marginBottom:5 }}>Send</Text>
            </View>
          </Send>
        )}
        renderComposer={props => (
          <Composer
            {...props}
            placeholder='Type your message...'
            placeholderTextColor='#999'
            textInputStyle={{
              backgroundColor: '#F0F0F0',
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              fontSize: 16,
            }}
          />
        )}
        renderBubble={props => {
          const isCurrentUser = props.currentMessage.user._id === props.user._id;
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#007AFF',
                  marginRight:20
                },
                left: {
                  backgroundColor: '#E5E5EA',
                  marginLeft:20
                },
              }}
              textStyle={{
                right: {
                  color: '#FFFFFF',
                },
                left: {
                  color: '#000000',
                },
              }}
              position={isCurrentUser ? 'left' : 'right'}
            />
          );
        }}
      />
  );
};

export default Chat;
