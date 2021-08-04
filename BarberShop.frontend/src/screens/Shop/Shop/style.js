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
	shopTitle: {
		color: PRIMARY,
		fontWeight: "bold",
		fontSize: 25,
		marginTop: "5%",
		marginBottom: "5%",
	},
	scrollView: {
		width: "100%",
		height: "100%",
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
	card: {
		alignItems: "center",
		backgroundColor: PRIMARY,
		width: "40%",
		height: 190,
		borderRadius: 10,
		padding: 10,
		marginBottom: "5%",

		img: {
			width: "100%",
			height: 80,
			marginBottom: 2,
		},
		title: {
			fontWeight: "bold",
			fontSize: 23,
			color: SECOND_PRIMARY,
			textAlign: "center",
		},
		priceTag: {
			color: "green",
			fontWeight: "bold",
			fontSize: 16,
			textAlign: "center",
			marginTop: "2%",
			marginBottom: "4%",
		},
		availability: {
			color: SECOND_PRIMARY,
			textAlign: "center",
			fontSize: 15,
		},
	},
	adminCard: {
		alignItems: "center",
		backgroundColor: PRIMARY,
		width: "40%",
		height: 230,
		borderRadius: 10,
		padding: 10,
		marginBottom: "5%"
	},

	inputContainer: {
		width: "80%",
		height: 45,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: SECOND_PRIMARY,
		marginBottom: "4%",
	},
	input: {
		backgroundColor: PRIMARY,
		width: "100%",
		height: "100%",
		paddingLeft: 5,
		fontSize: 17,
		color: SECOND_PRIMARY,
		borderRadius: 5,
		fontFamily: "Cuprum_400Regular",
	},
	addItemButtonContainer: {
		flexDirection:"row",
		width:"70%",
		justifyContent:"center",
		borderTopWidth:2,
		borderBottomWidth:2,
		borderLeftWidth:2,
		borderRightWidth:2,
		padding:5,
		borderRadius:7,
		borderColor:PRIMARY,
		marginBottom:"5%"
	},
	addItemButton: {
		width:"100%",
		Text: 
		{
			width:"100%",
			color:PRIMARY,
			textAlign:"center"
		},
	},

	deleteItemButtonContainer: {
		width: "70%",
		height: "15%",
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: SECOND_PRIMARY,
		marginTop: "10%",
		borderRadius: 5,
	},
	deleteItemButton: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: SECOND_PRIMARY,
		text: {
			color: PRIMARY,
			fontWeight: "bold",
			backgroundColor:SECOND_PRIMARY
		},
	},
	paragraph: {
		color: PRIMARY,
		fontWeight: "bold",
		fontSize: 15,
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		width: "80%",
		paddingLeft: 5,
		textAlign: "center",
		marginTop:"3%"
	},
};
