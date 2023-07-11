import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [emai, setEmai] = useState("");
  const [password, setPassword] = useState("");
  //   console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, emai, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        placeholder="Email"
        onChange={(e) => {
          setEmai(e.target.value);
        }}
      ></input>
      <input
        placeholder="pass"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
