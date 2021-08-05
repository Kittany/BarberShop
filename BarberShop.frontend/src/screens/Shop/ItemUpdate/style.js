import {PRIMARY, SECOND_PRIMARY} from "../../../constants/colors";

export default {
	wrapper: {
		flex: 1,

	},
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: SECOND_PRIMARY,
		
	},
	pageTitle: {
		width: "70%",
		textAlign:"center",
		marginBottom:"10%",
		fontSize:30,
		color:PRIMARY,
		fontWeight:"bold"
	},
    label:{
     color:PRIMARY,
	 textAlign:"left",
	 fontSize:17,
	 fontWeight:"bold",
	 fontFamily:"Cuprum_400Regular",
	 width:"80%",
	 paddingLeft:5

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
		fontFamily: "Cuprum_400Regular"
	},

	checkBoxContainer:{

		width:"100%",
		height:"5%",
		display:"flex",
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",

		text:{
			color:PRIMARY,
			fontWeight:"bold",
			fontSize:20
		}
	},
    buttonsContainer:{
     width:"100%",
	 marginTop:"10%",
	 flexDirection:"row",
	 justifyContent:"space-evenly"
	},

	buttonContainer: {
		width: "40%",
		height: 40,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: PRIMARY,
		marginTop: "4%",
		borderRadius: 5,
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
		color: PRIMARY,
		fontWeight: "bold",
		fontSize: 15,
	},
	errorMessage:{
		color:"red",
		fontSize:15,
		width:"80%",
		paddingLeft:5,
		textAlign:"center",
		marginTop:"5%",
		marginBottom:"-5%"
	},

};
