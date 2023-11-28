import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.tsx';
import conditionsReducer from './state/conditionsSlice.ts';

import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      dark: '#000000'
    },
    secondary: {
      main: '#118de4',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 400,
  },
});

const store = configureStore({
  reducer: {
    conditions: conditionsReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
