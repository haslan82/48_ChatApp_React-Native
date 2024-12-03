import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebaseConfig"; // Firebase'i buradan içe aktarın
import ChatList from "../screens/ChatList";
import Settings from "../screens/Settings";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Chat from "../screens/Chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("SignUp");
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "ChatList") {
          iconName = focused? "chatbox-ellipses" : "chatbox-outline";
        } else if (route.name === "Settings") {
          iconName = focused? "settings" : "settings-outline";
        }
 const iconSize = focused ? 30 : size;
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Settings" component={Settings} />
      
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} 
    
          />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Router;
