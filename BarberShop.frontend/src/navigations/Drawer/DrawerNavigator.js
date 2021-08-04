import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ShopNavigator from "../ShopNavigator";
import BookingNavigator from "../BookingNavigator";
import {SHOP, BOOKING_MENU, GALLERY, SETTINGS, ABOUT} from "../../constants/routeNames";
import Gallery from "../../screens/Gallery";
import Settings from "../../screens/Settings";
import About from "../../screens/About";
import DrawerContent from "./DrawerContent";

export default function DrawerNavigator() {
	const Drawer = createDrawerNavigator();
	return (
		<Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name={SHOP} component={ShopNavigator} />
			<Drawer.Screen name={BOOKING_MENU} component={BookingNavigator} />
			<Drawer.Screen name={GALLERY} component={Gallery} />
			<Drawer.Screen name={SETTINGS} component={Settings} />
			<Drawer.Screen name={ABOUT} component={About} />
		</Drawer.Navigator>
	);
}
