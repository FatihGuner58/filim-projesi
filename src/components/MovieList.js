import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MovieList.css'; 

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [notification, setNotification] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'cbbe08c6a8ba790440b5597739d49786';
        let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

        
        if (selectedGenre) {
          apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`;
        }

        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movies, searchQuery]);

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    showNotification(`${movie.title} favorilere eklendi.`, { className: 'green-background' });
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
      <h2>Popular Movies</h2>
      <div className="filter-section">
        <input className='film'
          type="text"
          placeholder="Filmleri Ara"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select className='filtreleme' value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All</option>
          <option value="35">Comedy</option> 
          <option value="18">Drama</option> 
          <option value="28">Action</option> 
          
        </select>
      </div>
      <div className="movie-list">
        {(searchQuery ? filteredMovies : movies).map(movie => (
          <div key={movie.id} className="movie">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </Link>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <button onClick={() => addToFavorites(movie)}>Add to Favorite</button>
            </div>
          </div>
        ))}
      </div>

      {notification && <div className="notification">{notification}</div>}

      <div>
        <h2>Favorite Movies</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map(favorite => (
              <li key={favorite.id}>
                {favorite.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;