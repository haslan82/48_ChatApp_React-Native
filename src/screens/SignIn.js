import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Subheading, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../components/firebaseConfig";
import { useNavigation } from "@react-navigation/native";






const SignIn = () => {
 
  const [email, setEmail] = useState("Haslan82@hotmail.com");
  const [password, setPassword] = useState("111111");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const signIn = async () => {
    setIsLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.popToTop(); // Başarılı giriş sonrası ana ekrana dön
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={{ margin: 16 }}>
      {!!error && (
        <Subheading style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
          {error}
        </Subheading>
      )}
      <TextInput
        style={{ marginTop: 12 }}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={{ marginTop: 12 }}
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={{ flexDirection: "row", marginTop: 16, justifyContent: "space-between" }}>
        <Button onPress={() => navigation.navigate("SignUp")} compact>
          Sign Up
        </Button>
        <Button onPress={signIn} loading={isLoading} mode="contained">
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
