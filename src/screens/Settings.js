import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../components/firebaseConfig"; // Modern Firebase yapılandırması
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";

const Settings = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Current User>>>>>>>>:", user); // Kullanıcı verilerini kontrol edin
      if (user) {
        setName(user?.displayName || "Unnamed User");
        setEmail(user?.email || "No Email Provided");
      } else {
        navigation.navigate("SignIn");
      }
    });

    return unsubscribe;
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
    <View style={styles.container}>
      <Avatar.Text
        label={
          name
            ? name.split(" ").reduce((prev, current) => prev + current[0], "")
            : "U"
        }
        size={64}
        style={styles.avatar}
      />
      <Title style={styles.title}>{name || "Unnamed User"}</Title>
      <Title style={styles.email}>{email || "No Email Available"}</Title>
      <Button onPress={handleSignOut} style={styles.signOutButton}>
        Sign Out
      </Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 32,
  },
  avatar: {
    backgroundColor: "#0A5EB0",
  },
  title: {
    color: "black",
    fontSize: 24,
    marginVertical: 8,
  },
  email: {
    color: "gray",
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 16,
    backgroundColor: "aqua",
  },
});
