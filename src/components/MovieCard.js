import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie, imageBaseUrl }) {
  return (
    <div className="movie-card fade-in">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative">
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p className="text-sm mb-2">{movie.release_date}</p>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;