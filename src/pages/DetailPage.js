import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css'; 

const DetailPage = ({ title }) => { // App.js'den gelen title propu alınıyor
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = 'cbbe08c6a8ba790440b5597739d49786';
        const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const response = await axios.get(apiUrl);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-page">
      <h2>{title}</h2> {/* App.js'den gelen title propu burada kullanılıyor */}
      <h3>{movie.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p className="release-date">Release Date: {movie.release_date}</p>
    </div>
  );
};

export default DetailPage;