import React, {createContext, useContext, useState} from 'react';
import Axios from 'axios'

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);

    function signUp(email, password){

    }

    async function login(email, password){
        const {data} = await Axios.post('/auth/login', {email, password});
    }

    function logOut(email, password){
        
    }

    const value = {
        currentUser,
        signUp, 
        login, 
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )






}