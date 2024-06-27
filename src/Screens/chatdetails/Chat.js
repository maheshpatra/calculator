import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Send, Bubble, Composer } from 'react-native-gifted-chat';
import { firebase } from '../../../firebase';

const Chat = ({ userId, currentuser,setstatus }) => {
  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState('offline');
  const currentUserId = currentuser;

  useEffect(() => {

    // const userStatusRef = firebase.firestore().collection('users').doc(userId);
    // const unsubscribeStatus = userStatusRef.onSnapshot(doc => {
    //   if (doc.exists) {
    //     setUserStatus(doc.data().status);
    //     // setstatus(doc.data().status);
    //     console.log(doc.data().status)
    //   }
    // });


    const chatId = [currentUserId, userId].sort().join('_'); // Unique chat ID based on user IDs
    const unsubscribe = firebase.firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            user: {
              _id: data.senderId === currentUserId ? currentUserId : userId,
            },
          };
        });
        setMessages(fetchedMessages);
      });

    return () => {
      unsubscribe()
      unsubscribeStatus()
    }
  }, [userId]);

  const onSend = async (newMessages = []) => {
    const text = newMessages[0].text;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const chatId = [currentUserId, userId].sort().join('_');
    await firebase.firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        senderId: currentUserId,
        text,
        createdAt,
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: currentUserId,
      }}
      renderSend={props => (
        <Send {...props}>
          <View style={{ marginRight: 10, height: '100%', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#007AFF', fontSize: 18, marginBottom: 5 }}>Send</Text>
          </View>
        </Send>
      )}
      renderComposer={props => (
        <Composer
          {...props}
          placeholder='Type your message...'
          placeholderTextColor='#999'
          textInputStyle={{
            color: '#555',
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
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#007AFF',
            },
            left: {
              backgroundColor: '#E5E5EA',
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
        />
      )}
    />
  );
};

export default Chat;
