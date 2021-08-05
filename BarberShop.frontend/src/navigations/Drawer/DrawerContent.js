import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import style from "./style";
import {ABOUT, BOOKING_MENU, SHOP} from "../../constants/routeNames";
import {PRIMARY, SECOND_PRIMARY} from "../../constants/colors";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalData} from "../../context/provider";
import authInitialState from "../../context/initialStates/authInitialState";

export default function DrawerContent({navigation}) {
	const [selectedScreen, setSelectedScreen] = useState(BOOKING_MENU); //When the app starts this will be selected
	const {
		authState: {customer},
		setAuthState,
	} = GlobalData?.();

	//Update the style of the selected screen
	const handleNavigation = screenName => {
		setSelectedScreen(screenName);
		navigation.navigate(screenName);
	};

	//Sign the user out and remove the sign-in token from the phone's storage
	const handleSignout = async () => {
		await setAuthState(authInitialState);
		await AsyncStorage.removeItem("@Barbershop:Auth");
	};

	return (
		<>
			<View style={style.drawerContent}>
				<Image style={style.logo} source={require("../../assets/images/icon.png")} />
				<Text style={style.drawerTitle}>
					{customer.FirstName} {customer.LastName}
				</Text>
				<Text style={style.role}>{customer.IsAdmin ? "Owner" : "Customer"}</Text>
				<DrawerItem onPress={() => handleNavigation(SHOP)} style={style.drawerItem} focused={selectedScreen === SHOP} label={SHOP} inactiveTintColor={SECOND_PRIMARY} activeTintColor={PRIMARY} activeBackgroundColor={SECOND_PRIMARY} />
				<DrawerItem onPress={() => handleNavigation(BOOKING_MENU)} style={style.drawerItem} focused={selectedScreen === BOOKING_MENU} label={BOOKING_MENU} inactiveTintColor={SECOND_PRIMARY} activeTintColor={PRIMARY} activeBackgroundColor={SECOND_PRIMARY} />
				<DrawerItem onPress={() => handleNavigation(ABOUT)} style={style.drawerItem} focused={selectedScreen === ABOUT} label={ABOUT} inactiveTintColor={SECOND_PRIMARY} activeTintColor={PRIMARY} activeBackgroundColor={SECOND_PRIMARY} />
				<View style={style.buttonContainer}>
					<TouchableOpacity style={style.button} onPress={handleSignout}>
						<Text style={style.paragraph}>Signout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
}
