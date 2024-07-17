import React, { useState, useEffect } from 'react';
import api from '../api';
import MovieSlider from '../components/MovieSlider';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const response = await api.get('/movie/top_rated');
      setTopRatedMovies(response.data.results.slice(0, 10));
    };
    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <MovieSlider movies={topRatedMovies} />
      <MovieList />
    </div>
  );
};

export default HomePage;