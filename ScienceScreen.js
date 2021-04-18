import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
} from "react-native";

export default function ScienceScreen() {

  return (
    <View style={styles.container}>
      <Image style={{marginTop: 30, marginLeft: 30, width: 200, height: 300}} source={require('./assets/notepic.jpg')} />
      <Text style={{marginLeft: "25%", marginTop: "5%"}}>Science</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
});