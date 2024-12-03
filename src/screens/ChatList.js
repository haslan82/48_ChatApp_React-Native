import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { collection, addDoc, onSnapshot, getFirestore, query, where } from "firebase/firestore";
import { auth } from "../components/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  // Kullanıcının oturum durumunu dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  // chats koleksiyonunu dinle
  useEffect(() => {
    if (!email) return; // email yoksa dinleme yapma

    const db = getFirestore();
    const chatsQuery = query(collection(db, "chats"), where("users", "array-contains", email));

    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const chatsList = [];
      querySnapshot.forEach((doc) => {
        chatsList.push({ id: doc.id, ...doc.data() });
      });
      setChats(chatsList); // Verileri state'e kaydet
       // console.log("Chats: ", chatsList);
    });

    return () => unsubscribe(); // Bileşen unmount olduğunda dinlemeyi durdur
  }, [email]);

  // Yeni bir sohbet oluştur
  const createChat = async () => {
    if (!email || !userEmail) return;

    setIsLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, "chats"), {
        users: [email, userEmail],
      });
      console.log("Chat added successfully!");
    } catch (error) {
      console.error("Error adding chat: ", error);
    } finally {
      setIsLoading(false);
      setIsDialogVisible(false);
      navigation.navigate("Chat", {
        chatId:docRef?.id
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <List.Item
          onPress={(()=>navigation.navigate('Chat', {chatId:chat.id}))}
            title={chat.users.find((x) => x !== email)}
            // description="Hi, I will be waiting for you"
         
            description={(chat.messages?.[chat.messages.length - 1]?.text) ?? "..."}



            left={() => (
              <Avatar.Text
                label={chat.users
                  .find((x) => x !== email)
                  .split(" ")
                  .reduce((prev, current) => prev + current[0], "")}
                size={56}
              />
            )}
          />
          <Divider leftInset style={{ backgroundColor: "gray" }} />
        </React.Fragment>
      ))}

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              label="Enter user email"
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={createChat} loading={isLoading}>
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{
          backgroundColor: "aqua",
          position: "absolute",
          bottom: 40,
          right: 26,
        }}
        onPress={() => setIsDialogVisible(true)}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
