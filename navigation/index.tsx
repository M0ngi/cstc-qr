import { User } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { auth } from '../config';
import { InfoContext } from '../contexts/InfoProvider';
import { HomeScreen } from '../screens/home_screen/HomeScreen';
import LoadingScreen from '../screens/loading_screen/LoadingScreen';
import { LoginPageScreen } from '../screens/login_screen/LoginPageScreen';
import { errorHandler } from '../services/exceptionHandler';
import { getCurrentUserData } from '../services/firestore/userFuncs';
import { CurrentUser } from '../utils/user';

function mainScreen(user : User | null) : JSX.Element{
    if(!user) return <LoginPageScreen />;

    return <HomeScreen />;
}

export function Navigator() : JSX.Element{
    const info = useContext(InfoContext);
    const [user, setUser] = useState(auth.currentUser);

    auth.onAuthStateChanged(async (currUser) => {
        if(!currUser) return setUser(currUser);

        if(currUser.uid !== CurrentUser.user.uid){
            let userInfo = await getCurrentUserData().catch(errorHandler);

            CurrentUser.loginJson(
                {
                uid: currUser.uid, 
                ...userInfo
                }
            );
        }
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