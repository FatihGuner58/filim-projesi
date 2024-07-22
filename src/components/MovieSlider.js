import React from 'react';

const MovieSlider = ({ movies }) => {
  return (
    <div className="movie-slider-container">
      <div className="movie-slider">
        {movies.map(movie => (
          <div key={movie.id} className="movie-slide">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;