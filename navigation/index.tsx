import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { auth } from '../config';
import { InfoContext, InfoDispatcher } from '../contexts/InfoProvider';
import { HomeScreen } from '../screens/home_screen/HomeScreen';
import LoadingScreen from '../screens/loading_screen/LoadingScreen';
import { LoginPageScreen } from '../screens/login_screen/LoginPageScreen';
import { errorHandler } from '../services/exceptionHandler';
import { getCurrentUserData } from '../services/firestore/userFuncs';
import { CurrentUser, IUserData } from '../utils/user';
import { NavigationContainer } from '@react-navigation/native';
import { QRScanner } from '../screens/qr_scanner/QRScanner';
import UpdateProfile from '../screens/update_profile/UpdateProfile';
import { setJSExceptionHandler } from "react-native-exception-handler";

type RootStackParamList = {
    Home: undefined;
    QRScanner: {scanMode: "checkin" | "edit"  };
    UpdateProfile: {userData : IUserData}
};

const Stack = createNativeStackNavigator<RootStackParamList>();

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}

function mainScreen(user : User | null) : JSX.Element{
    if(!user) return <LoginPageScreen />;

    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
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
                <NavigationContainer>
                    {info.loading ? <LoadingScreen /> : mainScreen(user)}
                </NavigationContainer>
            }
        </>
    );
}

setJSExceptionHandler((error, isFatal) => {
    const infoDispatcher = useContext(InfoDispatcher);
    infoDispatcher({error})
  }, true);