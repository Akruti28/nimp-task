import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TopRated from './components/TopRated';
import Upcoming from './components/Upcoming';
import MovieDetail from './components/MovieDetail';
import SearchResults from './components/SearchResults';
import { MovieProvider } from './context/MovieContext';
import './App.css';

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
