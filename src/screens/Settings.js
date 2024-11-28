import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Title } from 'react-native-paper'

const Settings = () => {
  return (
    <View style={{alignItems:'center', marginTop:16}}>
     <Avatar.Text label='UN'/>
     <Title>UserName</Title>
    <Title>user@name.com</Title>
    <Button>Sign Out</Button>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})