import './config';
import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InfoDispatcher, InfoProvider } from './contexts/InfoProvider';
import { InfoDisplay } from './screens/info_display';
import { Navigator } from './navigation';
import { ErrorBoundary } from "react-error-boundary";
export default function App() {
  return (
    <InfoProvider>
      <SafeAreaProvider>
        <ErrorBoundary 
          FallbackComponent={InfoDisplay} 
          onError={(error)=>{
            const dispatcher = useContext(InfoDispatcher);
            dispatcher({error})
          }}
        >
          <Navigator />
          <InfoDisplay error={undefined} resetErrorBoundary={undefined} />
        </ErrorBoundary>
      </SafeAreaProvider>
    </InfoProvider>
  );
}