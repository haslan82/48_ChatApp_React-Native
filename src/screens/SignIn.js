import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Subheading, TextInput } from "react-native-paper";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import "firebase/compat/auth";




const SignIn = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);
 const [ error, setError] = useState("");


const navigation = useNavigation();

const signIn = async ()=>{
  setIsLoading(true);
 
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    setIsLoading(false);
    return;
  }
 try {
 await firebase.auth().signInWithEmailAndPassword(email, password)
navigation.popToTop();
/* navigation.replace("Main", { screen: "Settings" }); */
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

      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "space-between",
        }}
      >
        <Button
        onPress={()=> navigation.navigate('SignUp')}
        compact>Sign Up</Button>
        <Button 
        onPress={()=>signIn()}
        loading={isLoading}
        mode="contained">Sign In</Button>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
