import React, {useState, useRef, useEffect} from "react";
import {SafeAreaView, Image, StatusBar, Text, View, TextInput, TouchableOpacity, DevSettings, ActivityIndicator} from "react-native";
import {PRIMARY} from "../../constants/colors";
import {PHONE_NUMBER_TAKEN, INVALID_PHONE_NUMBER, EMPTY_FIELDS, INVALID_CODE, PASSWORD_NOT_MATCH, REQUEST_TIMEOUT, INVALID_FIRSTNAME_LASTNAME, SHORT_PASSWORD, HAVE_ACCOUNT, SERVERS_DOWN, REMEMBERED_PASSWORD_TEXT, INVALID_CREDINTIALS, FORGOT_ADMIN_NOT_AUTHORIZED} from "../../constants/strings";
import {COUNTRY_CODE, COUNTRY_TEST_CODE, PASSWORD_LENGTH, REQUEST_TIMEOUT_DURATION} from "../../constants/rules";
import style from "./style";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import firebase from "../../config/firebase";
import {LOGIN} from "../../constants/routeNames";
import FetchAPI from "../../utils/FetchAPI";
import {BAD_REQUEST, OK} from "../../constants/server";
import {GlobalData} from "../../context/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ForgotPassword({navigation}) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [verificationId, setVerificationId] = useState(null);
	const [code, setCode] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const recaptchaVerifier = useRef(null);
	const [requestTimeout, setRequestTimeout] = useState(REQUEST_TIMEOUT_DURATION);
	const {setAuthState} = GlobalData?.();
	const [activity, setActivity] = useState(false);
	let timeout = null;

	//Phone Auth region
	const sendVerification = async () => {
		//reset error message
		await setErrorMessage("");

		//start activity indicator
		await setActivity(true);

		//Check for empty fields
		if (phoneNumber.length === 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		if (phoneNumber.length != 10) {
			setErrorMessage(INVALID_PHONE_NUMBER);
			setActivity(false);
			return;
		}

		//Check if the phone number belongs to an admin, if so then stop the process because admins are not allowed to use this sign in method due to security
		let response = await FetchAPI("POST", "customer", "isadmin", {PhoneNumber: phoneNumber});

		if (response?.status === OK) {
			setErrorMessage(FORGOT_ADMIN_NOT_AUTHORIZED);
			setActivity(false);
			return;
		}

		//Check if the phone number already exists in the database, if so then continue with the process
		response = await FetchAPI("POST", "customer", "checkifnumberexist", {PhoneNumber: phoneNumber});

		if (response?.status === OK) {
			const phoneProvider = new firebase.auth.PhoneAuthProvider();
			await phoneProvider
				.verifyPhoneNumber(COUNTRY_CODE + phoneNumber, recaptchaVerifier.current)
				.then(setVerificationId)
				.then(e => {
					setRequestTimeout(REQUEST_TIMEOUT_DURATION);
					decreamentRequestTimeout();
				})
				.catch(e => setErrorMessage(INVALID_CREDINTIALS));
		} else if (response?.status == BAD_REQUEST) {
			setErrorMessage(INVALID_CREDINTIALS);
			setActivity(false);
			return;
		} else setErrorMessage(SERVERS_DOWN);

		//end activity indicator
		setActivity(false);
	};

	const confirmCode = async () => {
		//reset error message
		await setErrorMessage("");

		//start activity indicator
		await setActivity(true);

		//Check for empty fields
		if (code.length === 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		//Verify the code
		const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, code);

		await firebase
			.auth()
			.signInWithCredential(credential)
			.then(handleLogin)
			.catch(e => setErrorMessage(INVALID_CODE));

		//end activity indicator
		setActivity(false);
	};

	//This is a timer that tracks the verification proccess, if the user didn't verify the code in 120 seconds then the operation will be canceled
	const decreamentRequestTimeout = async () => {
		await setRequestTimeout(prevState => prevState - 1);
		timeout = setTimeout(decreamentRequestTimeout, 1000);
	};

	//Monitors the time for the tracker
	useEffect(() => {
		if (requestTimeout === -1) {
			clearTimeout(timeout);
			setPhoneNumber("");
			setErrorMessage(REQUEST_TIMEOUT);
			setVerificationId(null);
		}
	}, [requestTimeout]);

	//Registeration region
	const handleLogin = async () => {
		// get user data and sign him in

		let response = await FetchAPI("POST", "customer", "get", {PhoneNumber: phoneNumber});

		if (response?.status === OK) {
			setActivity(false);
			let data = await response.json();

			//Store the customer's data in the global state
			setAuthState(prevState => ({...prevState, customer: data, isLoggedIn: true}));
			//Add the customer to AsyncStorange so he doesn't have to relogin every time he opens the app (admins wont have this ability due to security concerns)
			await AsyncStorage.setItem("@Barbershop:Auth", JSON.stringify(data));

			setIsLoggedIn(true);
		} else {
			setErrorMessage(SERVERS_DOWN);
			//end activity indicator
			setActivity(false);
		}
	};

	return (
		<>
			<StatusBar barStyle="dark-content" animated={true} backgroundColor={PRIMARY} />
			<FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options} />
			<SafeAreaView style={style.wrapper}>
				<View style={style.container}>
					<Image style={style.tinyLogo} source={require("../../assets/images/adaptive-icon.png")} />
					{verificationId === null ? (
						<>
							<Text style={style.label}>Phone Number</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setPhoneNumber} value={phoneNumber} placeholder="(+972) 000-000-0000" keyboardType="numeric" />
							</View>
							{activity && <ActivityIndicator size="large" color={PRIMARY} />}
							{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
							<View style={style.buttonContainer}>
								<TouchableOpacity style={style.button} onPress={sendVerification}>
									<Text style={style.paragraph}>Continue</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity style={style.goBackToLoginBtn} onPress={e => navigation.navigate(LOGIN)}>
								<Text style={style.goBackToLoginBtn.text}>{REMEMBERED_PASSWORD_TEXT}</Text>
							</TouchableOpacity>
						</>
					) : (
						<>
							<Text style={style.label}>Verification Code ({requestTimeout})</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setCode} placeholder="Verification Code" keyboardType="numeric" />
							</View>
							{activity && <ActivityIndicator size="large" color={PRIMARY} />}
							{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
							<View style={style.buttonContainer}>
								<TouchableOpacity style={style.button} onPress={confirmCode}>
									<Text style={style.paragraph}>Complete</Text>
								</TouchableOpacity>
							</View>
						</>
					)}
				</View>
			</SafeAreaView>
		</>
	);
}
