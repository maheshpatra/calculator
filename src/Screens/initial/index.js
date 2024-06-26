//import liraries
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Styles from './style';
import { Colors } from '../../Constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
// create a component
const Initial = (props) => {
	const [input, setInput] = useState('');
	const [result, setResult] = useState('');
	const [nextParenthesis, setNextParenthesis] = useState('('); // Track the next parenthesis
	const [user, setuser] = useState(null)

	// useEffect(() => {
		
	// }, [])
	useFocusEffect(
		React.useCallback(() => {
			getData()
		}, [props])
	);




	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem('USER_DATA');
			if (value !== null) {
				const udata= JSON.parse(value)
				setuser(JSON.parse(value))
				onUserLogin(String(udata.id),String(udata.first_name+" "+udata.last_name),props)
			}
		} catch (e) {

		}
	};






	const uservalidation = () => {
		if (user) {
			props.navigation.navigate('ChatList', { user: user })
		} else {
			props.navigation.navigate('Login')
		}
	}

	// useEffect(() => {
	//      getData()
	// }, [])
	const getDeviceTocket = async () => {
		let tocken = await messaging().getToken();
		//   console.log(tocken);
	}
	
	useEffect(() => {
		getDeviceTocket();
		getData()
	}, [])

	const onUserLogin = async (userID, userName, props) => {
		return ZegoUIKitPrebuiltCallService.init(
			1454304930,
			"b4ff08109be39e8f1b77d70a52847ac94062a743ce47f9b9dfd3ad23ca66e6f8",
			userID, // It can be any valid characters, but we recommend using a phone number.
			userName,
			[ZIM, ZPNs],
			{
				ringtoneConfig: {
					incomingCallFileName: 'zego_incoming.wav',
					outgoingCallFileName: 'zego_outgoing.mp3',
				},
				notifyWhenAppRunningInBackgroundOrQuit: true,
				androidNotificationConfig: {
					channelID: "CalculatorVideoCall",
					channelName: "CalculatorVideoCall",
				},requireConfig: (data) => {
					return {
					  onCallEnd: (callID, reason, duration) => {
					    console.log('########CallWithInvitation onCallEnd', callID, reason, duration);
					    props.navigation.navigate('ChatList', {user:user});
					  }
					}
				}

			}).then(() => {
				// /////////////////////////
				ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
					message: 'We need your consent for the following permissions in order to use the offline call function properly',
					allow: 'Allow',
					deny: 'Deny',
				});
				// /////////////////////////
			});
	}



	// useEffect(() => {
	// 	const unsubscribe = messaging().onMessage(async remoteMessage => {
	// 		// return (<IncomingCallModal />)
	// 	  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
	// 	});

	// 	return unsubscribe;
	//    }, []);

	const handlePress = (value) => {



		if (value === '=') {
			try {
				const expression = input.replace(/%/g, '/100*');
				const res = eval(expression);
				setResult(res.toString());

				//setResult(eval(input).toString());
			} catch (e) {
				setResult('Error');
			}
		} else if (value === 'AC') {
			setInput('');
			setResult('');
		} else if (value === '⌫') {
			setInput(input.slice(0, -1));
		} else if (value === '()') {
			setInput(input + nextParenthesis);
			setNextParenthesis(nextParenthesis === '(' ? ')' : '('); // Toggle parenthesis
		} else {
			setInput(input + value);
		}
	};

	const data = [
		{
			value: 'AC',
			bg: '#D9E0F9'
		},
		{
			value: '⌫',
			bg: '#D9E0F9'
		}, {
			value: '()',
			bg: '#D9E0F9'
		}, {
			value: '/',
			bg: '#D9E0F9'
		},
		{
			value: '7',
			bg: '#F2F0F5'
		},
		{
			value: '8',
			bg: '#F2F0F5'
		},
		{
			value: '9',
			bg: '#F2F0F5'
		},
		{
			value: '*',
			bg: '#D9E0F9'
		}, {
			value: '4',
			bg: '#F2F0F5'
		}
		, {
			value: '5',
			bg: '#F2F0F5'
		}, {
			value: '6',
			bg: '#F2F0F5'
		},
		{
			value: '-',
			bg: '#D9E0F9'
		},
		{
			value: '1',
			bg: '#F2F0F5'
		}
		, {
			value: '2',
			bg: '#F2F0F5'
		}, {
			value: '3',
			bg: '#F2F0F5'
		},
		{
			value: '+',
			bg: '#D9E0F9'
		},
		{
			value: '%',
			bg: '#F2F0F5'
		}
		, {
			value: '0',
			bg: '#F2F0F5'
		}, {
			value: '.',
			bg: '#F2F0F5'
		},
		{
			value: '=',
			bg: '#405D95'
		},
	]

	return (
		<View style={styles.container}>
			<Entypo onPress={uservalidation} style={{ position: 'absolute', top: 10, right: 20, padding: 8 }} name="dots-three-vertical" color={'#555'} size={responsiveScreenWidth(5.5)} />
			<View style={styles.resultContainer}>
				<Text style={styles.resultText}>{input}</Text>
				<Text style={styles.resultText}>{result}</Text>
			</View>
			<View style={styles.numpadContainer}>
				{data.map((item, rowIndex) => (
					<TouchableOpacity key={rowIndex} style={[styles.button, { backgroundColor: item.bg }]} onPress={() => handlePress(item.value)}>
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
		height: '48%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopWidth: 1,
		borderColor: '#ccc',
		paddingTop: 15
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
		fontWeight: 'bold',
		color: '#000',
	},
});
//make this component available to the app
export default Initial;
