import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigator from "./Drawer/DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import {GlobalData} from "../context/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppNavContainer = () => {
	const {authState, setAuthState} = GlobalData?.();

	//Check if the user is already signed in
	const getData = async () => {
		//get data from local storage
		let data = await JSON.parse(await AsyncStorage.getItem("@Barbershop:Auth"));

		//if there is data in the local storage that means he's signed in
		if (data != null) await setAuthState(prevState => ({...prevState, isLoggedIn: true, customer: data}));
	};

	useEffect(() => {
		getData();
	}, []);

	return <NavigationContainer>{authState?.isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

export default AppNavContainer;
