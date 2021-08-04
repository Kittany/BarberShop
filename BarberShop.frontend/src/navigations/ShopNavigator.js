import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {SHOP, ITEM, CART} from "../constants/routeNames";
import Shop from "../screens/Shop/Shop";
import Item from "../screens/Shop/Item";

export default function ShopNavigator() {
	const ShopStack = createStackNavigator();

	return (
		<ShopStack.Navigator screenOptions={{headerShown: false}} initialRouteName={SHOP}>
			<ShopStack.Screen name={SHOP} component={Shop} />
			<ShopStack.Screen name={ITEM} component={Item} />
		</ShopStack.Navigator>
	);
}
