import React, { useState, useEffect, useCallback } from "react";
import ProductCard from './ProductCard'


const ProductList = ({category}) =>{
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const[error, setError] = useState(null)

    const fetchProducts = useCallback(async() =>{
        setLoading(true)

        setError(null)
        try{
            // const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=%7Bname%7D&json=true`);
            const response = await fetch()

            console.log('Response:', response);

            if(!response.ok){
                throw new Error('Failed to fetch products')
            }
            const data = await response.json()
            setProducts(data.products || [])
            console.log( 'Data : ' ,data);

            if (data.products && data.products.length > 0) {
            setProducts((prev) => [...prev, ...data.products]); // Add fetched products to the state
            } else {
            setError('No products found.');
            }
        } catch (err){
            setError(err.message)
        }
        setLoading(false)
    }, [category])

    useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);

    useEffect(() => {
        fetchProducts();
      }, [page, fetchProducts]);

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

    return(
        <div>
            {error && <p className="text-red-500" > Error: {error} </p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 && !loading && !error && (
                    <p className=" text-center " > No products found </p>
                ) }

                { products.map((product)=>(
                    <ProductCard key={product.code} product={product}/>
                ))}
            </div>

            {loading && <p className=" text-center " >Loading...</p> }

            {!loading && !error &&(
                <button onClick={loadMore} className="mt-4 p-2 bg-blue-500 text-white rounded" >
                {loading ? 'Loading...':'Load more'}
            </button>
            )}
        </div>
    )
}
export default ProductList;