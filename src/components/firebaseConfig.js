// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";




// const firebaseConfig = {
//   apiKey: "AIzaSyCejxR_xxiFkv8mXqTCUpSNMJY1g5vHLAs",
//   authDomain: "chatapp-81ffb.firebaseapp.com",
//   projectId: "chatapp-81ffb",
//   storageBucket: "chatapp-81ffb.appspot.com",
//   messagingSenderId: "498790247588",
//   appId: "1:498790247588:web:e6d9c8fe53fd74de840a31",
// };

// // Firebase uygulamasını başlat (zaten başlatıldıysa tekrar başlatma)
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// // Firebase modüllerini dışa aktar
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export default app;


import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { getFirestore,setLogLevel } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCejxR_xxiFkv8mXqTCUpSNMJY1g5vHLAs",
   authDomain: "chatapp-81ffb.firebaseapp.com",
   projectId: "chatapp-81ffb",
   storageBucket: "chatapp-81ffb.appspot.com",
   messagingSenderId: "498790247588",
   appId: "1:498790247588:web:e6d9c8fe53fd74de840a31",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth();
const firestore = getFirestore();
const storage = getStorage();
const db = getFirestore(app);





export { db };
export { auth, firestore, storage };



// !!!!!!!



