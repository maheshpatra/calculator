import React, { useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Actions, Composer, Send, Bubble } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import { sendMessage, getMessages } from './api';

const Chat = ({ userId, recipientId, UserName }) => {

  const [messages, setMessages] = useState([]);

  const generateChatId = (userId, recipientId) => {
    return [userId, recipientId].sort().join('-');
  };

  const chatId = generateChatId(userId, recipientId);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(chatId);
      setMessages(
        fetchedMessages.data.map(message => ({
          ...message,
          createdAt: new Date(message.createdAt),
        }))
      );
    };

    fetchMessages();
  }, [chatId]);

  const onSend = useCallback((newMessages = []) => {
    const message = newMessages[0];
    sendMessage(chatId, message);
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, [chatId]);

  const handleAttachPress = async () => {
    const options = {
      title: 'Select Attachment',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      mediaType: 'mixed',
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const image = {
          _id: Math.round(Math.random() * 1000000).toString(),
          image: response.uri,
          user: {
            _id: userId,
			name: UserName,
          },
          createdAt: new Date(),
        };
        onSend([image]);
      }
    });
  };

  const handleCameraPress = async () => {
    const options = {
      mediaType: 'photo',
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error:', response.error);
      } else {
        const image = {
          _id: Math.round(Math.random() * 1000000).toString(),
          image: response.uri,
          user: {
            _id: userId,
			name: UserName,
          },
          createdAt: new Date(),
        };
        onSend([image]);
      }
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: userId,
		name: UserName,	
      }}
      renderActions={() => (
        <Actions
          options={{
            'Attach': handleAttachPress,
            'Camera': handleCameraPress,
          }}
        />
      )}
      renderComposer={props => (
        <Composer
          {...props}
          placeholder='Type your message...'
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
      renderSend={props => (
        <Send {...props}>
          <View style={{ marginRight: 10, marginBottom: 5 }}>
            <Text style={{ color: '#007AFF', fontSize: 18 }}>Send</Text>
          </View>
        </Send>
      )}
	  renderBubble={props => {
        const isCurrentUser = props.currentMessage.user._id === props.user._id;
        return (
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
            position={isCurrentUser ? 'right' : 'left'}
          />
        );
      }}
    />
  );
};

export default Chat;
