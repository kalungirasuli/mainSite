import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from "react-redux"
// import { initAuthListener } from './redux/firebaseAuth.js';
import {store,persistor} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

// initAuthListener();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    
  </React.StrictMode>,
)