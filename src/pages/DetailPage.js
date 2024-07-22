import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // api.js dosyasından axios istemcisini import ediyoruz
import './DetailPage.css';

// Örnek resim URL'i
const placeholderImage = 'https://via.placeholder.com/200';

const DetailPage = ({ title }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);

        // Film oyuncularını getir
        const castResponse = await api.get(`/movie/${id}/credits`);
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie || cast.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-page">
      <div className="movie-details">
        <h2>{title}</h2>
        <h3>{movie.title}</h3>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => {
            e.target.src = placeholderImage; // Resim yüklenemezse placeholder resim kullan
          }}
        />
        <p>{movie.overview}</p>
        <p className="release-date">Release Date: {movie.release_date}</p>
      </div>

      <div className="cast">
        <h3>Cast</h3>
        <div className="cast-list">
          {cast.map(actor => (
            <div key={actor.cast_id} className="actor">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="actor-image"
                onError={(e) => {
                  e.target.src = placeholderImage; // Resim yüklenemezse placeholder resim kullan
                }}
              />
              <p className="actor-name">{actor.name}</p>
              <p className="actor-character">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;