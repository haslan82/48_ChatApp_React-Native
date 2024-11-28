import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import firebase from "firebase/compat/app";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);
 const [ error, setError] = useState("");

const createAccount = async ()=>{
 const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
 await response.user.updateProfile({displayName:name})
}


  return (
    <View style={{ margin: 16 }}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ marginTop: 12 }}
        label="Email"
        value={email}
        onChangeText={(text) => setName(email)}
      />
      <TextInput
        style={{ marginTop: 12 }}
        label="Password"
        value={password}
        onChangeText={(text) => setName(password)}
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "space-between",
        }}
      >
        <Button compact>Sign In</Button>
        <Button mode="contained">Sign Up</Button>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
