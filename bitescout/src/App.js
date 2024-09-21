import React, { useState } from "react";
import ProductList from './components/ProductList';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for: ", searchQuery);
  };

  return (
    <Router>
      <div className="container mx-auto p-2">
        <Header />
        <InfoSection />
        <h1 className="text-3xl font-bold text-center mb-4">Food Products</h1>

        <Routes>
          <Route path="/" element={<ProductList category="someCategory" searchQuery={searchQuery} />} />
          <Route path="/product/:barcode" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
