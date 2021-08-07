import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StatusBar, Text, View, TextInput, TouchableOpacity, ActivityIndicator, DevSettings } from "react-native";
import style from "./style";
import { PRIMARY } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Platform } from "@unimodules/react-native-adapter";
import { EMPTY_FIELDS, OPS, SERVERS_DOWN } from "../../../constants/strings";
import FetchAPI from "../../../utils/FetchAPI";
import { BAD_REQUEST, OK } from "../../../constants/server";
import { SHOP } from "../../../constants/routeNames";

export default function Item({ navigation }) {
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [image, setImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [activity, setActivity] = useState(false);

	useEffect(() => {
		CheckPermission();
	}, []);

	const CheckPermission = async () => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (status !== "granted") {
				alert("permission Denied!");
			}
		}
	};

	const PickImage = async () => {
		let result = null;

		try {
			result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
				base64: true,
			});



			if (!result.cancelled) {
				setImage(result);
			}
		} catch { }
	};

	const addItem = async () => {
		await setActivity(true);
		await setErrorMessage("");

		if (productName.length === 0 || productPrice.length === 0) {
			setErrorMessage(EMPTY_FIELDS);
			setActivity(false);
			return;
		}

		if (productName.length > 10) {
			setErrorMessage("Product name is too long");
			setActivity(false);
			return;
		}

		if (image === null) {
			setErrorMessage("You have to select an Image!");
			setActivity(false);
			return;
		}

		//Add Data
		try {
			let response = await FetchAPI("POST", "product", "add", { Title: productName, Price: productPrice, IsAvailable: true, Descreption: "", Image: "No Image" });
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
					<Text style={style.pageTitle}>Add Product</Text>
					<Text style={style.label}>Name</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} onChangeText={setProductName} value={productName} placeholder="Product Name" keyboardType="default" />
					</View>
					<Text style={style.label}>Price</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} onChangeText={setProductPrice} value={productPrice} placeholder="Product Price" keyboardType="numeric" />
					</View>
					<View style={style.buttonContainer}>
						<TouchableOpacity style={style.button} onPress={PickImage}>
							<Text style={style.paragraph}>Choose Image</Text>
						</TouchableOpacity>
					</View>
					{image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 150, marginTop: "5%" }} />}
					{activity && <ActivityIndicator size="large" color={PRIMARY} />}
					{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
					<View style={style.buttonsContainer}>
						<View style={style.buttonContainer}>
							<TouchableOpacity style={style.button} onPress={addItem}>
								<Text style={style.paragraph}>Add</Text>
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
