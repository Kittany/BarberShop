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

export default function MyAppointment({navigation}) {
	const {
		authState: {customer},
	} = GlobalData?.();

	let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let today = new Date();

	const [activity, setActivity] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [myBookedDates, setmyBookedDates] = useState([]);

	useEffect(() => {
		setActivity(true);
		setupDates();
	}, []);

	const setupDates = async () => {
		setActivity(true);

		//Array that contains the data after parsing the response from json
		let appointmentsInDatabase = [];

		//Array that contains all the booked dates from the database
		let bookedAppointments = [];

		try {
			let response = await FetchAPI("GET", "appointment", "getall");
			if (response.status === OK) {
				appointmentsInDatabase = await response.json();

				//get the customer appointments (past and present)
				await appointmentsInDatabase.forEach(item => {
					//filter to my appointments only using the phone-number
					if (item?.PhoneNumber === customer?.PhoneNumber) {
						//Split the appointment date into an array, [0] contains the appointment date and [1] contains the appointment time
						let tempAppointmentArray = item?.Appointment?.split("T");
						//reformat the date to match the SQL format (I used replace 3 times because replaceAll doesn't seem to work)
						tempAppointmentArray[0] = tempAppointmentArray[0].replace("-", "/");
						tempAppointmentArray[0] = tempAppointmentArray[0].replace("-", "/");
						tempAppointmentArray[0] = tempAppointmentArray[0].replace("-", "/");

						//Pass the date as a parameter to the Date class so we can pick which day it is
						let appointmentDate = new Date(tempAppointmentArray[0]);

						//show only upcoming dates
						if (appointmentDate.getDate() >= today.getDate() && appointmentDate.getMonth() >= today.getMonth()) bookedAppointments.push({day: dayNames[(appointmentDate.getDate() - 1) % 7], date: tempAppointmentArray[0], time: tempAppointmentArray[1]});
					}
				});
			} else if (response.status === BAD_REQUEST) {
				setActivity(false);
			} else {
				setActivity(false);
			}
		} catch {
			setActivity(false);
		}

		//update the list
		setmyBookedDates(bookedAppointments);
		setActivity(false);
	};

	const cancelAnAppointment = async () => {
		//MDY
		let date = await selectedCard.date.split("/");
		let year = date[0];
		let month = date[1];
		let day = date[2];

		//HMS
		let time = selectedCard.time.split(":");
		let hours = time[0];
		let minutes = time[1];

		try {
			let response = await FetchAPI("POST", "appointment", "cancel", {Year: year, Month: month, Day: day, Hour: hours, Minutes: minutes});
			if (response.status === OK) {
				setActivity(false);
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
						<Text style={style.header.text}>My Appointments</Text>
					</View>
					{activity && <ActivityIndicator size="large" color={PRIMARY} style={{marginTop: "1%"}} />}
					<ScrollView style={style.scrollView}>
						<View style={style.itemsContainer}>
							{myBookedDates.map(availableAppointment => (
								<>
									{selectedCard?.day === availableAppointment.day && selectedCard?.date === availableAppointment.date && selectedCard.time === availableAppointment.time ? (
										<View style={style.selectedCard}>
											<TouchableOpacity style={style.card.button} onPress={e => setSelectedCard({day: availableAppointment.day, date: availableAppointment.date, time: availableAppointment.time})}>
												<Text style={style.selectedCard.button.text}> {availableAppointment?.day}</Text>
												<Text style={style.selectedCard.button.text}> {availableAppointment?.date}</Text>
												<Text style={style.selectedCard.button.text}>{availableAppointment?.time}</Text>
											</TouchableOpacity>
										</View>
									) : (
										<View style={style.card}>
											<TouchableOpacity style={style.card.button} onPress={e => setSelectedCard({day: availableAppointment.day, date: availableAppointment.date, time: availableAppointment.time})}>
												<Text style={style.card.button.text}> {availableAppointment?.day}</Text>
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
						<TouchableOpacity onPress={cancelAnAppointment} style={style.footer.touchableOpacity}>
							<Text style={style.footer.touchableOpacity.text}>CANCEL</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
}
