import React from "react";
import GlobalProvider from "./src/context/provider";
import AppNavContainer from "./src/navigations/index";
import {Cuprum_400Regular, useFonts} from "@expo-google-fonts/cuprum";
import AppLoading from "expo-app-loading";
import {LogBox} from "react-native";

export default function App() {
	//Ignores all warnings
	LogBox.ignoreAllLogs();

	let [fontsLoading, error] = useFonts({
		Cuprum_400Regular,
	});

	if (!fontsLoading) return <AppLoading />;

	return (
		<GlobalProvider>
			<AppNavContainer></AppNavContainer>
		</GlobalProvider>
	);
}
