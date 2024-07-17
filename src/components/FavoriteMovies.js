import React, { useState, useEffect } from 'react';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setNotification(`${movie.title} favorilere eklendi.`);
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div>
      <h2>Favorite Movies</h2>
      {notification && <p>{notification}</p>}
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(movie => (
            <li key={movie.id}>
              {movie.title}
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