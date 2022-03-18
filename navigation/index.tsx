import { User } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { auth } from '../config';
import { InfoContext } from '../contexts/InfoProvider';
import { HomeScreen } from '../screens/home_screen/HomeScreen';
import LoadingScreen from '../screens/loading_screen/LoadingScreen';
import { LoginPageScreen } from '../screens/login_screen/LoginPageScreen';

function mainScreen(user : User | null) : JSX.Element{
    if(!user) return <LoginPageScreen />;

    return <HomeScreen />;
}

export function Navigator() : JSX.Element{
    const info = useContext(InfoContext);
    const [user, setUser] = useState(auth.currentUser);

    auth.onAuthStateChanged((currUser) => {
        setUser(currUser);
    })

    return (
        <>
            {
                info.loading ? <LoadingScreen /> : mainScreen(user)
            }
        </>
    );
}