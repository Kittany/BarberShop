import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {REGISTER, LOGIN, FORGOTPASSWORD} from "../constants/routeNames";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";

export default function AuthNavigator() {
	const AuthStack = createStackNavigator();

	return (
		<AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName={LOGIN}>
			<AuthStack.Screen name={LOGIN} component={Login} />
			<AuthStack.Screen name={FORGOTPASSWORD} component={ForgotPassword} />
			<AuthStack.Screen name={REGISTER} component={Register} />
		</AuthStack.Navigator>
	);
}
