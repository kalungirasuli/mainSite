// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        user: null,
        super: null,
        role: null,
        email: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return {
      user: null,
      super: null,
      role: null,
      email: null,
    };
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.super = action.payload.super;
      state.role = action.payload.role;
      state.email = action.payload.email;
      saveState(state); // Save entire state object
    },
    clearUser: (state) => {
      state.user = null;
      state.super = null;
      state.role = null;
      state.email = null;
      saveState(state); // Save entire state object
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
