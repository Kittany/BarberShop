import { PRIMARY, SECOND_PRIMARY } from "../../constants/colors";
import { Dimensions } from "react-native";

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
    map: {
        width: Dimensions.get('window').width,
        height: "30%",
    },

    addItemButtonContainer: {
        flexDirection: "row",
        width: "70%",
        justifyContent: "center",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        padding: 5,
        borderRadius: 7,
        borderColor: PRIMARY,
        marginBottom: "5%",
    },
    addItemButton: {
        width: "100%",
        Text: {
            width: "100%",
            color: PRIMARY,
            textAlign: "center",
        },
    },
    errorMessage: {
        color: "red",
        fontSize: 15,
        width: "80%",
        paddingLeft: 5,
        textAlign: "center",
        marginTop: "3%",
    },

    owner: {
        width: "100%",
        fontWeight: "bold",
        fontSize: 17,
        color: PRIMARY,
        paddingLeft: "3%",
        marginTop: "5%",
        details: {
            width: "100%",
            color: "rgb(218,165,32)",
            paddingLeft: 8,
            fontSize: 25
        },
        name: {
            width: "100%",
            color: "rgb(218,165,32)",
            paddingLeft: 8,
            fontSize: 25
        },
        phone: {
            width: "100%",

            color: PRIMARY,
            paddingLeft: 8,
            fontSize: 25
        }
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
    }, inputContainer: {
        width: "95%",
        height: 45,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: SECOND_PRIMARY,

        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    workingHours: {
        color: PRIMARY,
        fontSize: 22,
        width: "100%",
        marginBottom: 5,
        marginTop: "5%",
        paddingLeft: "4%"
    },
    workingHoursContainer: {
        width: "95%",
        backgroundColor: SECOND_PRIMARY,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: SECOND_PRIMARY,
        marginBottom: "5%",
        title: {
            color: PRIMARY,
            fontSize: 15,
            paddingLeft: 5,
            fontWeight: "bold"
        },
        value: {
            color: "green",
            paddingLeft: 5,
            marginBottom: "2%"
        }

    },
    button: {
        height: "5%",
        boxSizing: "border-box",
        alignItems: "center",
        padding: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: PRIMARY,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 1,
    },
    updateOwnerSettingsButtonContainer: {
        width: "70%",
        justifyContent: "center",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        padding: 5,
        borderRadius: 7,
        borderColor: PRIMARY,
        marginBottom: "5%",
    },
    updateOwnerSettingsButton: {
        width: "100%",
        text: {
            width: "100%",
            color: PRIMARY,
            textAlign: "center",
        },
    },
};

