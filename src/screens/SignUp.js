import { View } from "react-native";
import React, { useState } from "react";
import { Button, Subheading, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../components/firebaseConfig";
import { useNavigation } from "@react-navigation/native";






const SignUp = () => {
  const [name, setName]= useState(" Hüseyin ASLAN");
  const [email, setEmail] = useState("Haslan82@hotmail.com");
  const [password, setPassword] = useState("111111");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const signUp = async () => {
    setIsLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password,name);
      navigation.navigate("Main"); // Kayıt başarılı olursa SignIn ekranına yönlendir
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
        style={{ marginTop: 16 }}
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
     
      />
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
        <Button onPress={() => navigation.navigate("SignIn")} compact>
          Sign In
        </Button>
        <Button onPress={signUp} loading={isLoading} mode="contained">
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default SignUp;


