import { RouteProp, useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { InfoDispatcher } from "../../contexts/InfoProvider";
import { markCheckedIn } from "../../services/firestore/userFuncs";
import { styles } from "./styles";

interface IProps {
  route : RouteProp<{ params: { scanMode: "checkin" | "edit" } }>
};

export function QRScanner({ route } : IProps) : JSX.Element{
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const infoDispatcher = useContext(InfoDispatcher);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data } : {type: any; data:any}) => {
    if(type !== 256) return;
    setScanned(true);
    if(route.params.scanMode === "edit"){
      navigation.navigate("UpdateProfile", {uid:data})
    }
    else{
      await markCheckedIn(data).catch((error:any)=>{
        infoDispatcher({error})
      }).then(()=>{
        console.log("Done");
      });
      setTimeout(() => {
        setScanned(false);
      }, 4000);
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
