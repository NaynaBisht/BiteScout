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

    
    const fetchProducts = useCallback(async() =>{

        setLoading(true)
        setError(null)

        try{
            const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true `);

            if(!response.ok){
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()
            console.log('Fetched products:', data.product)

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

                setHasMoreProducts(data.products.length === 20)

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
        fetchProducts(); // Fetch products on search or category change
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        fetchProducts();
    }, [page]); // Fetch products when the page changes


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
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
                loadMore();
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

    return (
        <div>
            <CategoryFilter onCategorySelect={handleCategorySelect} /> 
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}

                {products.map((product) => (
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