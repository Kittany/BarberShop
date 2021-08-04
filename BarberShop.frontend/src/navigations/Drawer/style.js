import {PRIMARY, SECOND_PRIMARY} from "../../constants/colors";

export default {
	drawerContent: {
		flex: 1,
		alignItems: "center",
		backgroundColor: PRIMARY,
	},
	logo: {
		width: "70%",
		height: "20%",
		marginTop: "10%",
		marginBottom: "5%",
	},
	drawerTitle:{
		fontSize:14,
		marginTop:"3%",
		fontSize:20
	},
	role:{
		marginBottom:"8%",
	},

	drawerItem: {
		width: "90%",
		color: SECOND_PRIMARY,
	},
	buttonContainer: {
		width: "35%",
		height: 35,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: SECOND_PRIMARY,
		borderRadius: 5,
		marginBottom:"5%",
		position: "absolute",
		bottom:0
	},
	button: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		backgroundColor: "transparent",
		padding: 1,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	paragraph: {
		color: SECOND_PRIMARY,
		fontWeight: "bold",
		fontSize: 13,
	},
};
