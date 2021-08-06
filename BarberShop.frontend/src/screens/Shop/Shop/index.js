import React from "react";
import {Text, ActivityIndicator, View, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, StatusBar} from "react-native";
import {useState, useEffect} from "react";
import {GlobalData} from "../../../context/provider";
import style from "./style";
import {ITEM, ITEM_UPDATE} from "../../../constants/routeNames";
import {PRIMARY} from "../../../constants/colors";
import {OPS, SERVERS_DOWN} from "../../../constants/strings";
import {OK, BAD_REQUEST} from "../../../constants/server";
import FetchAPI from "../../../utils/FetchAPI";

export default function Shop({navigation}) {
	const {
		authState: {customer},
	} = GlobalData?.();

	const [itemsList, setItemsList] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [activity, setActivity] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const deleteItem = async itemName => {
		setActivity(true);
		setErrorMessage("");
		try {
			let response = await FetchAPI("POST", "product", "delete", {Title: itemName});
			if (response.status === OK) {
				setActivity(false);
				let tempItemList = itemsList.filter(item => item.Title != itemName);
				setItemsList(tempItemList);
				await getItemsList();
			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
				setErrorMessage(OPS);
			} else {
				setActivity(false);
				setErrorMessage(SERVERS_DOWN);
			}
		} catch {
			setActivity(false);
			setErrorMessage(SERVERS_DOWN);
		}
	};

	const getItemsList = async () => {
		setActivity(true);
		setErrorMessage("");
		try {
			let response = await FetchAPI("GET", "product", "getall");
			if (response.status === OK) {
				setActivity(false);
				let data = await response.json();
				setItemsList(data);
			} else if (response.status === BAD_REQUEST) {
			}
		} catch {
			setActivity(false);
			setErrorMessage(SERVERS_DOWN);
		}
	};

	const handleItemUpdate = async item => {
		if (customer?.IsAdmin) navigation.navigate(ITEM_UPDATE, item);
	};

	useEffect(() => {
		getItemsList();
	}, []);

	return (
		<>
			<StatusBar barStyle="dark-content" animated={true} backgroundColor={PRIMARY} />
			<SafeAreaView style={style.wrapper}>
				<View style={style.container}>
					<Text style={style.shopTitle}>BarberShop</Text>
					<View style={style.inputContainer}>
						<TextInput style={style.input} onChangeText={setSearchFilter} value={searchFilter} placeholder="What are you looking for?" keyboardType="default" />
					</View>
					{customer.IsAdmin && (
						<>
							<View style={style.addItemButtonContainer}>
								<TouchableOpacity style={style.addItemButton} onPress={e => navigation.navigate(ITEM)}>
									<Text style={style.addItemButton.Text}>Add Product</Text>
								</TouchableOpacity>
							</View>
							{errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : <></>}
						</>
					)}
					{activity && <ActivityIndicator size="large" color={PRIMARY} />}
					<ScrollView style={style.scrollView}>
						<View style={style.itemsContainer}>
							{itemsList
								.filter(item => item.Title.toLowerCase().includes(searchFilter.toLowerCase()))
								.map(item => (
									<View key={item.Title} style={customer.IsAdmin ? style.adminCard : style.card}>
										<Image style={style.card.img} source={require("../../../assets/images/adaptive-icon.png")} />
										<TouchableOpacity onPress={e => handleItemUpdate(item)}>
											<Text style={style.card.title}>{item.Title}</Text>
											<Text style={style.card.priceTag}>{item.Price}$</Text>
											<Text style={style.card.availability}>{item.IsAvailable ? "Available" : "Not Available"}</Text>
										</TouchableOpacity>

										{customer.IsAdmin && (
											<View style={style.deleteItemButtonContainer}>
												<TouchableOpacity style={style.deleteItemButton} onPress={e => deleteItem(item?.Title)}>
													<Text style={style.deleteItemButton.text}>Delete</Text>
												</TouchableOpacity>
											</View>
										)}
									</View>
								))}
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		</>
	);
}
