// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './authSlice';
import userReducer from './userSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'], // only 'auth' and 'user' will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore checks for non-serializable actions
    }),
});

const persistor = persistStore(store);

export { store, persistor };
