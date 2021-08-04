import React, {createContext, useState, useContext} from "react";
import authInitialState from "./initialStates/authInitialState";

const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
	const [authState, setAuthState] = useState(authInitialState);

	return <GlobalContext.Provider value={{authState, setAuthState}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;

//Custom hook to get the global data without the need to use "useState" in the children
export const GlobalData = () => useContext(GlobalContext);
