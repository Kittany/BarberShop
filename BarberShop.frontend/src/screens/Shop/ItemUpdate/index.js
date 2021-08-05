import React, {useEffect, useState} from "react";
import {SafeAreaView, CheckBox, StatusBar, Text, View, TextInput, TouchableOpacity, ActivityIndicator, DevSettings} from "react-native";
import style from "./style";
import {PRIMARY} from "../../../constants/colors";
import {EMPTY_FIELDS, OPS, SERVERS_DOWN} from "../../../constants/strings";
import FetchAPI from "../../../utils/FetchAPI";
import {BAD_REQUEST, OK} from "../../../constants/server";
import {SHOP} from "../../../constants/routeNames";

export default function ItemUpdate({navigation, route}) {
	let {params} = route;
	params.Price = params.Price.toString();
	const [productPrice, setProductPrice] = useState(params.Price);
	const [isAvailable, setIsAvailable] = useState(params.IsAvailable);
	const [errorMessage, setErrorMessage] = useState("");
	const [activity, setActivity] = useState(false);

	const updateItem = async () => {
		await setActivity(true);
		await setErrorMessage("");

		if (productPrice.length === 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		//Add Data
		try {
			let response = await FetchAPI("POST", "product", "update", {Title: params?.Title, Price: productPrice, IsAvailable: isAvailable, Descreption: "", Image: params?.Image});
			if (response.status === OK) {
				await setActivity(false);
				//Because we don't have real-time functionallity we reset the app to refresh teh data
				await DevSettings.reload();
			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
				setErrorMessage(OPS);
				return;
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
					<Text style={style.pageTitle}>{params.Title}</Text>
					<Text style={style.label}>Price</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} onChangeText={setProductPrice} value={productPrice} placeholder="Product Price" keyboardType="numeric" />
					</View>
					<View style={style.checkBoxContainer}>
						<CheckBox value={isAvailable} onValueChange={setIsAvailable} tintColors={{true: PRIMARY}} />
						<Text style={style.checkBoxContainer.text}>Available</Text>
					</View>
					{activity && <ActivityIndicator size="large" color={PRIMARY} />}
					{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
					<View style={style.buttonsContainer}>
						<View style={style.buttonContainer}>
							<TouchableOpacity style={style.button} onPress={updateItem}>
								<Text style={style.paragraph}>Update</Text>
							</TouchableOpacity>
						</View>
						<View style={style.buttonContainer}>
							<TouchableOpacity style={style.button} onPress={e => navigation.goBack()}>
								<Text style={style.paragraph}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
}
