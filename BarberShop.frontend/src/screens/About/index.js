import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Text, View, Dimensions, StatusBar, SafeAreaView, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { GlobalData } from "../../context/provider";

import { PRIMARY } from '../../constants/colors';
import style from './style'
import { EMPTY_FIELDS, INVALID_CREDINTIALS, INVALID_PHONE_NUMBER, OPS, SERVERS_DOWN } from '../../constants/strings';
import { BAD_REQUEST, OK } from '../../constants/server';
import FetchAPI from '../../utils/FetchAPI';

export default function About() {
	const [pin, setPin] = useState({
		latitude: 32.418861,
		longitude: 35.038642
	})

	const { authState: { customer }, } = GlobalData?.();
	const [ownerName, setOwnerName] = useState("")
	const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("")
	const [shopDetails, setShopDetails] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [activity, setActivity] = useState(false);


	useEffect(() => {
		handleShopDetails();
	}, [])

	const handleShopDetails = async () => {
		setActivity(true);
		setErrorMessage("");
		try {
			let response = await FetchAPI("GET", "shop", "getshopdetails");
			if (response.status === OK) {
				setActivity(false);
				let data = await response.json();
				setShopDetails(data)
				setOwnerName(data.FullName)
				setOwnerPhoneNumber(data.PhoneNumber)

			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
				setErrorMessage(SERVERS_DOWN);
				return;
			} else {
				setActivity(false);
				setErrorMessage(SERVERS_DOWN);
			}
		} catch {
			setActivity(false);
			setErrorMessage(SERVERS_DOWN);
		}
	}

	handleOwnerSettings = async () => {
		setActivity(true);
		setErrorMessage("");
		try {
			if (ownerName === "" || ownerPhoneNumber.toString().length == 0) {
				setErrorMessage(EMPTY_FIELDS);
				setActivity(false);
				return;
			}

			if (ownerPhoneNumber.toString().length < 10) {
				setErrorMessage(INVALID_PHONE_NUMBER);
				setActivity(false);

				return;
			}


			let owner = { FullName: ownerName, ShopName: shopDetails.ShopName, PhoneNumber: ownerPhoneNumber, WorkingHours: shopDetails.WorkingHours, LocationLatitude: shopDetails.LocationLatitude, LocationLongitude: shopDetails.LocationLongitude }
			let response = await FetchAPI("POST", "shop", "updateshopdetails", owner);
			if (response.status === OK) {
				setShopDetails(owner)
			} else if (response.status === BAD_REQUEST) {
				setErrorMessage(OPS);
				return;
			} else {
				setErrorMessage(SERVERS_DOWN);
			}
		} catch {
			setErrorMessage(SERVERS_DOWN);
		}

		setActivity(false);
	}




	return (
		<>
			<StatusBar barStyle="dark-content" animated={true} backgroundColor={PRIMARY} />
			<SafeAreaView style={style.wrapper}>
				<View style={style.container}>
					<MapView style={style.map}
						initialRegion={{
							latitude: 32.418861,
							longitude: 35.038642,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
						<Marker coordinate={pin}>
							<Callout>
								<Text>BarberShop</Text>
							</Callout>
						</Marker>
					</MapView>
					<Text style={style.owner}>OWNER</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} value={ownerName} onChangeText={text => setOwnerName(text)} keyboardType="default" editable={customer?.IsAdmin} />
					</View>
					<Text style={style.owner}>PHONE NUMBER</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} value={ownerPhoneNumber} onChangeText={text => setOwnerPhoneNumber(text)} keyboardType="numeric" editable={customer?.IsAdmin} />
					</View>
					<Text style={style.workingHours}>Working Hours</Text>
					<View style={style.workingHoursContainer}>
						<Text style={style.workingHoursContainer.title}>Sunday - Saturday</Text>
						<Text style={style.workingHoursContainer.value}>8:00 AM - 20:00 PM</Text>
					</View>
					{activity && <ActivityIndicator size="large" color={PRIMARY} />}
					{customer?.IsAdmin && <View style={style.updateOwnerSettingsButtonContainer}>
						<TouchableOpacity style={style.updateOwnerSettingsButton} onPress={e => handleOwnerSettings()}>
							<Text style={style.updateOwnerSettingsButton.text}>Save Changes</Text>
						</TouchableOpacity>
					</View>}
					{errorMessage?.length > 0 ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
				</View>
			</SafeAreaView>
		</>
	);
}


