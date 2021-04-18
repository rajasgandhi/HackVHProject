import { StatusBar } from "expo-status-bar";
import React from "react";
import { Camera } from "expo-camera";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import CameraSucessScreen from "./CameraSuccessScreen";
//import { AsyncStorage } from "@react-native-community/async-storage";

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [cameraReady, setCameraReady] = React.useState(false);
  const [cameraRef, setCameraRef] = React.useState(null);

  const [pictureAdded, setPictureAdded] = React.useState(false);
  const [mostRecentPicture, setMostRecentPicture] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return (
      <Text>Please allow access to Camera to use the Scan Notes feature.</Text>
    );
  }
  const handleImage = async (image) => {
    try {
      if (cameraRef) {
        cameraRef.pausePreview();
      }

      const apiKey = "0569232a5d88957";
      const b64Image = `data:image/jpg;base64,${image.base64}`;

      const formData = new FormData();
      formData.append("language", "eng");

      formData.append("isOverlayRequired", false);
      formData.append("scale", true);
      formData.append("base64Image", b64Image);
      formData.append("isTable", true);
      formData.append("OCREngine", 2);

      const ocrResp = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          apikey: apiKey,
        },
        body: formData,
      });
      const ocrRespJSON = await ocrResp.json();
      let words = [];
      for (
        let i = 0;
        i < ocrRespJSON.ParsedResults[0].TextOverlay.Lines.length;
        i++
      ) {
        for (
          let j = 0;
          j < ocrRespJSON.ParsedResults[0].TextOverlay.Lines[i].Words.length;
          j++
        ) {
          words.push(
            ocrRespJSON.ParsedResults[0].TextOverlay.Lines[i].Words[j].WordText
          );
        }
      }
      //console.log(words);
      const numAdded = words.length;
      const imageAddStuff = {
        noteimage: image.base64,
        keywords: words,
        numkeywords: numAdded,
      };

      const notes = await AsyncStorage.getItem("notes");
      let note1 = JSON.parse(notes);
      if (!note1) {
        note1 = [];
      }
      note1.push(imageAddStuff);
      await AsyncStorage.setItem("notes", JSON.stringify(note1))
        .then(() => {
          //console.log("It was saved successfully");
        })
        .catch(() => {
          //console.log("There was an error saving the product");
        });

      //console.log(await AsyncStorage.getItem("notes"));
      //alert("Notes Added!");
      Alert.alert(
        //This is title
        "Notes Added!",
        //This is body text
        "Press OK or Cancel",
        [
          {
            text: "OK",
            onPress: () => {
              //console.log("Yes Pressed");
              setMostRecentPicture(image.base64);
              setPictureAdded(true);
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              //console.log("No Pressed");
              cameraRef.resumePreview();
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      //cameraRef.resumePreview();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleOnPress = async () => {
    if (cameraReady && cameraRef) {
      try {
        const image = await cameraRef.takePictureAsync({
          base64: true,
          // exif: true,
          quality: 0.5,
        });

        await handleImage(image);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (pictureAdded) {
    if (mostRecentPicture != null) {
      return <CameraSucessScreen image={mostRecentPicture} />;
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        onCameraReady={() => setCameraReady(true)}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        style={styles.camera}
      ></Camera>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleOnPress}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 50,
            borderColor: "white",
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 50,
              borderColor: "white",
              height: 40,
              width: 40,
              backgroundColor: "black",
            }}
          ></View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1.25,
    marginTop: 70,
    width: "90%",
    height: "90%",
  },
  buttonContainer: {
    flex: 0.15,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
