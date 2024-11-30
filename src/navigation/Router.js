import { StyleSheet, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatList from "../screens/ChatList";
import Settings from "../screens/Settings";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Chat from "../screens/Chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-native-paper";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import {auth,db} from "../components/firebaseConfig"

const firebaseConfig = {
  apiKey: "AIzaSyCejxR_xxiFkv8mXqTCUpSNMJY1g5vHLAs",
  authDomain: "chatapp-81ffb.firebaseapp.com",
  projectId: "chatapp-81ffb",
  storageBucket: "chatapp-81ffb.firebasestorage.app",
  messagingSenderId: "498790247588",
  appId: "1:498790247588:web:e6d9c8fe53fd74de840a31",
};

/* firebase.initializeApp(firebaseConfig); */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // Kullanıcı durumunu dinle
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Eğer kullanıcı giriş yapmamışsa "SignUp" ekranına yönlendir
        navigation.navigate("SignUp");
      }
    });
    return () => unsubscribe();
  }, [navigation]);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          shadowRadius: 2,
          shadowOffset: { width: 0, height: -10 },
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          borderWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "blue" : "gray",
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              ChatList
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbubbles" color="blue" size={30} />
            ) : (
              <Ionicons name="chatbubbles" color="gray" size={21} />
            ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "blue" : "gray",
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              Settings
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings-outline" color="blue" size={30} />
            ) : (
              <Ionicons name="settings-outline" color="gray" size={21} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: "fullScreenModal" }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
