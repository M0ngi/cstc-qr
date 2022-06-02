import React, { useContext } from 'react';
import { InfoContext, InfoDispatcher } from '../../contexts/InfoProvider';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import styles from "./style";

interface IInfoDisplay {
  error: undefined | Error;
  resetErrorBoundary : undefined | any;
};

export function InfoDisplay({ error, resetErrorBoundary } : IInfoDisplay) : JSX.Element{

    const info = useContext(InfoContext);
    const dispatchInfo = useContext(InfoDispatcher);

    if(error){
      dispatchInfo({error});
    }

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={info?.error != null}
        onRequestClose={() => {
          dispatchInfo({});
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{info.error?.message} <Text style={{ fontSize:10, fontWeight:"100" }} >{ '\n' + "if the error lasted long, please contact the IT team" }</Text> </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  dispatchInfo({})}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
}
