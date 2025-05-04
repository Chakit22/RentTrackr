import { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { auth } from "../lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user : ", userCredential.user);
      console.log("User sucessfully signed up!");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user : ", userCredential.user);
      console.log("User sucessfully signed in!");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const userCredential = await signOut(auth);
      console.log("User sucessfully signed out!");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <View
      style={{
        minHeight: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
      }}
    >
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password..."
      />
      <Button title="Sign up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
