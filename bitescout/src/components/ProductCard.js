import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="border p4 rounded shadow ">
            <img src={product.image_url || 'placeholder.png'} alt = { product.product_name } className=" w-full h-48 object-cover rounded"/>
            
            <h2 className=" text-lg font-semibold mt-2 "> {product.product_name} </h2>

            <p className=" text-gray-600 "> Category: {product.category || 'Unknown Category' } </p>

            {product.ingredients_text && <p> <strong>Ingredients: </strong> {product.ingredients_text || 'N/A' } </p>}

            <p className=" font-bold ">Nutrition Grade : {product.nutrition_grades || 'N/A' } </p>
        </div>
    )
}
export default ProductCard