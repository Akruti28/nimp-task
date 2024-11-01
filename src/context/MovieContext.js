import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <MovieContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        loading,
        setLoading,
        error,
        setError,
        API_KEY,
        BASE_URL,
        IMAGE_BASE_URL
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};