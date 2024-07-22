import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import FavoriteMovies from './components/FavoriteMovies';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const location = useLocation();

  // Örnek kategori listesi
  const categories = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 14, name: 'Fantasy' },
  ];

  return (
    <div className="App">
      {location.pathname === '/' && (
        <header className='favori'>
          <Link to="/favorites">Favorilerim</Link>
        </header>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/movie/:id" element={<DetailPage title="Selected Movie" />} />
        <Route path="/movies" element={<MovieList categories={categories} />} />
        <Route path="/favorites" element={<FavoriteMovies />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;