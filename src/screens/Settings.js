import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../components/firebaseConfig'; // Modern Firebase modülünü içe aktar

const Settings = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Başarıyla çıkış yapıldıktan sonra kullanıcıyı giriş ekranına yönlendirin
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        console.error('Sign out error:', error.message);
      });
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 16 }}>
      <Avatar.Text label="UN" />
      <Title>UserName</Title>
      <Title>user@name.com</Title>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
