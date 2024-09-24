import React from "react";
import placeholderImage from '../assets/images/images.png';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const image_url = product.image_url || placeholderImage
    return (
        <div className="border p-4 rounded shadow">
            <img src={image_url} alt={product.product_name || 'Product Image'} className="w-full h-48 object-cover rounded" />
            
            <h2 className="text-lg font-semibold mt-2">{product.product_name || 'Unnamed Product '}</h2>

            <p> <strong>Category:</strong> {product.categories || 'Unknown Category'}</p>
            <p><strong>Brand:</strong> {product.brands || 'No Brand Information'}</p>

            {product.ingredients_text && (
                <p><strong>Ingredients: </strong>{product.ingredients_text || 'N/A'}</p>
            )}

            <p className="font-bold">Nutrition Grade: {product.nutrition_grades || 'N/A'}</p>
            
            <Link to={`/product/${product.code}`}> 
                <button className="bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition duration-300">
                    View Details
                </button>
            </Link>
        </div>
    );
}

export default ProductCard;
