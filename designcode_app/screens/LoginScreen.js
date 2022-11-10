import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-googlesignin/google-signin";

GoogleSignin.configure({
  webClientId:
    "122356695421-j1ikuhaaqtfuak1lkb6h5sr65sec31fh.apps.googleusercontent.com",
  offlineAccess: true,
});

const LoginScreen = () => {
  async function signinWithGoogle() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.mainText}>Social Auth</Text>
        </View>
        <View style={styles.bottomContent}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={signinWithGoogle}
          >
            <Image
              style={styles.googleIcon}
              source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
              }}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#262b2f",
  },
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "#262b2f",
  },
  topContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontSize: 54,
    color: "white",
  },
  googleButton: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
});
export default LoginScreen;
