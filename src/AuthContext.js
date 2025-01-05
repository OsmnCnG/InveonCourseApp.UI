import React, {createContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [isInstructor, setIsInstructor] = useState(!!localStorage.getItem("instructor"));
    const [user, setUser] = useState(null);
    

    return(
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, isInstructor, setIsInstructor, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;