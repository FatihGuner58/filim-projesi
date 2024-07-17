import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // TMDb API'den kategorileri çektim
        const apiKey = 'cbbe08c6a8ba790440b5597739d49786';
        const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        setCategories(response.data.genres);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-menu">
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;