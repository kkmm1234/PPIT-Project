import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './context/workoutContext';
import { UserProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ContextProvider>
        <App/>
      </ContextProvider>
    </UserProvider>
  </React.StrictMode>
);

