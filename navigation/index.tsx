import React, { useContext } from 'react';
import { InfoContext } from '../contexts/InfoProvider';
import LoadingScreen from '../screens/loading_screen/LoadingScreen';
import { LoginPageScreen } from '../screens/login_screen/LoginPageScreen';

export function Navigator() : JSX.Element{
    const info = useContext(InfoContext);

    return (
        <>
            {
                info.loading ? <LoadingScreen /> : <LoginPageScreen />
            }
        </>
    );
}