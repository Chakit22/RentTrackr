import { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import axios from "axios";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  console.log(
    "process.env.EXPO_PUBLIC_API_URL : ",
    process.env.EXPO_PUBLIC_API_URL
  );

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/signup`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response : ", response);
      // console.log("User sucessfully signed up!");
    } catch (error: any) {
      console.error("Error :", error.response.data);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response : ", response);
      // console.log("User sucessfully signed in!");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/signout`,
        {}
      );

      console.log("response : ", response);
      // console.log("User sucessfully signed out!");
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
