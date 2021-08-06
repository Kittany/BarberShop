import React from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {useState, useEffect} from "react/cjs/react.development";
import {PRIMARY, SECOND_PRIMARY} from "../../../constants/colors";
import {GlobalData} from "../../../context/provider";
import style from "./style";
import FetchAPI from "../../../utils/FetchAPI";
import {OK, BAD_REQUEST} from "../../../constants/server";
import {OPS, SERVERS_DOWN} from "../../../constants/strings";
import {BOOKING_MENU} from "../../../constants/routeNames";

export default function BookAppointment({navigation}) {
	const {
		authState: {customer},
	} = GlobalData?.();

	let today = new Date();
	let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const [activity, setActivity] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [bookingDates, setBookingDates] = useState([]);

	useEffect(() => {
		setActivity(true);
		setupDates();
	}, []);

	const setupDates = async () => {
		setActivity(true);

		let appointmentsInDatabase = [];
		let bookedAppointments = []

		try {
			let response = await FetchAPI("GET", "appointment", "getall");
			if (response.status === OK) {
				appointmentsInDatabase = await response.json();

				//get the list of all the booked appointments
				await appointmentsInDatabase.forEach(item => {
					bookedAppointments.push(item?.Appointment?.split("T"));
				});
			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
			} else {
				setActivity(false);
			}
		} catch {
			setActivity(false);
		}

		//Shop opening hours
		await today.setHours(8);
		await today.setMinutes(0);
		await today.setSeconds(0);

		//Set up how many days forward you want the customers to be able to book
		let threeDaysFromNow = new Date();
		await threeDaysFromNow.setHours(24 * 4);
		let appointmentMinutesGap = 30;
		let bookingDatesTempList = [];

		//As long as we haven't reached the 4th day yet we keep looping
		while (today.getDate() != threeDaysFromNow.getDate()) {
			//Add the working hours to an array
			if (today.getHours() < 21 && today.getHours() > 7) {
				let date = today.toLocaleDateString().split("/");
				let month = date[0];
				let day = date[1];
				let year = "20" + date[2];

				let currentDateFormat = year + "-" + month + "-" + day;
				today.toLocaleDateString();

				await bookingDatesTempList.push({day: today.getDate(), date: today.toLocaleDateString(), time: today.toLocaleTimeString()});
			}
			//Increament time by 30 minutes
			await today.setMinutes(today.getMinutes() + appointmentMinutesGap);
		}

		//remove the last appointment since it will pass the market closing time
		bookingDatesTempList.pop();

		//update the list
		setBookingDates(bookingDatesTempList);
		setActivity(false);
	};

	const handleBooking = async () => {
		//MDY
		let date = await selectedCard.date.split("/");
		let month = date[0];
		let day = date[1];
		let year = "20" + date[2];

		//HMS
		let time = selectedCard.time.split(":");
		let hours = time[0];
		let minutes = time[1];

		try {
			let response = await FetchAPI("POST", "appointment", "book", {Year: year, Month: month, Day: day, Hour: hours, Minutes: minutes, PhoneNumber: customer?.PhoneNumber});
			if (response.status === OK) {
				setActivity(false);
				// let tempItemList = itemsList.filter(item => item.Title != itemName);
				// await getItemsList();

				navigation.navigate(BOOKING_MENU);
			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
				setErrorMessage(OPS);
			} else {
				setActivity(false);
				setErrorMessage("SERVERS_DOWN");
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
					<View style={style.header}>
						<Text style={style.header.text}>Please select a date...</Text>
					</View>
					{activity && <ActivityIndicator size="large" color={PRIMARY} style={{marginTop: "1%"}} />}
					<ScrollView style={style.scrollView}>
						<View style={style.itemsContainer}>
							{bookingDates.map(availableAppointment => (
								<>
									{selectedCard?.day === availableAppointment.day && selectedCard?.date === availableAppointment.date && selectedCard.time === availableAppointment.time ? (
										<View key={availableAppointment.date + availableAppointment.time + availableAppointment.day} style={style.selectedCard}>
											<TouchableOpacity style={style.card.button} onPress={e => setSelectedCard({day: availableAppointment.day, date: availableAppointment.date, time: availableAppointment.time})}>
												<Text style={style.selectedCard.button.text}> {dayNames[(availableAppointment?.day - 1) % 7]}</Text>
												<Text style={style.selectedCard.button.text}> {availableAppointment?.date}</Text>
												<Text style={style.selectedCard.button.text}>{availableAppointment?.time}</Text>
											</TouchableOpacity>
										</View>
									) : (
										<View key={availableAppointment.date + availableAppointment.time + availableAppointment.day} style={style.card}>
											<TouchableOpacity style={style.card.button} onPress={e => setSelectedCard({day: availableAppointment.day, date: availableAppointment.date, time: availableAppointment.time})}>
												<Text style={style.card.button.text}> {dayNames[(availableAppointment?.day - 1) % 7]}</Text>
												<Text style={style.card.button.text}> {availableAppointment?.date}</Text>
												<Text style={style.card.button.text}>{availableAppointment?.time}</Text>
											</TouchableOpacity>
										</View>
									)}
								</>
							))}
						</View>
					</ScrollView>
					<View style={style.footer}>
						<TouchableOpacity onPress={handleBooking} style={style.footer.touchableOpacity}>
							<Text style={style.footer.touchableOpacity.text}>BOOK NOW</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
}
