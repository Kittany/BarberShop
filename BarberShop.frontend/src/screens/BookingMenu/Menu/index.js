import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import { PRIMARY } from "../../../constants/colors";
import style from "./style";

export default function Menu() {
	return (
		<>
			<StatusBar barStyle="dark-content" animated={true} backgroundColor={PRIMARY} />
			<SafeAreaView style={style.wrapper}>
				<View style={style.container}>
					<Text>Hello</Text>
				</View>
			</SafeAreaView>
		</>
	);
}
