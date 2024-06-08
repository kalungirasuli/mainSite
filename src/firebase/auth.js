import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./config";
import { GoogleAuthProvider, OAuthProvider } from "firebase/auth/cordova";
import { doc, setDoc } from "firebase/firestore";
import { clearUser } from "../redux/authSlice";
import store from "../redux/store";

const SignInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in User ", res);
      return res;
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };
  
  const CreateUserWithEmailAndPassword = async (email, password) => {
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

  const useSignInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Signed in with Apple: ", res);
      return res;
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      store.dispatch(clearUser());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  export { SignInWithEmailAndPassword, CreateUserWithEmailAndPassword, useSignInWithGoogle,updateUserProfile,useSignInWithApple,signOutUser };