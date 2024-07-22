import React, { useState, useEffect } from 'react';
import api from '../api'; // Axios configuration file path
import './Favorite.css';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/movie/popular'); // Appropriate endpoint for favorite movies
        const movies = response.data.results;
        const favoritesWithPosterUrls = movies.map(movie => ({
          id: movie.id,
          title: movie.title,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // TMDb base URL + poster path
        }));
        localStorage.setItem('favorites', JSON.stringify(favoritesWithPosterUrls));
        setFavorites(favoritesWithPosterUrls);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (savedFavorites.length === 0) {
      fetchFavorites();
    } else {
      setFavorites(savedFavorites);
    }
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setNotification('Movie removed from favorites.');
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div className='favorite'>
      <h2>Favorite History</h2>
      {notification && <p>{notification}</p>}
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(movie => (
            <li key={movie.id} className='favorite-movie'>
              <img src={movie.posterUrl} alt={movie.title} className='favorite-movie-poster'/>
              <span>{movie.title}</span>
              <button onClick={() => removeFavorite(movie.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies added yet.</p>
      )}
    </div>
  );
};

export default FavoriteMovies;