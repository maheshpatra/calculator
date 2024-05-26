
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
          },
    });
  };
  export default Styles;
