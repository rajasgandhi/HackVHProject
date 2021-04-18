import { StatusBar } from "expo-status-bar";
import TabBar from 'react-native-nav-tabbar';
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
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const entireScreenHeight = Dimensions.get("window").height;
const rem = entireScreenHeight / 380;
const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const secureLogin = async () => {
    try{
    await firebase.auth().signInWithEmailAndPassword(username, password);
    navigation.navigate("Launch");
    }
    catch({message})
    {
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
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState(0);

  const signUp = async () => {
   try{ 
    await firebase.auth().createUserWithEmailAndPassword(username, password);
    navigation.navigate("Login");
  }
  catch({message})
  {
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

function MainScreen() {
  const signOut = async () => {
   try{ 
    await firebase.auth().signOut();
    navigation.navigate("Login");
  }
  catch({message})
  {
    alert(message);
  }
  };
  
  return (
    <TabBar>
    <TabBar.Item
        icon={require('./assets/tab2.png')}
        selectedIcon={require('./assets/tab2.png')}
        title="Home"
    >
     <View>
        
            <View>
              <Text style={{fontSize: 25}}>Camera</Text>
            </View>
          
      </View>
    </TabBar.Item>
    <TabBar.Item>
        <View style={styles.textContent}>
            <Text style={{fontSize: 18}}>Camera</Text>
        </View>
    </TabBar.Item>
    <TabBar.Item
        icon={require('./assets/tab3.png')}
        selectedIcon={require('./assets/tab3.png')}
        title="Settings"
    >
        <View style={styles.textContent}>
            <Text style={{fontSize: 18}}>Settings</Text>
        </View>
  </TabBar.Item>
</TabBar>
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
          <Stack.Screen name="Launch" component={MainScreen} />
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
});
