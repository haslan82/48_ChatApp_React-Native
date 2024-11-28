import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={{alignItems:'center', marginTop:16}}>
     <Avatar.Text label='UN'/>
     <Title>UserName</Title>
    <Title>user@name.com</Title>
    <Button onPress={()=>firebase.auth().signOut()}>Sign Out</Button>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})