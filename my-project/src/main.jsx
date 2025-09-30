// src/main.jsx  (atau file entry point utama kamu)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx'; // ← tambahkan ini

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>  {/* ← bungkus App dengan ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);