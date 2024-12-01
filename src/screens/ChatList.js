
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  FAB,
  List,
  Portal,
  TextInput,
} from "react-native-paper";





const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(true);


// 5. video 6. dk
  useEffect(() => {
    firebase.firestore().collection('chats').add({
      users: ['111@gmail.com', '111@gmail.com'],
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <>
        {/*  
     <List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     />
     <List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     />
     <List.Item 
     title='User Name'
     description='Hi, I will be waiting for you'
     left={()=><Avatar.Text label='UN' size={56}/>}
     /> */}
      </>

      <List.Item
        title="User Name"
        description="Hi, I will be waiting for you"
        left={() => <Avatar.Text label="UN" size={56} />}
      />
      <Divider leftInset style={{ backgroundColor: "gray" }} />

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Enter user email" />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{
          backgroundColor: "aqua",
          position: "absolute",
          bottom: 100,
          right: 26,
        }}
        onPress={() => setIsDialogVisible(true)}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
