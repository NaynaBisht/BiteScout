// src/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            const data = await response.json();
            setProduct(data.product);
            setLoading(false);
        };
        fetchProductDetails();
    }, [barcode]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="product-detail flex flex-col md:flex-row bg-cyan-100 p-5 rounded-2xl">
            
            <img 
                src={product.image_url} 
                alt={product.product_name} 
                className="w-full md:w-[50%] md:h-[50%] md:items-center object-cover rounded" 
            />
            
            <div className="ml-0 md:ml-12 mt-4 md:mt-0">
                <h1 className="font-bold text-xl bg-orange-300 rounded p-3 w-full md:w-1/2 mx-auto text-center">
                    {product.product_name}
                </h1>

                <br />
                
                <h2 className="font-bold underline">Barcode :</h2>
                <p>{product.code || 'No barcode available.'}</p>

                <br />

                <h2 className='font-bold underline'>Categories:</h2>
                <p>{product.categories || 'No categories available.'}</p>

                <br/>

                <h2 className="font-bold underline">Ingredients:</h2>
                <p>{product.ingredients_text || 'No ingredients available.'}</p>

                <br />

                <h2 className='font-bold underline'>Countries where sold:</h2>
                <p>{product.countries_tags ? product.countries_tags.join(', ') : 'No countries available.'}</p>

                <br/>

                <h2 className="underline font-bold">Nutritional Values:</h2>
                <ul>
                    <li>Energy: {product.nutrition_grades}</li>
                    <li>Fat: {product.nutriments?.fat}g</li>
                    <li>Carbohydrates: {product.nutriments?.carbohydrates}g</li>
                    <li>Proteins: {product.nutriments?.proteins}g</li>
                    {/* Add other nutritional values as needed */}
                </ul>

                <br />

                <h2 className="font-bold underline">Labels:</h2>
                <p>
                    {Array.isArray(product.labels) ? product.labels.join(', ') : 'No labels available.'}
                </p>
            </div>
        </div>

    );
};

export default ProductDetail;
