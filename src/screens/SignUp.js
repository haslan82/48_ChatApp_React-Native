import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Subheading, TextInput } from "react-native-paper";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import "firebase/compat/auth";




const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);
 const [ error, setError] = useState("");


const navigation = useNavigation();

const createAccount = async ()=>{
  setIsLoading(true);
 
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    setIsLoading(false);
    return;
  }
 try {
  const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
 await response.user.updateProfile({displayName:name})
// navigation.popToTop();
navigation.replace("Main", { screen: "Settings" });
 } catch (error) {
  setIsLoading(false);
  setError(error.message)
 }
}


  return (
    <View style={{ margin: 16 }}>
      {!!error && (<Subheading style={{color:'red', textAlign:'center', marginBottom:16}}>
        {error}
      </Subheading>)}
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ marginTop: 12 }}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ marginTop: 12 }}
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "space-between",
        }}
      >
        <Button
        onPress={()=> navigation.navigate('SignIn')}
        compact>Sign In</Button>
        <Button 
        onPress={()=>createAccount()}
        loading={isLoading}
        mode="contained">Sign Up</Button>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
