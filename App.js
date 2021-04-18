import { StatusBar } from "expo-status-bar";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  Alert
} from "react-native";
import { Camera } from "expo-camera";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import CameraSucessScreen from "./CameraSuccessScreen";

const entireScreenHeight = Dimensions.get("window").height;
const rem = entireScreenHeight / 380;
const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const secureLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
      navigation.navigate("Home");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.container}>
          <View style={{ flex: 0.3 }}></View>
          <View
            style={{
              flex: 1.8,
              width: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={require("./assets/logo.png")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.title}>NoteMaster</Text>
          </View>
          <View style={{ flex: 0.05 }}></View>
          <View
            style={{
              flex: 0.5,
              width: "100%",
              height: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={styles.textborder}>
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="Email"
                keyboardType="ascii-capable"
                onChangeText={(value) => setUsername(value)}
                value={username}
              ></TextInput>
            </View>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View
            style={{
              flex: 0.5,
              width: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={styles.textborder}>
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="Password"
                keyboardType="ascii-capable"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
                value={password}
              ></TextInput>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              width: "90%",
              marginLeft: "52%",
              backgroundColor: "white",
            }}
          ></View>
          <View
            style={{
              flex: 1.5,
              width: "90%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: "4%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.loginbutton}>
                <Text
                  style={{ color: "#add8e6", fontSize: 40 }}
                  onPress={() => secureLogin()}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <View />
              <View style={{ flex: 0.25 }}></View>
              <View
                style={{
                  flex: 1,
                  marginTop: "4%",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Sign Up")}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(username, password);
      navigation.navigate("Login");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.container}>
          <View style={{ flex: 0.3 }}></View>
          <View
            style={{
              flex: 1.8,
              width: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={require("./assets/logo.png")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={{ flex: 0.05 }}></View>
          <View
            style={{
              flex: 0.5,
              width: "100%",
              height: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={styles.textborder}>
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="Email"
                keyboardType="ascii-capable"
                onChangeText={(value) => setUsername(value.toString())}
                value={username}
              ></TextInput>
            </View>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View
            style={{
              flex: 0.5,
              width: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={styles.textborder}>
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="Password"
                secureTextEntry={true}
                keyboardType="ascii-capable"
                onChangeText={(value) => setPassword(value)}
                value={password}
              ></TextInput>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              width: "90%",
              marginLeft: "52%",
              backgroundColor: "white",
            }}
          ></View>
          <View
            style={{
              flex: 1.5,
              width: "90%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: "4%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.signupbutton}
                onPress={() => signUp()}
              >
                <Text style={{ color: "#add8e6", fontSize: 20 }}>
                  Create Your Account
                </Text>
              </TouchableOpacity>
              <View />
              <View style={{ flex: 0.25 }}></View>
              <View
                style={{
                  flex: 1,
                  marginTop: "4%",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Have an account? </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
function CameraScreen({ navigation }) {
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
              setMostRecentPicture(image);
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
      return <CameraSuccessScreen image={mostRecentPicture} />;
    }
  }
  return (
    <View>
        <Camera
          style={styles.camera}
          pictureSize="high"
          onCameraReady={() => setCameraReady(true)}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        ></Camera>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleOnPress}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 50,
            borderColor: "white",
            height: 60,
            width: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Image style={{ width: 120, height: 77.5}} source={require("./assets/imagecapture.jpg")} />
        </View>
      </TouchableOpacity>
      
      <View style={{ flex: 1.2, flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.taskbarbutton}
          onPress={() => navigation.navigate("Camera")}
        >
          <Image
            source={require("./assets/tab1.png")}
            style={{ flex: 0.5 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}></View>
        <TouchableOpacity
          style={styles.taskbarbutton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/tab2.png")}
            style={{ flex: 0.5 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}></View>
        <TouchableOpacity
          style={styles.taskbarbutton}
          onPress={() => navigation.navigate("About")}
        >
          <Image
            source={require("./assets/tab3.png")}
            style={{ flex: 0.5 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function AboutScreen({ navigation }) {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("Login");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <View>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity style={styles.loginbutton}>
        <Text
          style={{ color: "#add8e6", fontSize: 40 }}
          onPress={() => signOut()}
        >
          Sign Out
        </Text>
        <View style={{ flex: 8 }}></View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1.2, flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.taskbarbutton}
          onPress={() => navigation.navigate("Camera")}
        >
          <Image
            source={require("./assets/tab1.png")}
            style={{ flex: 0.5 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}></View>
        <TouchableOpacity
          style={styles.taskbarbutton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/tab2.png")}
            style={{ flex: 0.5 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}></View>
        <TouchableOpacity
          style={styles.taskbarbutton}
          onPress={() => navigation.navigate("About")}
        >
          <Image
            source={require("./assets/tab3.png")}
            style={{ flex: 0.5 }}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.container}>
          <View style={{ flex: 0.2 }}></View>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={styles.textborder}>
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="Search"
                keyboardType="ascii-capable"
                onChangeText={(value) => setSearch(value)}
                value={search}
              ></TextInput>
            </View>
          </View>
          <View style={{ flex: 0.5 }}></View>
          <View style={{ flex: 1.2 }}>
            <TouchableOpacity style={styles.classbutton}>
              <Text style={{ color: "white", fontSize: 40 }}>MATH</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.2 }}>
            <TouchableOpacity style={styles.classbutton}>
              <Text style={{ color: "white", fontSize: 40 }}>SCIENCE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.2 }}>
            <TouchableOpacity style={styles.classbutton}>
              <Text style={{ color: "white", fontSize: 40 }}>
                SOCIAL STUDIES
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.2 }}>
            <TouchableOpacity style={styles.classbutton}>
              <Text style={{ color: "white", fontSize: 40 }}>ENGLISH</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.2 }}>
            <TouchableOpacity style={styles.classbutton}>
              <Text style={{ color: "white", fontSize: 40 }}>LANGUAGE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.2 }}>
            <TouchableOpacity style={styles.classbutton}>
              <Text style={{ color: "white", fontSize: 40 }}>ELECTIVE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.8 }}></View>
          <View style={{ flex: 1.2, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.taskbarbutton}
              onPress={() => navigation.navigate("Camera")}
            >
              <Image
                source={require("./assets/tab1.png")}
                style={{ flex: 0.5 }}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
            <View style={{ flex: 0.8 }}></View>
            <TouchableOpacity
              style={styles.taskbarbutton}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("./assets/tab2.png")}
                style={{ flex: 0.5 }}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
            <View style={{ flex: 0.8 }}></View>
            <TouchableOpacity
              style={styles.taskbarbutton}
              onPress={() => navigation.navigate("About")}
            >
              <Image
                source={require("./assets/tab3.png")}
                style={{ flex: 0.5 }}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default function App() {
  if (!firebase.apps.length) {
    var firebaseConfig = {
      apiKey: "AIzaSyBuS2ygNcIPdx8AP-QDLsEiZwe_dB-PzIU",
      authDomain: "hackvh-3b746.firebaseapp.com",
      projectId: "hackvh-3b746",
      storageBucket: "hackvh-3b746.appspot.com",
      messagingSenderId: "296938440603",
      appId: "1:296938440603:web:9a5a249a051baebb61433e",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  let [fontsLoaded] = useFonts({
    Barlow: require("./assets/fonts/Barlow_100Thin_Italic.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
  },

  title: {
    color: "#add8e6",
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "Barlow",
  },

  textinput: {
    fontSize: 12 * rem,
    fontFamily: "Barlow",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    marginLeft: "4%",
    marginRight: "4%",
  },
  textborder: {
    width: 380,
    justifyContent: "center",
    flex: 0.9,
    borderColor: "#add8e6",
    borderWidth: 1,
    borderRadius: 15,
  },
  loginbutton: {
    height: "40%",
    width: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#add8e6",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  classbutton: {
    height: "80%",
    width: 340,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#add8e6",
    justifyContent: "center",
    alignItems: "center",
  },
  taskbarbutton: {
    height: 100,
    width: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#add8e6",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  signupbutton: {
    height: "40%",
    width: 200,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#add8e6",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "#0000FF",
    fontWeight: "bold",
    fontFamily: "Barlow",
  },
  camera: {
    flex: 20,
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
