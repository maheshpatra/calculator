
import { StyleSheet } from 'react-native';
import{ Colors} from '../../Constants/Colors'
import { Calibri } from '../../Constants/Fonts';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
const Styles = () => {
    return StyleSheet.create({
        container: {flex: 1, backgroundColor: Colors.backgroundColor},
        sliderContainer: {
            height: responsiveHeight(30),
            width: responsiveWidth(100),
            paddingTop: responsiveHeight(2),
            paddingBottom: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(4),
            overflow:"hidden",
            borderRadius: 10, 
          }, button:{
            height: responsiveWidth(12),
            width: "90%",
            backgroundColor: '#333',
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: responsiveWidth(6),
            borderRadius: 5,
          },
    });
  };
  export default Styles;
