import React from 'react';

const MovieSlider = ({ movies }) => {
  return (
    <div className="movie-slider">
      {movies.map(movie => (
        <div key={movie.id} className="movie-slide">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieSlider;