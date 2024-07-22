import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import FavoriteMovies from './components/FavoriteMovies';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  // Örnek kategori listesi
  const categories = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 14, name: 'Fantasy' },
  ];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          {/* title prop'u ile DetailPage bileşenini kullanımı */}
          <Route path="/movie/:id" element={<DetailPage title="Selected Movie" />} />
          <Route path="/movies" element={<MovieList categories={categories} />} />
        </Routes>
        <FavoriteMovies />
      </div>
    </Router>
  );
};

export default App;