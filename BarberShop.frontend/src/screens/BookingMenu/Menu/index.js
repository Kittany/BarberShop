import React from "react";
import {SafeAreaView, StatusBar, Text, View, Image, TouchableOpacity} from "react-native";
import {PRIMARY} from "../../../constants/colors";
import {BOOK_APPOINTMENT, MY_APPOINTMENTS, TODAYS_APPOINTMENTS} from "../../../constants/routeNames";
import style from "./style";
import {GlobalData} from "../../../context/provider";

export default function Menu({navigation}) {
	const {
		authState: {customer},
	} = GlobalData?.();


	return (
		<>
			<StatusBar barStyle="dark-content" animated={true} backgroundColor={PRIMARY} />
			<SafeAreaView style={style.wrapper}>
				<View style={style.container}>
					<Image style={style.backgroundImage} source={require("../../../assets/images/splash.png")} />
					<View style={style.childContainer}>
						<View style={style.navigationButtonContainer}>
							<TouchableOpacity style={style.navigationButton} onPress={e => navigation.navigate(BOOK_APPOINTMENT)}>
								<Text style={style.navigationButton.Text}>Book Appointment</Text>
							</TouchableOpacity>
						</View>
						<View style={style.navigationButtonContainer}>
							<TouchableOpacity style={style.navigationButton} onPress={e => navigation.navigate(MY_APPOINTMENTS)}>
								<Text style={style.navigationButton.Text}>My Appointments</Text>
							</TouchableOpacity>
						</View>
						{customer?.IsAdmin && (
							<View style={style.navigationButtonContainer}>
								<TouchableOpacity style={style.navigationButton} onPress={e => navigation.navigate(TODAYS_APPOINTMENTS)}>
									<Text style={style.navigationButton.Text}>Today's Appointments</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
			</SafeAreaView>
		</>
	);
}
