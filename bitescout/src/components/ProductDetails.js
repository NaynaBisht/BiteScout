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
        <div className="product-detail">
            <h1>{product.product_name}</h1>
            <img src={product.image_url} alt={product.product_name} />
            <h2>Ingredients</h2>
            <p>{product.ingredients_text || 'No ingredients available.'}</p>
            <h2>Nutritional Values</h2>
            <ul>
                <li>Energy: {product.nutrition_grades}</li>
                <li>Fat: {product.nutriments?.fat}g</li>
                <li>Carbohydrates: {product.nutriments?.carbohydrates}g</li>
                <li>Proteins: {product.nutriments?.proteins}g</li>
                {/* Add other nutritional values as needed */}
            </ul>
            <h2>Labels</h2>
            <p>
                {Array.isArray(product.labels) ? product.labels.join(', ') : 'No labels available.'}
            </p>
        </div>
    );
};

export default ProductDetail;
