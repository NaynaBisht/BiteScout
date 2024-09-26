import React, { useState, useEffect, useCallback } from "react";
import ProductCard from './ProductCard'
import CategoryFilter from "./CategoryFilter";
import axios from 'axios';

const ProductList = ({ category, searchQuery }) =>{
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const[error, setError] = useState(null)
    const [hasMoreProducts, setHasMoreProducts] = useState(true)

    // New state for sorting
    const [sortBy, setSortBy] = useState('name'); // 'name' or 'nutrition'
    const [sortOrder, setSortOrder] = useState('asc');

    
    const fetchProducts = useCallback(async() =>{
        
        console.log('Current page:', page);

        setLoading(true)
        setError(null)

        try{

            const url = searchQuery
            ? `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&page=${page}&json=true`
            : `https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true&page=${page}`; 
            // Load default products if no search term

            const response = await fetch(url);  


            if(!response.ok){
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()
            console.log('Fetched products:', data.products)

            if (data.products && data.products.length > 0) {
                const uniqueProductsMap = new Map();

                data.products.forEach(product => {
                    uniqueProductsMap.set(product.code, product);
                })

                const uniqueProducts = Array.from(uniqueProductsMap.values())

                setProducts(prev => {
                    const existingCodes = new Set(prev.map(p => p.code));
                    const newProducts = uniqueProducts.filter(p => !existingCodes.has(p.code));
                    return [...prev, ...newProducts];
                });

                setHasMoreProducts(data.products.length>0)

            } else {
                setHasMoreProducts(false);
            }
        } catch (err){
            setError(err.message)
        }finally {
            setLoading(false)
        }
    }, [searchQuery, category, page])

    useEffect(() => {
        setProducts([]); // Clear products when the search or category changes
        setPage(1); // Reset page number
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        fetchProducts();
    }, [page, fetchProducts]); // Fetch products when the page changes


    useEffect(() => {
        if (selectedCategory) {
          setLoading(true);
          // Fetch products by category
          axios.get(`https://world.openfoodfacts.org/category/${selectedCategory}.json`)
            .then(response => {
              setProducts(response.data.products);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching products:', error);
              setLoading(false);
            });
        }
      }, [selectedCategory]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !loading  && hasMoreProducts) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMoreProducts]);

    const loadMore = () => {
        if (hasMoreProducts) {
            setPage((prev) => prev + 1);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Function to sort products based on criteria and order
    const sortProducts = (products) => {
        const sortedProducts = [...products];
        if (sortBy === 'name') {
            sortedProducts.sort((a, b) => {
                const nameA = a.product_name ? a.product_name.toLowerCase() : ''; // Check for undefined
                const nameB = b.product_name ? b.product_name.toLowerCase() : '';
                return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
        } else if (sortBy === 'nutrition') {
            sortedProducts.sort((a, b) => {
                const gradeA = a.nutrition_grade_fr || '';
                const gradeB = b.nutrition_grade_fr || '';
                return sortOrder === 'asc' ? gradeA.localeCompare(gradeB) : gradeB.localeCompare(gradeA);
            });
        }
        return sortedProducts;
    };

    // Function to filter products based on the search query (Name or Barcode)
    const filterProducts = (products) => {
        return products.filter(product => {
            const nameMatch = product.product_name?.toLowerCase().includes(searchQuery.toLowerCase());
            const barcodeMatch = product.code?.includes(searchQuery); // Searching by barcode
            return nameMatch || barcodeMatch;
        });
    };


    // Update products when sorting changes
    useEffect(() => {
        const sortedProducts = sortProducts(products);
        setProducts(sortedProducts);
    }, [sortBy, sortOrder]);

    // Handle sort criteria change
    const handleSortChange = (event) => {
        const { name, value } = event.target;
        if (name === 'sortBy') {
            setSortBy(value);
        } else if (name === 'sortOrder') {
            setSortOrder(value);
        }
    };

    // Sorted and filtered products
    // const sortedProducts = sortProducts(products);
    const sortedFilteredProducts = sortProducts(filterProducts(products));
    

    return (
        <div>
            
            {/* Sorting Options */}
            <div className="flex flex-col sm:flex-row mb-4 justify-between items-center bg-cyan-100 border shadow-xl rounded-lg p-2">

                <CategoryFilter onCategorySelect={handleCategorySelect} />

                <div className="flex gap-4 items-center rounded border bg-orange-200 p-2 w-full sm:w-auto">
                    <h1 className="font-bold text-xl">Sort:</h1>
                    
                        <select name="sortOrder" onChange={handleSortChange} value={sortOrder}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    
                        <select name="sortBy" onChange={handleSortChange} value={sortBy}>
                            <option value="name">Name</option>
                            <option value="nutrition">Nutrition Grade</option>
                        </select>
                    
                </div>
            </div>


            {error && <p className="text-red-500">Error: {error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {products.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}

                {products.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}

                {filteredProducts.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}

                {sortedProducts.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedFilteredProducts.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}
                {sortedFilteredProducts.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div>

            {loading && <p className="text-center">Loading...</p>}

            {!loading && !error && hasMoreProducts &&(
                <button onClick={loadMore} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    {loading ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    )
}
export default ProductList;