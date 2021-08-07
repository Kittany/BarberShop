import React, { useState } from "react";
import { SafeAreaView, Image, StatusBar, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { PRIMARY } from "../../constants/colors";
import { FORGOTPASSWORD, REGISTER } from "../../constants/routeNames";
import { DONT_HAVE_ACCOUNT, EMPTY_FIELDS, FORGOT_PASSWORD_TEXT, INVALID_CREDINTIALS, INVALID_PHONE_NUMBER, SERVERS_DOWN } from "../../constants/strings";
import style from "./style";
import FetchAPI from "../../utils/FetchAPI";
import { BAD_REQUEST, OK } from "../../constants/server";
import { GlobalData } from "../../context/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [activity, setActivity] = useState(false);
	const { authState, setAuthState } = GlobalData?.();

	const handleLogin = async () => {
		//reset error message
		await setErrorMessage("");

		//start activity indicator
		await setActivity(true);

		if (phoneNumber.length == 0 || password.length == 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		if (phoneNumber.length != 10) {
			setErrorMessage(INVALID_PHONE_NUMBER);
			setActivity(false);
			return;
		}

		//Validate if the customer put the correct details
		try {
			let response = await FetchAPI("POST", "customer", "validate", { PhoneNumber: phoneNumber, Password: password });
			if (response.status === OK) {
				setActivity(false);
				let data = await response.json();

				//Store the customer's data in the global state
				await setAuthState(prevState => ({ ...prevState, customer: data, isLoggedIn: true }));

				//Add the customer to AsyncStorange so he doesn't have to relogin every time he opens the app
				await AsyncStorage.setItem("@Barbershop:Auth", JSON.stringify(data));

				setIsLoggedIn(true);
			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
				setErrorMessage(INVALID_CREDINTIALS);
				return;
			} else {
				setActivity(false);
				setErrorMessage(SERVERS_DOWN);
			}
		} catch {
			setActivity(false);
			setErrorMessage(SERVERS_DOWN);
		}
	};

	return (
		<>
			<StatusBar barStyle="dark-content" animated={true} backgroundColor={PRIMARY} />
			<SafeAreaView style={style.wrapper}>
				<View style={style.container}>
					<Image style={style.tinyLogo} source={require("../../assets/images/adaptive-icon.png")} />
					<Text style={style.label}>Phone Number</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} onChangeText={setPhoneNumber} value={phoneNumber} placeholder="(+972) 000-000-0000" keyboardType="numeric" />
					</View>
					<Text style={style.label}>Password</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} onChangeText={setPassword} value={password} placeholder="What is your password?" secureTextEntry={true} keyboardType="default" />
					</View>
					<TouchableOpacity style={style.forgotPassword} onPress={e => navigation.navigate(FORGOTPASSWORD)}>
						<Text style={style.forgotPassword.text}>{FORGOT_PASSWORD_TEXT}</Text>
					</TouchableOpacity>
					{activity && <ActivityIndicator size="large" color={PRIMARY} />}
					<View style={style.buttonContainer}>
						<TouchableOpacity style={style.button} onPress={handleLogin}>
							<Text style={style.paragraph}>Next</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={style.goToSignupBtn} onPress={e => navigation.navigate(REGISTER)}>
						<Text style={style.goToSignupBtn.text}>{DONT_HAVE_ACCOUNT}</Text>
					</TouchableOpacity>
					{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
				</View>
			</SafeAreaView>
		</>
	);
}
