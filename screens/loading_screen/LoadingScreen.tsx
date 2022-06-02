import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./style";

const LoadingScreen = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#e07a2e" />
  </View>
);

export default LoadingScreen;