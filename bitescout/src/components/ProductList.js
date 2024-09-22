import React, { useState, useEffect, useCallback } from "react";
import ProductCard from './ProductCard'
import SearchBar from "./SearchBar";
import axios from 'axios';

const ProductList = ({selectedCategory}) =>{
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const[error, setError] = useState(null)
    const [hasMoreProducts, setHasMoreProducts] = useState(true);

    const fetchProducts = useCallback(async() =>{

        setLoading(true)
        setError(null)


        try{
            console.log(`Fetching products for: ${searchQuery}`)
            const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=%7Bname%7D&json=true`);
            // const response = await fetch()

            console.log('Response:', response); 

            if(!response.ok){
                throw new Error('Failed to fetch products')
            }
            const data = await response.json()
            console.log('Fetched products:', data.product)

            setProducts(data.products || [])
            console.log( 'Data : ' ,data);

            if (data.products && data.products.length > 0) {
                setProducts(data.products)
                setHasMoreProducts(data.products.length === 20)
            } else {
                setHasMoreProducts(false);
            }
        } catch (err){
            setError(err.message)
        }finally {
            setLoading(false)
        }
    }, [searchQuery])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (searchQuery) {
            fetchProducts();
        }
    }, [fetchProducts, searchQuery]);

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
    
    useEffect(() =>{
        const handleScroll = () =>{
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading ){
                loadMore()
            }
        }
        window.addEventListener('scroll', handleScroll)

        return() => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [loading])

    const loadMore = () => {
        setPage((prev)=> prev + 1)
    }

    return (
        <div>
        

            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}

                {products.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div>

            {products.length > 0 ? (
                <ul>
                {products.map(product => (
                    <li key={product.id}>
                    <h4>{product.product_name}</h4>
                    <img src={product.image_url} alt={product.product_name} style={{ width: '100px' }} />
                    <p>Brand: {product.brands}</p>
                    <p>Category: {selectedCategory}</p>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No products found for this category.</p>
            )}

            {loading && <p className="text-center">Loading...</p>}

            {!loading && !error && (
                <button onClick={loadMore} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    {loading ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    )
}
export default ProductList;