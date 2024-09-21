import React, { useState } from "react";
import ProductList from './components/ProductList.js';
import Header from './components/Header.js'
import InfoSection from './components/InfoSection.js';
import './index.css'


function App() {

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () =>{
    console.log("Searching for : ", searchQuery)
  }

  return (
    <div className="container mx-auto p-2">
      <Header />
      <InfoSection />
      <h1 className="text-3xl font-bold text-center mb-4 ">Food Products</h1>
      
      <ProductList category="someCategory" searchQuery={searchQuery} />
    </div>
  );
}

export default App;
