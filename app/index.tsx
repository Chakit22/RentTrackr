import { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { auth } from "../lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user : ", userCredential.user);
      console.log("User sucessfully aigend up1");
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
      <Button title="Submit" onPress={handleSubmit} />
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
