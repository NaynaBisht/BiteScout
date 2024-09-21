import React from "react";
import placeholderImage from '../assets/images/images.png';

const ProductCard = ({ product }) => {
    const image_url = product.image_url || placeholderImage
    return (
        <div className="border p-4 rounded shadow">
            <img src={image_url} alt={product.product_name || 'Product Image'} className="w-full h-48 object-cover rounded" />
            
            <h2 className="text-lg font-semibold mt-2">{product.product_name || 'Unnamed Product '}</h2>

            <p className="text-gray-600">Category: {product.category || 'Unknown Category'}</p>

            {product.ingredients_text && (
                <p><strong>Ingredients: </strong>{product.ingredients_text || 'N/A'}</p>
            )}

            <p className="font-bold">Nutrition Grade: {product.nutrition_grade || 'N/A'}</p>
        </div>
    );
}

export default ProductCard;
