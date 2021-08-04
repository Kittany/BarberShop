import {API_SERVER_ADDRESS} from "../constants/server";
import {SERVERS_DOWN} from "../constants/strings";
const FetchAPI = async (ACTION, controller, id, object) => {
	const API_BASE = `${API_SERVER_ADDRESS}/${controller}/${id}`;

	const requestOptions = {
		method: ACTION,
		headers: {"Content-Type": "application/json"},
	};

	if (ACTION !== "GET") requestOptions.body = JSON.stringify(object);

	try {
		let response = await fetch(API_BASE, requestOptions);
		return response;
	} catch (e) {
		return SERVERS_DOWN;
	}
};
export default FetchAPI;
