/* import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);

const [uid, setUID] = useState("");
const [name, setName] = useState("");

useEffect(()=>{
  return firebase.auth().onAuthStateChanged((user)=>{
    setUID(user.uid);
    setName(user.displayName);
  })
},[])



  useEffect(() => {
    firebase
      .firestore()
      .doc("/chats/" + route.params.chatId)
      .onSnapshot(()=>{
setMessages(snapshot.data()?.messages ?? [])
      });
  }, [route?.params?.chatId]);


const onSend = (m=[])=>{
firebase.firestore().doc('chats/' + route.params.chatId).set({

  messages: GiftedChat.append(messages, m),
},{merge:true})
}

  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: uid,
      name:name,
    }}
  />
  );
};

export default Chat;

const styles = StyleSheet.create({});
 */



import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [uid, setUID] = useState("");
  const [name, setName] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  // Kullanıcı oturumunu dinleme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
        setName(user.displayName || "Anonymous"); // Varsayılan ad
      } else {
        setUID("");
        setName("");
      }
    });

    return () => unsubscribe(); // Dinlemeyi temizle
  }, [auth]);

  // Firestore'dan mesajları dinleme
  useEffect(() => {
    if (!route.params?.chatId) return;

    const chatDocRef = doc(db, "chats", route.params.chatId);
    const unsubscribe = onSnapshot(
      chatDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setMessages(snapshot.data()?.messages || []);
        }
      },
      (error) => {
        console.error("Mesajları alma hatası:", error);
      }
    );

    return () => unsubscribe(); // Dinlemeyi temizle
  }, [db, route?.params?.chatId]);

  // Yeni mesaj gönderme
  const onSend = async (newMessages = []) => {
    if (!route.params?.chatId) return;

    const chatDocRef = doc(db, "chats", route.params.chatId);

    try {
      await updateDoc(chatDocRef, {
        messages: arrayUnion(...GiftedChat.append(messages, newMessages)),
      });
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
    }
  };

  return (
  <View style={{flex:1, marginBottom:50}}>
      <GiftedChat

// Mesajlarda ki tarih ile alakalı fonksiyon
  messages={messages.map(x=>({...x, createdAt: x.createdAt?.toDate()}))}
  onSend={(messages) => onSend(messages)}
  user={{
    _id: uid,
    name: name,
  }}
/>
</View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
