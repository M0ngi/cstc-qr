import { RouteProp, useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { markCheckedIn } from "../../services/firestore/userFuncs";
import { styles } from "./styles";

interface IProps {
  route : RouteProp<{ params: { scanMode: "checkin" | "edit" } }>
};

export function QRScanner({ route } : IProps) : JSX.Element{
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  console.log(navigation);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data } : {type: any; data:any}) => {
    setScanned(true);
    if(route.params.scanMode === "edit"){
      
    }
    else{
      await markCheckedIn(data);
      setTimeout(() => {
        setScanned(false);
      }, 1000);
    }
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.cameraView}
      />
    </View>
  );
}
