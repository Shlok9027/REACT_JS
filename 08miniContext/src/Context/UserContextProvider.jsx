import React from "react";

import UserContext from "./UsreContext";

const UserContextProvider = (children) => {
    cosnt [User, setUser] = React.useState(null)
    return(
        <>
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
        </>
    )

}
export default UserContextProvider

