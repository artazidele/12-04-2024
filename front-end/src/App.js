import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AllProducts } from './components/AllProducts';
import { OneProduct } from './components/OneProduct';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllProducts />}/>
          <Route path="/:id" element={<OneProduct />}/>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
};

export default App;