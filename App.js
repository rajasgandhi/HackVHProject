import { StatusBar } from "expo-status-bar";
import React from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [cameraReady, setCameraReady] = React.useState(false);
  const [cameraRef, setCameraRef] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return (
      <Text>
        Please allow access to Camera to use the Scan Receipt feature.
      </Text>
    );
  }
  const handleImage = async (image) => {
    try {
      if (cameraRef) {
        //cameraRef.pausePreview();
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

      console.log(ocrRespJSON);
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
          quality: 0.3,
        });
        //console.log(image);
        await handleImage(image);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        onCameraReady={() => setCameraReady(true)}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        style={styles.camera}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleOnPress}
        >
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
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: "white",
                height: 40,
                width: 40,
                backgroundColor: "white",
              }}
            ></View>
          </View>
        </TouchableOpacity>
      </Camera>
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
    width: "90%",
    height: "90%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
