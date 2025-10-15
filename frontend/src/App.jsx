import React from 'react';
import Header from './components/Header/Header';
import AppRouter from './router/AppRouter';
import Footer from './components/Footer/Footer';
import { ModalProvider } from './context/ModalContext';


import './App.css';

function App() {
  return (
    <ModalProvider>
      <div className="app-container">
        <Header />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default App;