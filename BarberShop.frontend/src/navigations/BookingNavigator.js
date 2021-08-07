import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {BOOKING_MENU, BOOK_APPOINTMENT, MY_APPOINTMENTS, TODAYS_APPOINTMENTS} from "../constants/routeNames";
import Menu from "../screens/BookingMenu/Menu";
import BookAppointment from "../screens/BookingMenu/BookAppointment";
import MyAppointment from "../screens/BookingMenu/MyAppointment";
import CustomersAppointments from "../screens/BookingMenu/CustomersAppointments";

export default function BookingNavigator() {
	const BookingStack = createStackNavigator();

	return (
		<BookingStack.Navigator screenOptions={{headerShown: false}} initialRouteName={BOOKING_MENU}>
			<BookingStack.Screen name={BOOKING_MENU} component={Menu} />
			<BookingStack.Screen name={BOOK_APPOINTMENT} component={BookAppointment} />
			<BookingStack.Screen name={MY_APPOINTMENTS} component={MyAppointment} />
			<BookingStack.Screen name={TODAYS_APPOINTMENTS} component={CustomersAppointments} />
		</BookingStack.Navigator>
	);
}
