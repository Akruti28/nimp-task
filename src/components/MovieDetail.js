import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MovieDetail() {
  const { id } = useParams();
  const { API_KEY, BASE_URL, IMAGE_BASE_URL, setLoading, setError } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [movieResponse, castResponse] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
        ]);

        const movieData = await movieResponse.json();
        const castData = await castResponse.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id, API_KEY, BASE_URL, setLoading, setError]);

  if (!movie) return null;

  return (
    <div className="fade-in">
      <div
        className="movie-detail-banner"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white text-shadow mb-2">{movie.title}</h1>
            <p className="text-gray-300 mb-4">{movie.release_date}</p>
          </div>
        </div>
      </div>

      <div className="movie-detail-content">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl hover-scale"
              />
              <div className="mt-6 p-4 glass-effect rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Rating</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-2xl">★</span>
                    <span className="ml-2 text-xl">{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Runtime</span>
                  <span>{movie.runtime} min</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {cast.map(actor => (
                    <div key={actor.id} className="text-center hover-scale">
                      <div className="relative rounded-lg overflow-hidden mb-2">
                        <img
                          src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full aspect-[2/3] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 p-2 text-white">
                            <p className="text-sm">{actor.character}</p>
                          </div>
                        </div>
                      </div>
                      <p className="font-semibold">{actor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;