import { FirebaseError } from "firebase/app";
import React, { createContext, useMemo, useState } from "react";

interface ContextProps {
    children?: React.ReactNode;
}

interface InfoStructure {
    error?: FirebaseError | Error | null;
    info?: string | null;
    loading?: boolean | null;
}

const defaultContextInfo : InfoStructure = {
    error: null,
    loading: false,
    info: null
}

export const InfoContext = createContext(defaultContextInfo);
export const InfoDispatcher = createContext((x:InfoStructure)=>{});

export function InfoProvider({children} : ContextProps) : JSX.Element{
    const [info, setInfo] = useState(defaultContextInfo)

    const dispatchInfo = (newInfo : InfoStructure)=>{
        setInfo({...defaultContextInfo, ...newInfo});
    }
    
    return (
        <InfoContext.Provider value={info}>
            <InfoDispatcher.Provider value={dispatchInfo}>
                {children}
            </InfoDispatcher.Provider>
        </InfoContext.Provider>
    );
}