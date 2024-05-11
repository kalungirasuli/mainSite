import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "./config";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { doc, setDoc } from "firebase/firestore";

const useSignInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in User ", res);
      return res;
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };
  
  const useCreateUserWithEmailAndPassword = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up: ", res);
      return res;
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };
  
  const useSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Signed in with Google: ", res);
      return res;
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };
  const updateUserProfile = async (userId, specialties, availability) => {
    try {
      const userRef = doc(db, "users", userId); 
      await setDoc(userRef, {
        specialties: specialties,
        availability: availability,
      }, { merge: true }); 
      console.log("User profile updated successfully.");
    } catch (e) {
      console.error("Error updating user profile: ", e);
      throw e; 
    }
  };
  export { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword, useSignInWithGoogle,updateUserProfile };