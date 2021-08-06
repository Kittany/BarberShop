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
	backgroundImage:{
	width:"100%",
	height:"100%",
	position:"absolute",
	top:0,
	zIndex:-1

	},
	childContainer:{
		width:"100%",
		height:"100%",
		position:"absolute",
		top:0,
		justifyContent:"center",
		alignItems:"center",
		zIndex:100,
		marginTop:"40%"
	},
	
	navigationButtonContainer: {
		width: "80%",
		height:"7%",
		justifyContent: "center",
		alignItems:"center",
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		padding: 5,
		borderRadius: 7,
		borderColor: PRIMARY,
		marginBottom: "5%",
		backgroundColor:SECOND_PRIMARY
	},
	navigationButton: {
		width: "100%",
		Text: {
			width: "100%",
			color: PRIMARY,
			textAlign: "center",
			fontSize:20
		},
	},
	paragraph: {
		color: PRIMARY,
		fontWeight: "bold",
		fontSize: 15,
	},
};
