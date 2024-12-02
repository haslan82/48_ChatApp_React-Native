import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../components/firebaseConfig"; // Modern Firebase yapılandırması
import { onAuthStateChanged, signOut } from "firebase/auth";

const Settings = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user?.displayName ?? " ");
        setEmail(user?.email ?? " ");
      } else {
        // Kullanıcı oturum açmadıysa giriş ekranına yönlendirin
        navigation.navigate("SignIn");
      }
    });

    return unsubscribe; // Bellek sızıntısını önlemek için aboneliği temizle
  }, [navigation]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.error("Sign out error:", error.message);
      });
  };

  return (
    <View style={{ alignItems: "center", marginTop: 16 }}>
    <Avatar.Text label={name?.split(' ').reduce((prev, current) => prev + current[0], ' ')} 
      
      />

      <Title style={{color:'black'}}>{name}</Title>
      <Title>{email}</Title>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
