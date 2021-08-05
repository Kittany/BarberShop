import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {SHOP, ITEM, ITEM_UPDATE} from "../constants/routeNames";
import Shop from "../screens/Shop/Shop";
import Item from "../screens/Shop/Item";
import ItemUpdate from "../screens/Shop/ItemUpdate";

export default function ShopNavigator() {
	const ShopStack = createStackNavigator();

	return (
		<ShopStack.Navigator screenOptions={{headerShown: false}} initialRouteName={SHOP}>
			<ShopStack.Screen name={SHOP} component={Shop} />
			<ShopStack.Screen name={ITEM} component={Item} />
			<ShopStack.Screen name={ITEM_UPDATE} component={ItemUpdate} />
		</ShopStack.Navigator>
	);
}
