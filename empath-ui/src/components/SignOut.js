import React, {useEffect} from 'react';
import {useAuth} from "../auth/AuthProvider";

export default function SignOut() {
    const { logout } = useAuth();

    useEffect(()=>{
        logout();
    },[])
}