import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch categories from OpenFoodFacts API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://world.openfoodfacts.org/categories.json');
        const fetchedCategories = response.data.tags.map(tag => tag.name);
        setCategories(fetchedCategories);
      } catch (error) {
        setError('Error fetching categories.');
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <label htmlFor="category" className="mr-2 text-gray-700 font-bold" >Filter by Category:</label>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          id="category"
          onChange={(e) => onCategorySelect(e.target.value)}
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryFilter;
