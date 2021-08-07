import {PRIMARY, SECOND_PRIMARY} from "../../../constants/colors";

export default {
	wrapper: {
		flex: 1,
		backgroundColor: SECOND_PRIMARY,
	},
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: SECOND_PRIMARY,
	},
	header: {
		flexDirection: "row",
		width: "100%",
		height: "10%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: PRIMARY,
		paddingTop: "3%",
		text: {
			width: "100%",
			height: "50%",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: 20,
			borderColor: SECOND_PRIMARY,
		},
	},
	footer: {
		flexDirection: "row",
		width: "100%",
		height: "8%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: PRIMARY,
		paddingTop:"1%",
		touchableOpacity: {
			width: "100%",
			height: "50%",
			text:{
			width:"100%",
			height:"100%",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: 20,
			}
		},
	},

	scrollView: {
		width: "100%",
		height: "80%",
		backgroundColor: SECOND_PRIMARY,
	},
	itemsContainer: {
		width: "100%",
		padding: 10,
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
	},
	selectedCard: {
		alignItems: "center",
		backgroundColor: PRIMARY,
		width: "100%",
		height: 80,
		borderRadius: 10,
		padding: 10,
		marginBottom: "5%",
		button: {
			text: {
				fontSize: 15,
				fontWeight: "bold",
				textAlign: "center",
				color: SECOND_PRIMARY,
			},
		},
	},
	card: {
		alignItems: "center",
		backgroundColor: SECOND_PRIMARY,
		borderColor: PRIMARY,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		width: "100%",
		height: 80,
		borderRadius: 10,
		padding: 10,
		marginBottom: "5%",
		button: {
			flexDirection: "row",
			width: "100%",
			height: "100%",
			justifyContent: "space-around",
			alignItems: "center",
			text: {
				fontSize: 15,
				fontWeight: "bold",
				textAlign: "center",
				color: PRIMARY,
			},
		},
	},

};
