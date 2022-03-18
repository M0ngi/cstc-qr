import React, { createContext, useMemo, useState } from "react";

interface ContextProps {
    children?: React.ReactNode;
}

interface InfoStructure {
    error?: string;
    info?: string;
    loading?: boolean;
}

const defaultContextInfo : InfoStructure = {}

export const InfoContext = createContext(defaultContextInfo);
export const InfoDispatcher = createContext((x:InfoStructure)=>{});

export function InfoProvider({children} : ContextProps) : JSX.Element{
    const [info, setInfo] = useState(defaultContextInfo)

    const dispatchInfo = (newInfo : InfoStructure)=>{
        setInfo(newInfo);
    }
    
    return (
        <InfoContext.Provider value={info}>
            <InfoDispatcher.Provider value={dispatchInfo}>
                {children}
            </InfoDispatcher.Provider>
        </InfoContext.Provider>
    );
}