import React, { useState, useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';

function TopRated() {
  const { API_KEY, BASE_URL, IMAGE_BASE_URL, setLoading, setError } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [page, API_KEY, BASE_URL, setLoading, setError]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Rated Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} imageBaseUrl={IMAGE_BASE_URL} />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TopRated;