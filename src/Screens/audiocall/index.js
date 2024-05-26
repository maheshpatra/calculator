
import React, { useEffect, useState } from 'react';
import {
  Text, View, TextInput, ScrollView, Image, Pressable, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, SafeAreaView, Linking, FlatList, Alert, Platform, ActivityIndicator
} from "react-native";
import Styles from './style';
import { Colors } from '../../Constants/Colors'
import { Calibri } from '../../Constants/Fonts';
import { Images } from '../../Constants/ImageIconContant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Icon } from 'react-native-basic-elements';
import Swiper from "react-native-swiper";
import { ImageSlider } from "react-native-image-slider-banner";
import HeaderBack from '../../Component/HeaderBack';
import LinearGradient from 'react-native-linear-gradient';
// create a component
const AudioCall = ({ props, route, navigation }) => {

  const styles = Styles();

  return (
    <View style={{ flex: 1, }}>
      <LinearGradient start={{ x: 0, y: 0 }} colors={['#8C228A', '#DF0D89']} style={{ height: '100%', width: '100%', alignItems: 'center', alignSelf: 'flex-end', flexDirection: 'row' }}>
        <View  style={{ height: responsiveWidth(28), width: responsiveWidth(28), position: 'absolute', top: 20, right: responsiveWidth(34),borderRadius:responsiveWidth(28) }}>
        <Image source={require('../../assets/images/person.jpg')} style={{ height: responsiveWidth(28), width: responsiveWidth(28), borderRadius:responsiveWidth(28) }} />
        <Text style={{alignSelf:'center',fontSize:18,color:'#fff',fontWeight:'bold'}}>Beverly Gray</Text>
        </View>
        {/* <Image source={require('../../assets/images/person.jpg')} style={{ height: responsiveWidth(28), width: responsiveWidth(28), position: 'absolute', top: 20, right: responsiveWidth(34),borderRadius:responsiveWidth(28) }} />
        <Text style={{position: 'absolute', top: re, right: responsiveWidth(38),}}>Beverly Gray</Text> */}
        <View style={{ height: 59, position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Print')} style={{ width: '25%', alignItems: 'center', }}>
            <Feather color={'#999'} name='volume-2' size={responsiveFontSize(2.9)} style={{ borderRadius: 25, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Print')} style={{ width: '25%', alignItems: 'center', }}>
            <Feather color={'#999'} name='video' size={responsiveFontSize(2.8)} style={{}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Print')} style={{ width: '25%', alignItems: 'center', }}>
            <FontAwesome color={'#999'} name='microphone-slash' size={responsiveFontSize(2.8)} style={{}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Print')} style={{ width: '25%', alignItems: 'center' }}>
            <MaterialIcons color={'#fff'} name='call-end' size={responsiveFontSize(2.8)} style={{ backgroundColor: '#E70B89', padding: 10, borderRadius: 30 }} />
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </View>
    // <SkeletonPlaceholder >
    //    <SkeletonPlaceholder.Item width={ responsiveWidth(92)} height={100} alignSelf='center' borderRadius={10} marginTop={30} />
    //    <SkeletonPlaceholder.Item width={ responsiveWidth(92)} height={50} alignSelf='center' marginTop={15} borderRadius={10} />
    //    <SkeletonPlaceholder.Item width={ responsiveWidth(92)} height={50} alignSelf='center' marginTop={15} borderRadius={10} />
    //    <SkeletonPlaceholder.Item width={ responsiveWidth(92)} height={50} alignSelf='center' marginTop={15} borderRadius={10} />
    //    <SkeletonPlaceholder.Item width={ responsiveWidth(92)} height={50} alignSelf='center' marginTop={15} borderRadius={10} />


    // </SkeletonPlaceholder>


  );
};


export default AudioCall;
