
import React, { useState, useCallback, useEffect } from 'react'
import {
  Text, View, TextInput, ScrollView, Image, Pressable, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, SafeAreaView, Linking, FlatList, Alert, Platform, ActivityIndicator
} from "react-native";
import Styles from './style';
import { Colors } from '../../Constants/Colors'
import { Calibri } from '../../Constants/Fonts';
import { Images } from '../../Constants/ImageIconContant';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Icon } from 'react-native-basic-elements';
import Swiper from "react-native-swiper";
import { ImageSlider } from "react-native-image-slider-banner";
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import { GiftedChat } from 'react-native-gifted-chat'
import HeaderBack from '../../Component/HeaderBack';

// create a component
const ChatDetails = ({ props, route, navigation }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([


      {
        _id: 1,
        text: 'Hello developer ghfghfgh fdgdfgdgfdgfdfgdfgdfgdfgdfgdfg',
        createdAt: new Date(),

        // system: true,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://picsum.photos/id/456/200/200',

        },
      },

      {
        _id: 2,
        text: 'Hello developer the end',
        createdAt: new Date(),

        // system: true,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://picsum.photos/id/455/200/200',

        },
      },



    ])
  }, [])



  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <View style={{flex:1}}>
      <HeaderBack />
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      // renderAvatar={() => null}
      imageProps={{
        resizeMode: 'contain',
      }}

      imageStyle={{
        width: responsiveWidth(5),
        height: responsiveWidth (5),
      }}


      renderBubble={
        props => {
          return (
            <View style={{
              backgroundColor: props.currentMessage.user._id === 1 ? '#B5E8FF' : '#fff',
              borderRadius: 15,
              padding: 10,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              maxWidth: '80%',
              flex: 1,
            }}>
              <View style={{
                marginRight: 10,
                flex: 1,
              }}>
                <Text style={{
                  fontSize: 15,
                  color: props.currentMessage.user._id === 1 ? '#555' : '#555',
                }}>{props.currentMessage.text}</Text>
              </View>
            </View>
          )
        }
      }
    />
    </View>

  )
};


export default ChatDetails;
