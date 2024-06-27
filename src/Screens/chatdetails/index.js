
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
//import { GiftedChat } from 'react-native-gifted-chat'
import HeaderBack from '../../Component/HeaderBack';
import Chat from './Chat';
// create a component
const ChatDetails = ({ props, route, navigation}) => {
	
	const userId = route?.params?.userId;
	const recipientId = route?.params?.recipientId;
    const user = route?.params?.user;
    const UserName = route?.params?.UserName;
    const [status,setstatus] = useState(null)


  return (
    <View style={{flex:1}}>
      <HeaderBack
	  user={user}
    status={status}
 	  />
    <Chat userId={recipientId} UserName={UserName} currentuser={userId} setstatus={setstatus} />
    </View>

  )
};


export default ChatDetails;
