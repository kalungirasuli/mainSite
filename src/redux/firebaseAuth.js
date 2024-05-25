// src/firebaseAuth.js

import { auth } from '../firebase/config';
import { clearUser, setUser } from './authSlice';
import store from './store';



export const initAuthListener = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.dispatch(setUser({
        uid: user.uid,
        email: user.email,
        
      }));
    } else {
      store.dispatch(clearUser());
    }
  });
};
