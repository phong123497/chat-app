import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXibDUdgeQCpQ6jvCc4NiAgwlMnpqqzoI",
  authDomain: "chat-app-17975.firebaseapp.com",
  projectId: "chat-app-17975",
  storageBucket: "chat-app-17975.appspot.com",
  messagingSenderId: "920968369444",
  appId: "1:920968369444:web:b75a14e890ba0487aa0fb1",
  measurementId: "G-J5784147ZG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
