import React, { useState } from "react";
import ProductList from './components/ProductList';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from "./components/SearchBar";
import './index.css';

function App() {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="container mx-auto p-2">
        <Header />
        <InfoSection />
        <h1 className="text-3xl font-extrabold text-center lg:mb-4 sm:mb-2 ">Food Products</h1>

        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        
        <Routes>
          <Route path="/" 
                 element={<ProductList searchQuery={searchQuery} />} />

          <Route path="/product/:barcode" 
                 element={<ProductDetails />} 
          
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
