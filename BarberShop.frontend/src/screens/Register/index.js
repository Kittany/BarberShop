import React, {useState, useRef, useEffect} from "react";
import {SafeAreaView, Image, StatusBar, Text, View, TextInput, TouchableOpacity, DevSettings, ActivityIndicator} from "react-native";
import {PRIMARY} from "../../constants/colors";
import {PHONE_NUMBER_TAKEN, INVALID_PHONE_NUMBER, EMPTY_FIELDS, INVALID_CODE, PASSWORD_NOT_MATCH, REQUEST_TIMEOUT, INVALID_FIRSTNAME_LASTNAME, SHORT_PASSWORD, HAVE_ACCOUNT, SERVERS_DOWN} from "../../constants/strings";
import {COUNTRY_CODE, COUNTRY_TEST_CODE, PASSWORD_LENGTH, REQUEST_TIMEOUT_DURATION} from "../../constants/rules";
import style from "./style";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import firebase from "../../config/firebase";
import {LOGIN} from "../../constants/routeNames";
import FetchAPI from "../../utils/FetchAPI";
import {BAD_REQUEST, OK} from "../../constants/server";

export default function Register({navigation}) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [verificationId, setVerificationId] = useState(null);
	const [code, setCode] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const recaptchaVerifier = useRef(null);
	const [requestTimeout, setRequestTimeout] = useState(REQUEST_TIMEOUT_DURATION);
	const [activity, setActivity] = useState(false);
	let timeout = null;

	//Phone Auth region
	const sendVerification = async () => {
		//reset error message
		await setErrorMessage("");

		//start activity indicator
		await setActivity(true);

		//Check for empty fields
		if (phoneNumber.length === 0 || password.length === 0 || confirmPassword.length === 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		if (phoneNumber.length != 10) {
			setErrorMessage(INVALID_PHONE_NUMBER);
			setActivity(false);
			return;
		}

		if (password.length < PASSWORD_LENGTH) {
			setErrorMessage(SHORT_PASSWORD);
			setActivity(false);
			return;
		}

		//Make sure passwords match
		if (password !== confirmPassword) {
			setErrorMessage(PASSWORD_NOT_MATCH);
			setActivity(false);
			return;
		}

		//Check if the phone number already exists in the database, if so then display an error message and return else, continue with the verification
		let response = await FetchAPI("POST", "customer", "checkifnumberexist", {PhoneNumber: phoneNumber});

		if (response?.status == OK) {
			setErrorMessage(PHONE_NUMBER_TAKEN);
			setActivity(false);
			return;
		} else if (response?.status === BAD_REQUEST) {
			const phoneProvider = new firebase.auth.PhoneAuthProvider();
			await phoneProvider
				.verifyPhoneNumber(COUNTRY_CODE + phoneNumber, recaptchaVerifier.current)
				.then(setVerificationId)
				.then(e => {
					setRequestTimeout(REQUEST_TIMEOUT_DURATION);
					decreamentRequestTimeout();
				})
				.catch(e => setErrorMessage(INVALID_PHONE_NUMBER));
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
		if (code.length === 0 || firstName.length === 0 || lastName.length === 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		//FirstName & LastName can only contain letters
		if (
			!firstName
				.toLocaleLowerCase()
				.split("")
				.every(char => ((char >= "a" && char <= "z") || char === " ") && firstName.trim() !== "") ||
			!lastName
				.toLocaleLowerCase()
				.split("")
				.every(char => ((char >= "a" && char <= "z") || char === " ") && lastName.trim() !== "")
		) {
			setErrorMessage(INVALID_FIRSTNAME_LASTNAME);
			setActivity(false);
			return;
		}

		//Verify the code
		const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, code);

		await firebase
			.auth()
			.signInWithCredential(credential)
			.then(handleSignup)
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
	const handleSignup = async () => {
		// Add user to the database
		let response = await FetchAPI("POST", "customer", "add", {PhoneNumber: phoneNumber, FirstName: firstName, LastName: lastName, Password: password});

		if (response?.status === OK) {
			//Fresh app start & direct to main page
			DevSettings.reload();
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
							<Text style={style.label}>Password</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setPassword} value={password} placeholder="Choose a Password" keyboardType="default" />
							</View>
							<Text style={style.label}>Confirm Password</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setConfirmPassword} value={confirmPassword} placeholder="Confirm Password" keyboardType="default" />
							</View>
							{activity && <ActivityIndicator size="large" color={PRIMARY} />}
							{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
							<View style={style.buttonContainer}>
								<TouchableOpacity style={style.button} onPress={sendVerification}>
									<Text style={style.paragraph}>Continue</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity style={style.goBackToLoginBtn} onPress={e => navigation.navigate(LOGIN)}>
								<Text style={style.goBackToLoginBtn.text}>{HAVE_ACCOUNT}</Text>
							</TouchableOpacity>
						</>
					) : (
						<>
							<Text style={style.label}>Verification Code ({requestTimeout})</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setCode} placeholder="Verification Code" keyboardType="numeric" />
							</View>
							<Text style={style.label}>First Name</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setFirstName} value={firstName} placeholder="What do they call you?" keyboardType="default" />
							</View>
							<Text style={style.label}>Last Name</Text>
							<View style={style.inputContainer}>
								<TextInput style={style.input} onChangeText={setLastName} value={lastName} placeholder="What is your family name?" keyboardType="default" />
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
