import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, ScrollView, StatusBar
} from "react-native";
import React, { useState } from "react";
import styles from "./style";FontAwesome
import { Colors } from '../../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Calibri } from "../../Constants/Fonts";
import { Images } from "../../Constants/ImageIconContant";
import { ColorSpace } from "react-native-reanimated";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');




  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
     <Image source={require('../../assets/images/loginbg.png')} style={{height:'100%',width:'100%', position:'absolute'}} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: responsiveWidth(5), }}>

        <View style={{ width: "100%", marginTop: '25%',justifyContent:'center' }}>
          <View >
            <Image
              style={styles.splashLogo}
              source={Images.profile}
            />
            <Text style={{alignSelf:'center',color:'#555',fontSize:responsiveFontSize(2.4),marginVertical:responsiveWidth(5)}}>Hello Maria!</Text>
            <View style={styles.inputContainer}>
            <Text style={{fontSize:responsiveFontSize(1.8)}}>User Id</Text>
              {/* <FontAwesome style={{ marginLeft: responsiveWidth(2.5) }} name="user" color={Colors.primary} size={responsiveWidth(6)} /> */}
              <TextInput
                value={email}
                cursorColor={Colors.primary}
                onChangeText={(txt) => setEmail(txt)}
                selectionColor={'#ccc'}
                // placeholder="User Name"
                // placeholderTextColor={Colors.grey}
                style={styles.inputfild}
              />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            
            <View style={styles.inputContainer}>
              <Text style={{fontSize:responsiveFontSize(1.8)}}>Password</Text>
              {/* <FontAwesome style={{ marginLeft: 10 }} name="lock" color={Colors.primary} size={responsiveWidth(6)} /> */}
              <TextInput
                value={pass}
                cursorColor={Colors.primary}
                placeholderTextColor={Colors.grey}
                onChangeText={(pas) => setPass(pas)}
                // placeholder="Password"
                secureTextEntry
                style={styles.inputfild}
              />
            </View>

          </View>
          
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('ChatList')
            }}>
              <Image resizeMode={'cover'} source={require('../../assets/images/btn.png')} style={{height:'100%',width:'100%', }} />

            <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(2), color: "#fff", fontFamily: Calibri.bold,position:'absolute',bottom:responsiveWidth(11) }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        

        
         
        </View>
      </ScrollView>
     
    </View>
  )
}

export default Login;