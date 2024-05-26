//import liraries
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Styles from './style';
import { Colors } from '../../Constants/Colors';
import { Images } from '../../Constants/ImageIconContant';

import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';

// create a component
const Initial = ({navigation}) => {
	const [input, setInput] = useState('');
	const [result, setResult] = useState('');

	const handlePress = (value) => {
		if (value === '=') {
		  try {
			setResult(eval(input).toString());
		  } catch (e) {
			setResult('Error');
		  }
		} else if (value === 'AC') {
		  setInput('');
		  setResult('');
		} else if (value === '⌫') {
		  setInput(input.slice(0, -1));
		} else if (value === '%') {
		  try {
			setResult((parseFloat(input) / 100).toString());
		  } catch (e) {
			setResult('Error');
		  }
		} else {
		  setInput(input + value);
		}
	  };

	  const data= [
		{
			value:'AC',
			bg:'#D9E0F9'
		},
		{
			value:'⌫',
			bg:'#D9E0F9'
		},{
			value:'+/-',
			bg:'#D9E0F9'
		},{
			value:'/',
			bg:'#D9E0F9'
		},
		{
			value:'7',
			bg:'#F2F0F5'
		},
		{
			value:'8',
			bg:'#F2F0F5'
		},
		{
			value:'9',
			bg:'#F2F0F5'
		},
		{
			value:'*',
			bg:'#D9E0F9'
		},{
			value:'4',
			bg:'#F2F0F5'
		}
		,{
			value:'5',
			bg:'#F2F0F5'
		},{
			value:'6',
			bg:'#F2F0F5'
		},
		{
			value:'-',
			bg:'#D9E0F9'
		},
		{
			value:'1',
			bg:'#F2F0F5'
		}
		,{
			value:'2',
			bg:'#F2F0F5'
		},{
			value:'3',
			bg:'#F2F0F5'
		},
		{
			value:'+',
			bg:'#D9E0F9'
		},
		{
			value:'%',
			bg:'#F2F0F5'
		}
		,{
			value:'0',
			bg:'#F2F0F5'
		},{
			value:'.',
			bg:'#F2F0F5'
		},
		{
			value:'=',
			bg:'#405D95'
		},
	  ]
	
	  return (
		<View style={styles.container}>
			<Entypo onPress={()=>navigation.navigate('Login')} style={{ position:'absolute',top:10,right:20 }} name="dots-three-vertical" color={'#555'} size={responsiveScreenWidth(5)} />
		  <View style={styles.resultContainer}>
			<Text style={styles.resultText}>{input}</Text>
			<Text style={styles.resultText}>{result}</Text>
		  </View>
		  <View style={styles.numpadContainer}>
			{data.map((item) => (
			  <TouchableOpacity key={item} style={[styles.button,{ backgroundColor: item.bg}]} onPress={() => handlePress(item.value)}>
				<Text style={styles.buttonText}>{item.value}</Text>
			  </TouchableOpacity>
			))}
		  </View>
		</View>
	  );
	}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	resultContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end',
		padding: 20,
	},
	resultText: {
		fontSize: 36,
		color: '#000',
	},
	numpadContainer: {
		height:'48%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopWidth:1,
		borderColor:'#ccc',
		paddingTop:15
	},
	button: {
		width: '21%',
		height: '16%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
		margin: 5,
		borderRadius: 30,
	},
	buttonText: {
		fontSize: responsiveFontSize(3.2),
		fontWeight:'bold',	
		color: '#000',
	},
});
//make this component available to the app
export default Initial;
