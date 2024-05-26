
import React, { useEffect, useState } from 'react';
import {
  Text, View, TextInput, ScrollView, Image, Pressable, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, SafeAreaView, Linking, FlatList, Alert, Platform, ActivityIndicator
} from "react-native";
import Styles from './style';
import { Colors } from '../../Constants/Colors'
import { Calibri } from '../../Constants/Fonts';
import { Images } from '../../Constants/ImageIconContant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Icon } from 'react-native-basic-elements';
import Swiper from "react-native-swiper";
import { ImageSlider } from "react-native-image-slider-banner";
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../Component/Header';
import LinearGradient from 'react-native-linear-gradient';
// create a component
const ChatList = ({ props, route, navigation }) => {

  const [selectedClass, setSelectedClass] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  const [select, setSelected] = useState();
  const listViewData = [
    {
      name: 'Anil Jana',
      profile: 'https://picsum.photos/id/456/200/200'
    },
    {
      name: 'Ajit Maity',
      profile: 'https://picsum.photos/id/400/200/200'
    },
    {
      name: 'Suan Sing',
      profile: 'https://picsum.photos/id/345/200/200'
    }
  ]
  const styles = Styles();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <ScrollView>




        <SwipeListView
          data={listViewData}
          renderItem={(data, rowMap) => (
            <Pressable onPress={()=>navigation.navigate('ChatDetails')} style={{ backgroundColor: '#fff', width: '108%', alignSelf: 'center', padding: 12, borderBottomRightRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: .8, borderColor: '#ddd' }}>
              <Image
                source={{ uri: data.item.profile }}
                style={{ height: responsiveFontSize(5.5), width: responsiveFontSize(5.5), marginLeft: responsiveFontSize(3), borderRadius: responsiveFontSize(3), }}
              />
              <View style={{ marginLeft: responsiveWidth(2.5), width: '68%' }}>

                <Text style={{fontWeight:'bold',color:'#555',fontSize:responsiveFontSize(2)}}>{data.item.name}</Text>
                <Text style={{}}><MaterialCommunityIcons size={responsiveFontSize(2.2)} name='check-all' color={'#2FBFFF'} />{" Hii , 7:05 PM"}</Text>

              </View>
              <Text style={{ padding: 3, paddingHorizontal: 8, borderRadius: 18, backgroundColor: Colors.primary, color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>1</Text>

            </Pressable>
          )}
          renderHiddenItem={(data, rowMap) => (

            <LinearGradient  start={{x: 0, y: 1}} colors={['#8C228A', '#DF0D89']} style={{ height:'100%', width: '35%', alignItems: 'center', alignSelf: 'flex-end' ,flexDirection:'row'}}>
              <TouchableOpacity onPress={() => navigation.navigate('ChatDetails')} style={{  width: '32%', alignItems: 'center',  }}>
                <Ionicons color={'#fff'} name='chatbubble-ellipses-outline' size={responsiveFontSize(2.8)} style={{  borderRadius: 25,marginLeft:responsiveWidth(4) }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AudioCall')} style={{  width: '30%', alignItems: 'center',  }}>
                <Feather color={'#fff'} name='phone-call' size={responsiveFontSize(2.6)} style={{  borderRadius: 25,marginLeft:10 }} />
              </TouchableOpacity> 
              <TouchableOpacity onPress={() => navigation.navigate('VideoCall')} style={{  width: '30%', alignItems: 'center',  }}>
                <Feather color={'#fff'} name='video' size={responsiveFontSize(2.8)} style={{  borderRadius: 25,marginLeft:10 }} />
              </TouchableOpacity>
            </LinearGradient>
          )}
          rightOpenValue={-responsiveWidth(35)}
        />

      </ScrollView>
    </View>

    // <SkeletonPlaceholder >
    //   <SkeletonPlaceholder.Item width={responsiveWidth(92)} height={160} alignSelf='center' borderRadius={10} />
    //   <SkeletonPlaceholder.Item width={responsiveWidth(92)} height={40} alignSelf='center' marginTop={20} borderRadius={10} />
    //   <SkeletonPlaceholder.Item width={responsiveWidth(92)} height={40} alignSelf='center' marginTop={20} borderRadius={10} />
    //   <SkeletonPlaceholder.Item width={responsiveWidth(92)} height={40} alignSelf='center' marginTop={20} borderRadius={10} />
    //   <SkeletonPlaceholder.Item width={responsiveWidth(92)} height={40} alignSelf='center' marginTop={20} borderRadius={10} />




    // </SkeletonPlaceholder>


  );
};


export default ChatList;
