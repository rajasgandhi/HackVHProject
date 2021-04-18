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

import DropDownPicker from "react-native-dropdown-picker";
import App from "./App";
//import { AsyncStorage } from "@react-native-community/async-storage";

export default function CameraSucessScreen({ image, navigation }) {
  const [selectedValue, setSelectedValue] = useState("English");

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          //alignItems: "flex-start",
          //justifyContent: "center",
          marginLeft: 50,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          Image Preview
        </Text>

      </View>
      <Image
          style={{ alignSelf:'center', width: 300, height: 500, marginTop: 40 }}
          source={{ uri: `data:image/jpg;base64,${image.base64}` }}
        />
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 24 }}>Save as: </Text>
        <TextInput
          style={{ borderWidth: 1, width: 50, height: 30 }}
          placeholder="Name"
        ></TextInput>
        
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 200,
        }}
      >
        <Text style={{ fontSize: 24 }}>Move to:</Text>
        <DropDownPicker
          items={[
            {
              label: "English",
              value: "English",
              hidden: true,
            },
            {
              label: "Math",
              value: "Math",
            },
            {
              label: "Science",
              value: "Science",
            },
            {
              label: "Social Studies",
              value: "Social Studies",
            },
            {
              label: "Language",
              value: "Language",
            },
            {
              label: "Elective",
              value: "Elective",
            },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 60, width: 200, marginLeft: 20 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setSelectedValue(item.value)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          marginTop: "30%",
          position: "absolute",
          width: "100%",
          bottom: 0,
          marginBottom: "10%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <Text style={{ fontSize: 20 }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 200 }} onPress={() => navigation.navigate("Home")}>
          <Text style={{ fontSize: 20 }}>Finish</Text>
        </TouchableOpacity>
      </View>
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